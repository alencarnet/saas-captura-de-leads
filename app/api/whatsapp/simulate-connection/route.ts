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

    // Simulate successful connection
    const phoneNumber = "+55 11 99999-9999" // Mock phone number

    const { data: session, error } = await supabase
      .from("whatsapp_sessions")
      .update({
        status: "connected",
        phone_number: phoneNumber,
        qr_code: null,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create some mock contacts
    const mockContacts = [
      {
        user_id: user.id,
        contact_id: "5511988887777@c.us",
        name: "João Silva",
        phone_number: "+55 11 98888-7777",
        last_message_at: new Date().toISOString(),
        unread_count: 2,
      },
      {
        user_id: user.id,
        contact_id: "5511977776666@c.us",
        name: "Maria Santos",
        phone_number: "+55 11 97777-6666",
        last_message_at: new Date(Date.now() - 3600000).toISOString(),
        unread_count: 0,
      },
      {
        user_id: user.id,
        contact_id: "5511966665555@c.us",
        name: "Pedro Costa",
        phone_number: "+55 11 96666-5555",
        last_message_at: new Date(Date.now() - 7200000).toISOString(),
        unread_count: 1,
      },
    ]

    await supabase.from("whatsapp_contacts").upsert(mockContacts, {
      onConflict: "user_id,contact_id",
    })

    // Create some mock messages
    const mockMessages = [
      {
        user_id: user.id,
        chat_id: "5511988887777@c.us",
        message_id: "msg1",
        from_number: "5511988887777",
        to_number: phoneNumber,
        body: "Olá! Gostaria de saber mais sobre seus serviços.",
        timestamp: Date.now() - 300000,
        is_from_me: false,
      },
      {
        user_id: user.id,
        chat_id: "5511988887777@c.us",
        message_id: "msg2",
        from_number: phoneNumber,
        to_number: "5511988887777",
        body: "Olá João! Claro, ficarei feliz em ajudar. O que você gostaria de saber?",
        timestamp: Date.now() - 240000,
        is_from_me: true,
      },
      {
        user_id: user.id,
        chat_id: "5511966665555@c.us",
        message_id: "msg3",
        from_number: "5511966665555",
        to_number: phoneNumber,
        body: "Boa tarde! Recebi sua proposta.",
        timestamp: Date.now() - 7200000,
        is_from_me: false,
      },
    ]

    await supabase.from("whatsapp_messages").upsert(mockMessages, {
      onConflict: "user_id,message_id",
    })

    return NextResponse.json({
      success: true,
      session,
      message: "WhatsApp conectado com sucesso! (Demo)",
    })
  } catch (error) {
    console.error("[v0] Simulate connection error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to simulate connection",
      },
      { status: 500 },
    )
  }
}
