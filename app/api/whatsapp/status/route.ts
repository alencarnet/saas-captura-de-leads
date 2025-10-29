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

    if (session?.instance_name) {
      const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || "https://whatsapp-api-cdz6.onrender.com"
      const API_KEY = process.env.WHATSAPP_API_KEY || "B6D711FCDE4D4FD5936544120E713976"

      try {
        const statusResponse = await fetch(`${WHATSAPP_API_URL}/instance/connectionState/${session.instance_name}`, {
          headers: {
            apikey: API_KEY,
          },
        })

        if (statusResponse.ok) {
          const statusData = await statusResponse.json()
          const isConnected = statusData.state === "open"

          // Update database if status changed
          if (isConnected && session.status !== "connected") {
            await supabase
              .from("whatsapp_sessions")
              .update({
                status: "connected",
                qr_code: null,
                updated_at: new Date().toISOString(),
              })
              .eq("user_id", user.id)
          }

          return NextResponse.json({
            connected: isConnected,
            session: { ...session, status: isConnected ? "connected" : session.status },
          })
        }
      } catch (apiError) {
        console.error("[v0] Evolution API status check failed:", apiError)
      }
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
