import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { z } from "zod"

const qualificationSchema = z.object({
  score: z.number().min(0).max(100),
  category: z.enum(["Alta", "Média", "Baixa"]),
  motivo: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const { leads } = await request.json()

    console.log("[v0] Batch qualifying", leads.length, "leads")

    const results = []

    // Process leads in batches
    for (const lead of leads) {
      try {
        const { object: qualification } = await generateObject({
          model: "openai/gpt-4o-mini",
          schema: qualificationSchema,
          prompt: `Analise este lead e atribua uma nota de 0 a 100 conforme o interesse potencial.

Dê prioridade para leads com:
- Perfil decisor (CEO, diretor, gerente)
- Email corporativo (não gmail/hotmail)
- Empresa estabelecida
- Mensagem clara e específica

Lead:
Nome: ${lead.name}
Email: ${lead.email}
Empresa: ${lead.company || "Não informada"}
Mensagem: ${lead.message || "Sem mensagem"}

Seja objetivo e direto na análise.`,
        })

        results.push({
          leadId: lead.id,
          ...qualification,
          qualified: qualification.score >= 70,
        })

        console.log("[v0] Qualified lead:", lead.name, "- Score:", qualification.score)
      } catch (error) {
        console.error("[v0] Error qualifying lead:", lead.name, error)
        results.push({
          leadId: lead.id,
          error: "Failed to qualify",
        })
      }
    }

    return NextResponse.json({
      success: true,
      results,
      qualified: results.filter((r) => r.qualified).length,
      total: results.length,
    })
  } catch (error) {
    console.error("[v0] Batch qualification error:", error)
    return NextResponse.json({ error: "Failed to batch qualify leads" }, { status: 500 })
  }
}
