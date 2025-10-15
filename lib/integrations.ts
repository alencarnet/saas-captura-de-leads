export async function searchApollo(query: string, limit = 10) {
  try {
    const response = await fetch("/api/integrations/apollo/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, limit }),
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Apollo search failed")
    }

    return data.leads
  } catch (error) {
    console.error("[v0] Apollo search failed:", error)
    throw error
  }
}

export async function sendClicksignContract(leadId: string, leadEmail: string, leadName: string) {
  try {
    const response = await fetch("/api/integrations/clicksign/send-contract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadId,
        leadEmail,
        leadName,
        contractTemplate: "default",
      }),
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to send contract")
    }

    return data
  } catch (error) {
    console.error("[v0] Clicksign send failed:", error)
    throw error
  }
}
