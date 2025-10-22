import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
      "text/csv", // .csv
    ]

    if (
      !validTypes.includes(file.type) &&
      !file.name.endsWith(".csv") &&
      !file.name.endsWith(".xlsx") &&
      !file.name.endsWith(".xls")
    ) {
      return NextResponse.json({ error: "Tipo de arquivo inválido. Use .xlsx, .xls ou .csv" }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    let leads: any[] = []

    if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls") || file.type.includes("spreadsheet")) {
      try {
        const XLSX = await import("xlsx")
        const workbook = XLSX.read(buffer, { type: "array" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(worksheet, { raw: false })

        leads = data.map((row: any, index: number) => ({
          id: Date.now() + index,
          cnpj: row["CNPJ"] || row["cnpj"] || "",
          razao_social: row["Nome da Empresa"] || row["Razão Social"] || row["razao_social"] || row["empresa"] || "",
          nome_socio: row["Nome do Sócio"] || row["Sócio"] || row["nome_socio"] || row["socio"] || "",
          telefone: row["Telefone"] || row["telefone"] || row["phone"] || "",
          email: row["Email"] || row["email"] || row["E-mail"] || "",
          cidade: row["Cidade"] || row["cidade"] || row["city"] || "",
          uf: row["UF"] || row["uf"] || row["Estado"] || row["estado"] || "",
          fonte: "Importação Excel",
          status: "novo",
          data_coleta: new Date().toISOString(),
        }))
      } catch (error) {
        console.error("Error parsing Excel:", error)
        return NextResponse.json({ error: "Erro ao processar arquivo Excel" }, { status: 400 })
      }
    } else if (file.name.endsWith(".csv") || file.type === "text/csv") {
      const text = new TextDecoder("utf-8").decode(buffer)
      const lines = text.split("\n").filter((line) => line.trim())

      if (lines.length < 2) {
        return NextResponse.json({ error: "Arquivo CSV vazio ou inválido" }, { status: 400 })
      }

      const headers = lines[0].split(/[,;]/).map((h) => h.trim().replace(/['"]/g, ""))

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(/[,;]/).map((v) => v.trim().replace(/['"]/g, ""))

        if (values.length < 2) continue

        const getValueByHeader = (possibleHeaders: string[]) => {
          for (const header of possibleHeaders) {
            const index = headers.findIndex((h) => h.toLowerCase().includes(header.toLowerCase()))
            if (index !== -1 && values[index]) {
              return values[index]
            }
          }
          return ""
        }

        const lead = {
          id: Date.now() + i,
          cnpj: getValueByHeader(["cnpj"]),
          razao_social: getValueByHeader(["nome da empresa", "razão social", "razao social", "empresa"]),
          nome_socio: getValueByHeader(["nome do sócio", "sócio", "socio", "nome socio"]),
          telefone: getValueByHeader(["telefone", "phone", "tel"]),
          email: getValueByHeader(["email", "e-mail"]),
          cidade: getValueByHeader(["cidade", "city"]),
          uf: getValueByHeader(["uf", "estado", "state"]),
          fonte: "Importação CSV",
          status: "novo",
          data_coleta: new Date().toISOString(),
        }

        if ((lead.cnpj && lead.cnpj.replace(/\D/g, "").length >= 11) || lead.razao_social) {
          leads.push(lead)
        }
      }
    }

    const validLeads = leads.filter(
      (lead) =>
        (lead.cnpj && lead.cnpj.replace(/\D/g, "").length >= 11) || (lead.razao_social && lead.razao_social.length > 0),
    )

    if (validLeads.length === 0) {
      return NextResponse.json(
        {
          error:
            "Nenhum lead válido encontrado. Certifique-se de que o arquivo contém as colunas: Nome da Empresa, Nome do Sócio, Telefone, Email",
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      leads: validLeads,
      count: validLeads.length,
      message: `${validLeads.length} leads importados com sucesso`,
    })
  } catch (error: any) {
    console.error("Error importing file:", error)
    return NextResponse.json({ error: error.message || "Erro ao importar arquivo" }, { status: 500 })
  }
}
