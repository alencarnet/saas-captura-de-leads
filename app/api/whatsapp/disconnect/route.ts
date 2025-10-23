import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

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
