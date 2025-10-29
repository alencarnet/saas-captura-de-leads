import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || "https://whatsapp-api-cdz6.onrender.com"
const API_KEY = process.env.WHATSAPP_API_KEY || "Fluxo129a"

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
    console.log("[v0] API URL:", WHATSAPP_API_URL)
    console.log("[v0] API Key configured:", API_KEY ? "Yes" : "No")

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

    console.log("[v0] Create response status:", createResponse.status)
    console.log("[v0] Create response headers:", Object.fromEntries(createResponse.headers.entries()))

    // Check if response is JSON before parsing
    const contentType = createResponse.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await createResponse.text()
      console.error("[v0] Non-JSON response:", textResponse)
      throw new Error(`API returned non-JSON response: ${textResponse.substring(0, 100)}`)
    }

    if (!createResponse.ok) {
      const errorData = await createResponse.json()
      console.error("[v0] Evolution API error:", errorData)
      throw new Error(errorData.message || `API error: ${createResponse.status}`)
    }

    const instanceData = await createResponse.json()
    console.log("[v0] Instance created:", instanceData)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const qrResponse = await fetch(`${WHATSAPP_API_URL}/instance/connect/${instanceName}`, {
      headers: {
        apikey: API_KEY,
      },
    })

    console.log("[v0] QR response status:", qrResponse.status)

    // Check if QR response is JSON
    const qrContentType = qrResponse.headers.get("content-type")
    if (!qrContentType || !qrContentType.includes("application/json")) {
      const textResponse = await qrResponse.text()
      console.error("[v0] QR Non-JSON response:", textResponse)
      throw new Error(`QR API returned non-JSON response: ${textResponse.substring(0, 100)}`)
    }

    if (!qrResponse.ok) {
      const errorData = await qrResponse.json()
      console.error("[v0] QR API error:", errorData)
      throw new Error(errorData.message || `QR API error: ${qrResponse.status}`)
    }

    const qrData = await qrResponse.json()
    console.log("[v0] QR Code received:", qrData ? "Yes" : "No")

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
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
