import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user already has a session
    const { data: existingSession } = await supabase
      .from("whatsapp_sessions")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (existingSession && existingSession.status === "connected") {
      return NextResponse.json(
        {
          error: "WhatsApp already connected",
          session: existingSession,
        },
        { status: 400 },
      )
    }

    // Generate a mock QR code for now (in production, this would come from whatsapp-web.js)
    const mockQRCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=whatsapp-${user.id}-${Date.now()}`

    // Create or update session
    const { data: session, error: sessionError } = await supabase
      .from("whatsapp_sessions")
      .upsert(
        {
          user_id: user.id,
          status: "qr_ready",
          qr_code: mockQRCode,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        },
      )
      .select()
      .single()

    if (sessionError) {
      console.error("[v0] Error creating session:", sessionError)
      return NextResponse.json({ error: sessionError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      qrCode: mockQRCode,
      session,
    })
  } catch (error) {
    console.error("[v0] WhatsApp connect error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to connect WhatsApp",
      },
      { status: 500 },
    )
  }
}
