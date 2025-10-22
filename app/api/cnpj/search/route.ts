import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { cnpj } = await request.json()

    if (!cnpj) {
      return NextResponse.json({ error: "CNPJ é obrigatório" }, { status: 400 })
    }

    const cnpjLimpo = cnpj.replace(/[^\d]/g, "")

    if (cnpjLimpo.length !== 14) {
      return NextResponse.json({ error: "CNPJ deve conter 14 dígitos" }, { status: 400 })
    }

    console.log("[v0] Buscando CNPJ:", cnpjLimpo)

    const [receitaData, cnpjWsData, cnpjaData] = await Promise.allSettled([
      fetchReceitaWS(cnpjLimpo),
      fetchCNPJWS(cnpjLimpo),
      fetchCNPJa(cnpjLimpo),
    ])

    console.log("[v0] Receita WS:", receitaData)
    console.log("[v0] CNPJ.ws:", cnpjWsData)
    console.log("[v0] CNPJá:", cnpjaData)

    const consolidatedData = consolidateData(receitaData, cnpjWsData, cnpjaData, cnpjLimpo)

    return NextResponse.json(consolidatedData)
  } catch (error) {
    console.error("[v0] Erro ao buscar CNPJ:", error)
    return NextResponse.json({ error: "Erro ao buscar dados do CNPJ" }, { status: 500 })
  }
}

async function fetchReceitaWS(cnpj: string) {
  try {
    const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      throw new Error(`ReceitaWS error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] ReceitaWS response:", data)
    return data
  } catch (error) {
    console.error("[v0] Erro ReceitaWS:", error)
    throw error
  }
}

async function fetchCNPJWS(cnpj: string) {
  try {
    const response = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      throw new Error(`CNPJ.ws error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] CNPJ.ws response:", data)
    return data
  } catch (error) {
    console.error("[v0] Erro CNPJ.ws:", error)
    throw error
  }
}

async function fetchCNPJa(cnpj: string) {
  try {
    const response = await fetch(`https://cnpja.com/api/cnpj/${cnpj}`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      throw new Error(`CNPJá error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] CNPJá response:", data)
    return data
  } catch (error) {
    console.error("[v0] Erro CNPJá:", error)
    throw error
  }
}

function consolidateData(
  receitaResult: PromiseSettledResult<any>,
  cnpjWsResult: PromiseSettledResult<any>,
  cnpjaResult: PromiseSettledResult<any>,
  cnpj: string,
) {
  const sources: string[] = []
  let razaoSocial = ""
  let nomeFantasia = ""
  let email = ""
  let telefone = ""
  let cidade = ""
  let uf = ""
  let endereco = ""
  let socios: string[] = [] // Array de strings com nomes dos sócios

  if (receitaResult.status === "fulfilled" && receitaResult.value) {
    const data = receitaResult.value
    sources.push("ReceitaWS")
    razaoSocial = razaoSocial || data.nome || ""
    nomeFantasia = nomeFantasia || data.fantasia || ""
    email = email || data.email || ""
    telefone = telefone || data.telefone || ""
    cidade = cidade || data.municipio || ""
    uf = uf || data.uf || ""

    if (data.logradouro) {
      endereco = `${data.logradouro}, ${data.numero || "S/N"} - ${data.bairro || ""}, ${data.municipio || ""} - ${data.uf || ""}, CEP: ${data.cep || ""}`
    }

    if (data.qsa && Array.isArray(data.qsa)) {
      socios = data.qsa.map((s: any) => s.nome || "")
    }
  }

  if (cnpjWsResult.status === "fulfilled" && cnpjWsResult.value) {
    const data = cnpjWsResult.value
    sources.push("CNPJ.ws")
    razaoSocial = razaoSocial || data.razao_social || ""
    nomeFantasia = nomeFantasia || data.estabelecimento?.nome_fantasia || ""
    email = email || data.estabelecimento?.email || ""
    telefone =
      telefone ||
      (data.estabelecimento?.ddd1 && data.estabelecimento?.telefone1
        ? `(${data.estabelecimento.ddd1}) ${data.estabelecimento.telefone1}`
        : "")
    cidade = cidade || data.estabelecimento?.cidade?.nome || ""
    uf = uf || data.estabelecimento?.estado?.sigla || ""

    if (!endereco && data.estabelecimento) {
      const est = data.estabelecimento
      endereco = `${est.tipo_logradouro || ""} ${est.logradouro || ""}, ${est.numero || "S/N"} - ${est.bairro || ""}, ${est.cidade?.nome || ""} - ${est.estado?.sigla || ""}, CEP: ${est.cep || ""}`
    }

    if (data.socios && Array.isArray(data.socios) && socios.length === 0) {
      socios = data.socios.map((s: any) => s.nome || "")
    }
  }

  if (cnpjaResult.status === "fulfilled" && cnpjaResult.value) {
    const data = cnpjaResult.value
    sources.push("CNPJá")
    razaoSocial = razaoSocial || data.company?.name || ""
    nomeFantasia = nomeFantasia || data.alias || ""
    email = email || data.emails?.[0]?.address || ""
    telefone = telefone || (data.phones?.[0] ? `(${data.phones[0].area}) ${data.phones[0].number}` : "")
    cidade = cidade || data.address?.city || ""
    uf = uf || data.address?.state || ""

    if (!endereco && data.address) {
      const addr = data.address
      endereco = `${addr.street || ""}, ${addr.number || "S/N"} - ${addr.district || ""}, ${addr.city || ""} - ${addr.state || ""}, CEP: ${addr.zip || ""}`
    }

    if (data.company?.members && Array.isArray(data.company.members) && socios.length === 0) {
      socios = data.company.members.map((s: any) => s.name || "")
    }
  }

  console.log("[v0] Dados consolidados:", {
    razaoSocial,
    nomeFantasia,
    email,
    telefone,
    cidade,
    uf,
    endereco,
    socios,
  })

  return {
    success: sources.length > 0,
    sources,
    data: {
      cnpj,
      razao_social: razaoSocial,
      nome_fantasia: nomeFantasia,
      email,
      telefone,
      cidade,
      uf,
      endereco,
      socios, // Array de strings com nomes dos sócios
    },
    data_coleta: new Date().toISOString(),
  }
}
