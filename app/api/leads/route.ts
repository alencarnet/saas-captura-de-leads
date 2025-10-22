import { NextResponse } from "next/server"

const mockLeads = [
  {
    id: 1,
    cnpj: "12.345.678/0001-90",
    razao_social: "Silva Advocacia Ltda",
    nome_fantasia: "Silva Advocacia",
    nome_socio: "Dr. João Silva",
    telefone: "(85) 98765-4321",
    email: "joao.silva@adv.com.br",
    cidade: "Fortaleza",
    uf: "CE",
    fonte: "Casa dos Dados",
    status: "novo",
    data_coleta: "2025-01-14T10:30:00",
  },
  {
    id: 2,
    cnpj: "98.765.432/0001-10",
    razao_social: "Santos Jurídico S/A",
    nome_fantasia: "Santos Jurídico",
    nome_socio: "Dra. Maria Santos",
    telefone: "(85) 99876-5432",
    email: "maria.santos@juridico.com.br",
    cidade: "Fortaleza",
    uf: "CE",
    fonte: "Receita Federal",
    status: "qualificado",
    data_coleta: "2025-01-14T09:15:00",
  },
  {
    id: 3,
    cnpj: "45.678.901/0001-23",
    razao_social: "Oliveira Consultoria Ltda",
    nome_fantasia: "Oliveira Consultoria",
    nome_socio: "Dr. Carlos Oliveira",
    telefone: "(85) 97654-3210",
    email: "carlos@advocacia.com.br",
    cidade: "Fortaleza",
    uf: "CE",
    fonte: "Casa dos Dados",
    status: "novo",
    data_coleta: "2025-01-14T08:45:00",
  },
  {
    id: 4,
    cnpj: "11.222.333/0001-44",
    razao_social: "Ferreira & Associados",
    nome_fantasia: "Ferreira Advocacia",
    nome_socio: "Dra. Ana Ferreira",
    telefone: "(85) 96543-2109",
    email: "ana.ferreira@adv.com.br",
    cidade: "Fortaleza",
    uf: "CE",
    fonte: "LinkedIn",
    status: "novo",
    data_coleta: "2025-01-14T07:20:00",
  },
  {
    id: 5,
    cnpj: "55.666.777/0001-88",
    razao_social: "Costa Advocacia Empresarial",
    nome_fantasia: "Costa Advocacia",
    nome_socio: "Dr. Pedro Costa",
    telefone: "(85) 95432-1098",
    email: "pedro.costa@costaadv.com.br",
    cidade: "Fortaleza",
    uf: "CE",
    fonte: "Receita Federal",
    status: "qualificado",
    data_coleta: "2025-01-13T16:30:00",
  },
]

export async function GET(request: Request) {
  console.log("[v0] API /api/leads chamada")

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

  console.log("[v0] Retornando", filtered.length, "leads")
  return NextResponse.json(filtered)
}
