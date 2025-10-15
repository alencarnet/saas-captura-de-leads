import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { phone, message, leadId } = await request.json()

    console.log("[v0] Sending WhatsApp to:", phone)

    // WhatsApp Cloud API integration
    // In production, you would use the actual WhatsApp Business API
    const whatsappApiUrl = "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages"
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN

    if (!accessToken) {
      console.log("[v0] WhatsApp API token not configured, simulating send")
      // Simulate successful send for demo
      return NextResponse.json({
        success: true,
        messageId: `sim_${Date.now()}`,
        status: "sent",
        phone,
      })
    }

    // Actual WhatsApp API call
    const response = await fetch(whatsappApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone.replace(/\D/g, ""), // Remove non-digits
        type: "text",
        text: {
          body: message,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || "WhatsApp API error")
    }

    console.log("[v0] WhatsApp sent successfully:", data.messages?.[0]?.id)

    // Save to database
    // await db.whatsappMessages.create({
    //   leadId,
    //   phone,
    //   message,
    //   status: 'sent',
    //   messageId: data.messages[0].id
    // })

    return NextResponse.json({
      success: true,
      messageId: data.messages?.[0]?.id,
      status: "sent",
    })
  } catch (error) {
    console.error("[v0] WhatsApp send error:", error)
    return NextResponse.json({ error: "Failed to send WhatsApp message" }, { status: 500 })
  }
}
