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

    const instanceName = `user_${user.id.replace(/-/g, "_")}`

    console.log("[v0] Creating WhatsApp instance:", instanceName)

    const createResponse = await fetch(`${WHATSAPP_API_URL}/instance/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: API_KEY,
      },
      body: JSON.stringify({
        instanceName,
        qrcode: true,
        integration: "WHATSAPP-BAILEYS",
      }),
    })

    if (!createResponse.ok) {
      const errorData = await createResponse.json()
      console.error("[v0] Evolution API error:", errorData)
      throw new Error(errorData.message || "Failed to create instance")
    }

    const instanceData = await createResponse.json()
    console.log("[v0] Instance created:", instanceData)

    const qrResponse = await fetch(`${WHATSAPP_API_URL}/instance/connect/${instanceName}`, {
      headers: {
        apikey: API_KEY,
      },
    })

    if (!qrResponse.ok) {
      throw new Error("Failed to get QR code")
    }

    const qrData = await qrResponse.json()
    console.log("[v0] QR Code received")

    // Save session to database
    const { error: upsertError } = await supabase.from("whatsapp_sessions").upsert(
      {
        user_id: user.id,
        instance_name: instanceName,
        qr_code: qrData.base64 || qrData.code,
        status: "qr_ready",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      },
    )

    if (upsertError) {
      console.error("[v0] Database error:", upsertError)
      throw new Error(upsertError.message)
    }

    return NextResponse.json({
      success: true,
      qrCode: qrData.base64 || qrData.code,
      instanceName,
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
