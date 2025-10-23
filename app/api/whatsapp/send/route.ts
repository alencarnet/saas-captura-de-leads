import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { chatId, message } = await request.json()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user has active WhatsApp session
    const { data: session } = await supabase.from("whatsapp_sessions").select("*").eq("user_id", user.id).single()

    if (!session || session.status !== "connected") {
      return NextResponse.json(
        {
          error: "WhatsApp not connected",
        },
        { status: 400 },
      )
    }

    // In production, this would send via whatsapp-web.js
    // For now, we'll save to database
    const messageId = `msg_${Date.now()}`

    const { error: insertError } = await supabase.from("whatsapp_messages").insert({
      user_id: user.id,
      chat_id: chatId,
      message_id: messageId,
      from_number: session.phone_number || "",
      to_number: chatId.replace("@c.us", ""),
      body: message,
      timestamp: Date.now(),
      is_from_me: true,
    })

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // Update contact last message time
    await supabase
      .from("whatsapp_contacts")
      .update({
        last_message_at: new Date().toISOString(),
        unread_count: 0,
      })
      .eq("user_id", user.id)
      .eq("contact_id", chatId)

    return NextResponse.json({
      success: true,
      messageId,
    })
  } catch (error) {
    console.error("[v0] Send message error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to send message",
      },
      { status: 500 },
    )
  }
}
