import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { z } from "zod"

const qualificationSchema = z.object({
  score: z.number().min(0).max(100).describe("Lead score from 0 to 100 based on potential interest and fit"),
  category: z.enum(["Alta", "Média", "Baixa"]).describe("Lead category based on score"),
  motivo: z.string().describe("Brief explanation of the score in Portuguese"),
  pontos_fortes: z.array(z.string()).describe("Strong points of this lead"),
  pontos_fracos: z.array(z.string()).describe("Weak points or concerns about this lead"),
})

export async function POST(request: NextRequest) {
  try {
    const lead = await request.json()

    console.log("[v0] Qualifying lead:", lead.name)

    // Call AI to qualify the lead
    const { object: qualification } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: qualificationSchema,
      prompt: `Analise este lead e atribua uma nota de 0 a 100 conforme o interesse potencial e adequação ao perfil ideal.

Critérios de avaliação:
- Perfil decisor (CEO, diretor, gerente) = maior pontuação
- Email corporativo (não gmail/hotmail) = maior pontuação  
- Empresa estabelecida = maior pontuação
- Mensagem clara e específica = maior pontuação
- Localização em grandes centros = maior pontuação

Lead para análise:
Nome: ${lead.name}
Email: ${lead.email}
Telefone: ${lead.phone || "Não informado"}
Empresa: ${lead.company || "Não informada"}
Cidade: ${lead.city || "Não informada"}
Mensagem: ${lead.message || "Sem mensagem"}
Campanha: ${lead.campaign || "Não especificada"}

Forneça uma análise objetiva e atribua o score apropriado.`,
    })

    console.log("[v0] AI qualification result:", qualification)

    // Determine if lead is qualified (score >= 70)
    const qualified = qualification.score >= 70

    return NextResponse.json({
      success: true,
      qualification: {
        ...qualification,
        qualified,
      },
    })
  } catch (error) {
    console.error("[v0] Qualification error:", error)
    return NextResponse.json({ error: "Failed to qualify lead" }, { status: 500 })
  }
}
