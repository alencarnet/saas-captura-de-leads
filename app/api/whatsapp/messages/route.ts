import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get("chatId")

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let query = supabase
      .from("whatsapp_messages")
      .select("*")
      .eq("user_id", user.id)
      .order("timestamp", { ascending: true })

    if (chatId) {
      query = query.eq("chat_id", chatId)
    }

    const { data: messages, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ messages: messages || [] })
  } catch (error) {
    console.error("[v0] Get messages error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to get messages",
      },
      { status: 500 },
    )
  }
}
