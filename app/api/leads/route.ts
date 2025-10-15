import { NextResponse } from "next/server"

const mockLeads = [
  {
    id: 1,
    cnpj: "12.345.678/0001-90",
    nome_socio: "Dr. João Silva",
    telefone: "(85) 98765-4321",
    email: "joao.silva@adv.com.br",
    cidade: "Fortaleza",
    fonte: "Casa dos Dados",
    status: "novo",
    data_coleta: "2025-01-14T10:30:00",
  },
  {
    id: 2,
    cnpj: "98.765.432/0001-10",
    nome_socio: "Dra. Maria Santos",
    telefone: "(85) 99876-5432",
    email: "maria.santos@juridico.com.br",
    cidade: "Fortaleza",
    fonte: "Receita Federal",
    status: "qualificado",
    data_coleta: "2025-01-14T09:15:00",
  },
  {
    id: 3,
    cnpj: "45.678.901/0001-23",
    nome_socio: "Dr. Carlos Oliveira",
    telefone: "(85) 97654-3210",
    email: "carlos@advocacia.com.br",
    cidade: "Fortaleza",
    fonte: "Casa dos Dados",
    status: "novo",
    data_coleta: "2025-01-14T08:45:00",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const cidade = searchParams.get("cidade")

  let filtered = mockLeads

  if (status && status !== "todos") {
    filtered = filtered.filter((lead) => lead.status === status)
  }

  if (cidade) {
    filtered = filtered.filter((lead) => lead.cidade.toLowerCase().includes(cidade.toLowerCase()))
  }

  return NextResponse.json(filtered)
}
