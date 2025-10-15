import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    // Validate file type
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ]

    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Tipo de arquivo inválido. Use .xlsx, .xls ou .csv" }, { status: 400 })
    }

    // Read file content
    const buffer = await file.arrayBuffer()
    const text = new TextDecoder().decode(buffer)

    // Parse CSV (simple implementation)
    const lines = text.split("\n").filter((line) => line.trim())
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())

    // Expected headers: cnpj, razao_social, nome_socio, telefone, email, cidade, uf
    const leads = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim())

      if (values.length < headers.length) continue

      const lead = {
        id: Date.now() + i,
        cnpj: values[headers.indexOf("cnpj")] || "",
        razao_social: values[headers.indexOf("razao_social")] || values[headers.indexOf("razão social")] || "",
        nome_socio: values[headers.indexOf("nome_socio")] || values[headers.indexOf("sócio")] || "",
        telefone: values[headers.indexOf("telefone")] || "",
        email: values[headers.indexOf("email")] || "",
        cidade: values[headers.indexOf("cidade")] || "",
        uf: values[headers.indexOf("uf")] || "",
        fonte: "Importação Excel",
        status: "novo",
        data_coleta: new Date().toISOString(),
      }

      // Validate CNPJ
      if (lead.cnpj && lead.cnpj.replace(/\D/g, "").length === 14) {
        leads.push(lead)
      }
    }

    return NextResponse.json({
      success: true,
      leads,
      count: leads.length,
      message: `${leads.length} leads importados com sucesso`,
    })
  } catch (error: any) {
    console.error("Error importing Excel:", error)
    return NextResponse.json({ error: error.message || "Erro ao importar arquivo" }, { status: 500 })
  }
}
