import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { instance, data } = body

    console.log("[v0] Evolution API webhook received:", { instance, event: data.event })

    const supabase = await createClient()

    const userId = instance.replace("user_", "").replace(/_/g, "-")

    // Handle different webhook events from Evolution API
    const event = data.event

    switch (event) {
      case "qrcode.updated":
        // Update QR code in database
        await supabase
          .from("whatsapp_sessions")
          .update({
            qr_code: data.qrcode.base64,
            status: "qr_ready",
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId)
        break

      case "connection.update":
        if (data.state === "open") {
          // WhatsApp connected successfully
          await supabase
            .from("whatsapp_sessions")
            .update({
              status: "connected",
              phone_number: data.instance?.wuid?.split("@")[0],
              qr_code: null,
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId)
        } else if (data.state === "close") {
          // WhatsApp disconnected
          await supabase
            .from("whatsapp_sessions")
            .update({
              status: "disconnected",
              qr_code: null,
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId)
        }
        break

      case "messages.upsert":
        // New message received
        const message = data.messages?.[0]
        if (message) {
          const isFromMe = message.key.fromMe
          const remoteJid = message.key.remoteJid
          const messageBody = message.message?.conversation || message.message?.extendedTextMessage?.text || ""

          await supabase.from("whatsapp_messages").insert({
            user_id: userId,
            chat_id: remoteJid,
            message_id: message.key.id,
            from_number: isFromMe ? "" : remoteJid.split("@")[0],
            to_number: isFromMe ? remoteJid.split("@")[0] : "",
            body: messageBody,
            timestamp: message.messageTimestamp * 1000,
            is_from_me: isFromMe,
          })

          // Update or create contact
          await supabase.from("whatsapp_contacts").upsert(
            {
              user_id: userId,
              contact_id: remoteJid,
              name: message.pushName || remoteJid.split("@")[0],
              phone_number: remoteJid.split("@")[0],
              last_message: messageBody,
              last_message_at: new Date(message.messageTimestamp * 1000).toISOString(),
              unread_count: isFromMe ? 0 : 1,
            },
            {
              onConflict: "user_id,contact_id",
            },
          )
        }
        break

      default:
        console.log("[v0] Unhandled Evolution API event:", event)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Webhook processing failed",
      },
      { status: 500 },
    )
  }
}
