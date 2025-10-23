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

    const { data: contacts, error } = await supabase
      .from("whatsapp_contacts")
      .select("*")
      .eq("user_id", user.id)
      .order("last_message_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ contacts: contacts || [] })
  } catch (error) {
    console.error("[v0] Get contacts error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to get contacts",
      },
      { status: 500 },
    )
  }
}
