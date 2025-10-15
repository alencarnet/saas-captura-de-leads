import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { leadId, method, message, lead } = await request.json()

    if (!leadId || !method || !lead) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    console.log(`[v0] Sending contact via ${method} to lead ${leadId}`)

    if (method === "whatsapp") {
      // Simulate WhatsApp API call
      console.log(`[v0] WhatsApp message to ${lead.telefone}:`, message)

      // In production, integrate with WhatsApp Cloud API
      // const response = await fetch('https://graph.facebook.com/v18.0/YOUR_PHONE_ID/messages', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     messaging_product: 'whatsapp',
      //     to: lead.telefone.replace(/\D/g, ''),
      //     type: 'text',
      //     text: { body: message }
      //   })
      // })

      return NextResponse.json({
        success: true,
        message: "Mensagem enviada via WhatsApp",
        method: "whatsapp",
      })
    }

    if (method === "email") {
      // Simulate Email API call
      console.log(`[v0] Email to ${lead.email}:`, message)

      // In production, integrate with email service (SendGrid, Resend, etc)
      // const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     personalizations: [{ to: [{ email: lead.email }] }],
      //     from: { email: 'contato@fluxoleadai.com' },
      //     subject: 'Oportunidade de Negócio',
      //     content: [{ type: 'text/plain', value: message }]
      //   })
      // })

      return NextResponse.json({
        success: true,
        message: "Email enviado com sucesso",
        method: "email",
      })
    }

    if (method === "ai") {
      // Generate personalized message with AI
      console.log(`[v0] Generating AI message for lead ${leadId}`)

      const { text } = await generateText({
        model: "openai/gpt-4o-mini",
        prompt: `Você é um assistente de vendas profissional. Gere uma mensagem personalizada e persuasiva para entrar em contato com o seguinte lead:

Nome: ${lead.nome_socio}
Empresa: ${lead.razao_social}
Cidade: ${lead.cidade}

A mensagem deve:
- Ser profissional e cordial
- Mencionar a empresa do lead
- Oferecer uma solução de valor
- Incluir um call-to-action claro
- Ter no máximo 150 palavras

Gere apenas a mensagem, sem explicações adicionais.`,
      })

      console.log(`[v0] AI generated message:`, text)

      // Send via WhatsApp and Email
      console.log(`[v0] Sending AI message via WhatsApp to ${lead.telefone}`)
      console.log(`[v0] Sending AI message via Email to ${lead.email}`)

      return NextResponse.json({
        success: true,
        message: "Mensagem gerada por IA e enviada via WhatsApp e Email",
        method: "ai",
        generatedMessage: text,
      })
    }

    return NextResponse.json({ error: "Método de contato inválido" }, { status: 400 })
  } catch (error: any) {
    console.error("[v0] Error sending contact:", error)
    return NextResponse.json({ error: error.message || "Erro ao enviar contato" }, { status: 500 })
  }
}
