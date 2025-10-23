import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: session, error } = await supabase
      .from("whatsapp_sessions")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      connected: session?.status === "connected",
      session: session || null,
    })
  } catch (error) {
    console.error("[v0] WhatsApp status error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to get status",
      },
      { status: 500 },
    )
  }
}
