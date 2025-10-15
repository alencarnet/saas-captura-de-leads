"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Building2, MapPin, Users, Calendar } from "lucide-react"
import Link from "next/link"

interface Company {
  cnpj: string
  razao_social: string
  nome_fantasia?: string
  porte: string
  capital_social: string
  data_abertura: string
  cidade: string
  uf: string
  atividade_principal: string
  socios: number
  situacao: string
}

export default function ComparePage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchCnpj, setSearchCnpj] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleAddCompany = async () => {
    if (!searchCnpj.trim() || companies.length >= 4) return

    setIsSearching(true)

    // Simulated company data
    const mockCompany: Company = {
      cnpj: searchCnpj,
      razao_social: "Empresa Exemplo Ltda",
      nome_fantasia: "Exemplo",
      porte: "Microempresa",
      capital_social: "R$ 50.000,00",
      data_abertura: "01/01/2020",
      cidade: "Fortaleza",
      uf: "CE",
      atividade_principal: "Serviços de consultoria",
      socios: 2,
      situacao: "Ativa",
    }

    setTimeout(() => {
      setCompanies([...companies, mockCompany])
      setSearchCnpj("")
      setIsSearching(false)
    }, 1000)
  }

  const handleRemoveCompany = (index: number) => {
    setCompanies(companies.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                ← Voltar
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Comparar Empresas</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Card className="p-6 mb-8 bg-card border-border/50">
          <h2 className="text-lg font-semibold mb-4">Compare informações de até 4 empresas lado a lado</h2>
          <div className="flex gap-3">
            <Input
              placeholder="Digite o CNPJ da empresa..."
              value={searchCnpj}
              onChange={(e) => setSearchCnpj(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCompany()}
              disabled={companies.length >= 4 || isSearching}
              className="flex-1"
            />
            <Button onClick={handleAddCompany} disabled={companies.length >= 4 || isSearching || !searchCnpj.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Empresa
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{companies.length}/4 empresas adicionadas</p>
        </Card>

        {companies.length === 0 ? (
          <Card className="p-12 text-center bg-card border-border/50">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma empresa adicionada</h3>
            <p className="text-sm text-muted-foreground">
              Adicione empresas usando o formulário acima para começar a comparação.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {companies.map((company, index) => (
              <Card key={index} className="p-6 bg-card border-border/50 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 w-8 h-8 p-0"
                  onClick={() => handleRemoveCompany(index)}
                >
                  <X className="w-4 h-4" />
                </Button>

                <div className="mb-4">
                  <Badge variant={company.situacao === "Ativa" ? "default" : "secondary"} className="mb-2">
                    {company.situacao}
                  </Badge>
                  <h3 className="font-bold text-lg mb-1">{company.razao_social}</h3>
                  {company.nome_fantasia && <p className="text-sm text-muted-foreground">{company.nome_fantasia}</p>}
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">CNPJ</p>
                    <p className="text-sm font-mono">{company.cnpj}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Porte</p>
                    <p className="text-sm">{company.porte}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Capital Social</p>
                    <p className="text-sm font-semibold">{company.capital_social}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Abertura</p>
                      <p className="text-sm">{company.data_abertura}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Localização</p>
                      <p className="text-sm">
                        {company.cidade} - {company.uf}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Sócios</p>
                      <p className="text-sm">{company.socios}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Atividade Principal</p>
                    <p className="text-sm">{company.atividade_principal}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
