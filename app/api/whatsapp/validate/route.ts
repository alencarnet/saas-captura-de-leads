import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()

    if (!phone) {
      return NextResponse.json({ error: "Número de telefone é obrigatório" }, { status: 400 })
    }

    // Limpar o número (remover caracteres não numéricos)
    const cleanPhone = phone.replace(/\D/g, "")

    // Validar formato básico (Brasil: 55 + DDD (2 dígitos) + número (8 ou 9 dígitos))
    const brazilPhoneRegex = /^55\d{10,11}$/

    if (!brazilPhoneRegex.test(cleanPhone)) {
      return NextResponse.json({
        valid: false,
        phone: cleanPhone,
        message: "Formato de número inválido. Use: 55 + DDD + número",
      })
    }

    // Simular validação do WhatsApp
    // Em produção, você usaria uma API real como:
    // - WhatsApp Business API
    // - Serviços como Twilio, MessageBird, etc.

    // Por enquanto, vamos simular com uma lógica básica:
    // Números que terminam em 0-5 são considerados válidos (60% de chance)
    const lastDigit = Number.parseInt(cleanPhone.slice(-1))
    const isValid = lastDigit <= 5

    // Simular delay de API real
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      valid: isValid,
      phone: cleanPhone,
      formatted: `+${cleanPhone.slice(0, 2)} (${cleanPhone.slice(2, 4)}) ${cleanPhone.slice(4, 9)}-${cleanPhone.slice(9)}`,
      message: isValid ? "Número válido no WhatsApp" : "Número não encontrado no WhatsApp",
    })
  } catch (error) {
    console.error("[v0] Erro ao validar WhatsApp:", error)
    return NextResponse.json({ error: "Erro ao validar número do WhatsApp" }, { status: 500 })
  }
}

// Validar múltiplos números em lote
export async function PUT(request: NextRequest) {
  try {
    const { phones } = await request.json()

    if (!phones || !Array.isArray(phones)) {
      return NextResponse.json({ error: "Array de telefones é obrigatório" }, { status: 400 })
    }

    const results = await Promise.all(
      phones.map(async (phone) => {
        const cleanPhone = phone.replace(/\D/g, "")
        const brazilPhoneRegex = /^55\d{10,11}$/

        if (!brazilPhoneRegex.test(cleanPhone)) {
          return {
            phone: cleanPhone,
            valid: false,
            message: "Formato inválido",
          }
        }

        const lastDigit = Number.parseInt(cleanPhone.slice(-1))
        const isValid = lastDigit <= 5

        return {
          phone: cleanPhone,
          valid: isValid,
          formatted: `+${cleanPhone.slice(0, 2)} (${cleanPhone.slice(2, 4)}) ${cleanPhone.slice(4, 9)}-${cleanPhone.slice(9)}`,
          message: isValid ? "Válido" : "Não encontrado",
        }
      }),
    )

    return NextResponse.json({ results })
  } catch (error) {
    console.error("[v0] Erro ao validar WhatsApp em lote:", error)
    return NextResponse.json({ error: "Erro ao validar números do WhatsApp" }, { status: 500 })
  }
}
