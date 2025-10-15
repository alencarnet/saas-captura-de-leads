import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { query, limit = 10 } = await request.json()

    console.log("[v0] Searching Apollo.io for:", query)

    const apolloApiKey = process.env.APOLLO_API_KEY

    if (!apolloApiKey) {
      console.log("[v0] Apollo API key not configured, returning mock data")
      // Return mock data for demo
      return NextResponse.json({
        success: true,
        leads: [
          {
            name: "João Silva",
            email: "joao@techcorp.com",
            company: "TechCorp Solutions",
            title: "CEO",
            phone: "+55 11 98765-4321",
            city: "São Paulo",
          },
          {
            name: "Maria Santos",
            email: "maria@innovate.io",
            company: "Innovate Digital",
            title: "CTO",
            phone: "+55 21 97654-3210",
            city: "Rio de Janeiro",
          },
        ],
        total: 2,
      })
    }

    // Actual Apollo.io API call
    const response = await fetch("https://api.apollo.io/v1/mixed_people/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "X-Api-Key": apolloApiKey,
      },
      body: JSON.stringify({
        q_keywords: query,
        page: 1,
        per_page: limit,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Apollo API error")
    }

    const leads = data.people?.map((person: any) => ({
      name: person.name,
      email: person.email,
      company: person.organization?.name,
      title: person.title,
      phone: person.phone_numbers?.[0]?.raw_number,
      city: person.city,
    }))

    console.log("[v0] Found", leads?.length, "leads from Apollo.io")

    return NextResponse.json({
      success: true,
      leads,
      total: data.pagination?.total_entries || 0,
    })
  } catch (error) {
    console.error("[v0] Apollo search error:", error)
    return NextResponse.json({ error: "Failed to search Apollo.io" }, { status: 500 })
  }
}
