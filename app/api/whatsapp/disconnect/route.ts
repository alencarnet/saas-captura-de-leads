import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || "https://whatsapp-api-cdz6.onrender.com"
const API_KEY = process.env.WHATSAPP_API_KEY || "B6D711FCDE4D4FD5936544120E713976"

export async function POST() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: session } = await supabase.from("whatsapp_sessions").select("*").eq("user_id", user.id).single()

    if (session?.instance_name) {
      try {
        await fetch(`${WHATSAPP_API_URL}/instance/delete/${session.instance_name}`, {
          method: "DELETE",
          headers: {
            apikey: API_KEY,
          },
        })
      } catch (apiError) {
        console.error("[v0] Evolution API disconnect failed:", apiError)
      }
    }

    // Update session status to disconnected
    const { error } = await supabase
      .from("whatsapp_sessions")
      .update({
        status: "disconnected",
        qr_code: null,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] WhatsApp disconnect error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to disconnect",
      },
      { status: 500 },
    )
  }
}
