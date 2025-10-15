export async function sendWhatsAppMessage(phone: string, message: string, leadId?: string) {
  try {
    const response = await fetch("/api/whatsapp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, message, leadId }),
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to send WhatsApp")
    }

    return data
  } catch (error) {
    console.error("[v0] WhatsApp send failed:", error)
    throw error
  }
}

export function formatWhatsAppMessage(template: string, variables: Record<string, string>) {
  let message = template

  Object.entries(variables).forEach(([key, value]) => {
    message = message.replace(new RegExp(`{{${key}}}`, "g"), value)
  })

  return message
}
