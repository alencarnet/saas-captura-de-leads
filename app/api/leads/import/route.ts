import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Read CSV file
    const text = await file.text()
    const lines = text.split("\n")
    const headers = lines[0].split(",").map((h) => h.trim())

    const leads = []

    // Parse CSV rows
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue

      const values = lines[i].split(",").map((v) => v.trim())
      const lead: Record<string, string> = {}

      headers.forEach((header, index) => {
        lead[header] = values[index] || ""
      })

      leads.push({
        name: lead.name || lead.nome,
        email: lead.email,
        phone: lead.phone || lead.telefone,
        company: lead.company || lead.empresa,
        city: lead.city || lead.cidade,
        state: lead.state || lead.estado,
        message: lead.message || lead.mensagem || "",
        source: "csv",
        status: "new",
      })
    }

    console.log("[v0] Imported leads:", leads.length)

    // Here you would save to database
    // await db.leads.createMany({ data: leads })

    return NextResponse.json({
      success: true,
      imported: leads.length,
      leads: leads.slice(0, 5), // Return first 5 as preview
    })
  } catch (error) {
    console.error("[v0] Import error:", error)
    return NextResponse.json({ error: "Failed to import leads" }, { status: 500 })
  }
}
