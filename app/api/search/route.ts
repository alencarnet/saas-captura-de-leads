import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { query, userId } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query é obrigatória" }, { status: 400 })
    }

    console.log("[v0] Iniciando busca inteligente:", query)

    const queryType = detectQueryType(query)
    console.log("[v0] Tipo de busca detectado:", queryType)

    const quotaCheck = await checkUserQuota(userId)
    if (!quotaCheck.allowed) {
      return NextResponse.json(
        {
          error: "Limite de buscas atingido",
          message: "Você atingiu o limite de buscas gratuitas. Faça upgrade para continuar.",
          quota: quotaCheck,
        },
        { status: 429 },
      )
    }

    let results

    if (queryType === "CNPJ") {
      // Busca por CNPJ nas APIs públicas
      results = await searchByCNPJ(query)
    } else if (queryType === "CNAE") {
      // Busca por CNAE no banco local (simulado)
      results = await searchByCNAE(query)
    } else {
      results = await searchByName(query)
    }

    await incrementUserQuota(userId)

    return NextResponse.json({
      success: true,
      queryType,
      results,
      quota: {
        used: quotaCheck.used + 1,
        limit: quotaCheck.limit,
        remaining: quotaCheck.remaining - 1,
      },
    })
  } catch (error) {
    console.error("[v0] Erro na busca:", error)
    return NextResponse.json({ error: "Erro ao realizar busca" }, { status: 500 })
  }
}

function detectQueryType(query: string): "CNPJ" | "CNAE" | "NAME" {
  const cleaned = query.replace(/[^\d]/g, "")

  if (cleaned.length === 14) {
    return "CNPJ"
  } else if (cleaned.length === 7) {
    return "CNAE"
  } else {
    return "NAME"
  }
}

async function searchByCNPJ(cnpj: string) {
  const cnpjLimpo = cnpj.replace(/[^\d]/g, "")

  console.log("[v0] Buscando CNPJ nas 3 APIs:", cnpjLimpo)

  // Tenta as 3 APIs em paralelo com fallback
  const [receitaData, cnpjWsData, cnpjaData] = await Promise.allSettled([
    fetchReceitaWS(cnpjLimpo),
    fetchCNPJWS(cnpjLimpo),
    fetchCNPJa(cnpjLimpo),
  ])

  const consolidatedData = consolidateData(receitaData, cnpjWsData, cnpjaData, cnpjLimpo)

  if (!consolidatedData.success) {
    throw new Error("CNPJ não encontrado em nenhuma fonte")
  }

  return [consolidatedData]
}

async function searchByCNAE(cnae: string) {
  console.log("[v0] Buscando por CNAE:", cnae)

  // Simulação de busca no banco PostgreSQL
  const mockResults = [
    {
      cnpj: "12345678000190",
      razao_social: "Tech Solutions Ltda",
      nome_fantasia: "TechSol",
      cnae_principal: cnae,
      cidade: "São Paulo",
      uf: "SP",
      fonte: "Banco Local",
    },
    {
      cnpj: "98765432000110",
      razao_social: "Digital Services S/A",
      nome_fantasia: "DigiServ",
      cnae_principal: cnae,
      cidade: "Rio de Janeiro",
      uf: "RJ",
      fonte: "Banco Local",
    },
  ]

  return mockResults
}

async function searchByName(name: string) {
  console.log("[v0] Buscando por nome:", name)

  // Simulação de busca no banco PostgreSQL
  const mockResults = [
    {
      cnpj: "11223344000155",
      razao_social: `${name} Consultoria Ltda`,
      nome_fantasia: name,
      socios: [{ nome: name, qualificacao: "Sócio Administrador" }],
      cidade: "Fortaleza",
      uf: "CE",
      fonte: "Banco Local",
    },
  ]

  return mockResults
}

async function checkUserQuota(userId?: string) {
  // Simulação de verificação de quota
  // Em produção, isso consultaria o banco de dados
  const userQuota = {
    used: 5,
    limit: 10, // Plano gratuito: 10 buscas/dia
    remaining: 5,
    plan: "free",
  }

  return {
    allowed: userQuota.remaining > 0,
    ...userQuota,
  }
}

async function incrementUserQuota(userId?: string) {
  // Em produção, incrementaria o contador no banco
  console.log("[v0] Incrementando quota do usuário:", userId)
}

// APIs de CNPJ (mantidas do código anterior)
async function fetchReceitaWS(cnpj: string) {
  try {
    const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) throw new Error(`ReceitaWS error: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error("[v0] Erro ReceitaWS:", error)
    throw error
  }
}

async function fetchCNPJWS(cnpj: string) {
  try {
    const response = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) throw new Error(`CNPJ.ws error: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error("[v0] Erro CNPJ.ws:", error)
    throw error
  }
}

async function fetchCNPJa(cnpj: string) {
  try {
    const response = await fetch(`https://cnpja.com/api/cnpj/${cnpj}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) throw new Error(`CNPJá error: ${response.status}`)
    return await response.json()
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
  let socios: any[] = []

  if (receitaResult.status === "fulfilled" && receitaResult.value) {
    const data = receitaResult.value
    sources.push("ReceitaWS")
    razaoSocial = razaoSocial || data.nome || ""
    nomeFantasia = nomeFantasia || data.fantasia || ""
    email = email || data.email || ""
    telefone = telefone || data.telefone || ""
    cidade = cidade || data.municipio || ""
    uf = uf || data.uf || ""

    if (data.qsa && Array.isArray(data.qsa)) {
      socios = data.qsa.map((s: any) => ({ nome: s.nome, qualificacao: s.qual }))
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

    if (data.socios && Array.isArray(data.socios)) {
      socios =
        socios.length > 0
          ? socios
          : data.socios.map((s: any) => ({
              nome: s.nome,
              qualificacao: s.qualificacao_socio?.descricao || "",
            }))
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

    if (data.company?.members && Array.isArray(data.company.members)) {
      socios =
        socios.length > 0
          ? socios
          : data.company.members.map((s: any) => ({
              nome: s.name,
              qualificacao: s.role?.text || "",
            }))
    }
  }

  return {
    success: sources.length > 0,
    sources,
    cnpj,
    razao_social: razaoSocial,
    nome_fantasia: nomeFantasia,
    email,
    telefone,
    cidade,
    uf,
    socios,
    data_coleta: new Date().toISOString(),
  }
}
