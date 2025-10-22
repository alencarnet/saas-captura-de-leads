"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Download,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Users,
  Target,
  CheckCircle2,
  Loader2,
  Sparkles,
  AlertCircle,
  Upload,
  MessageSquare,
  Bot,
  ExternalLink,
  GitCompare,
  FileSpreadsheet,
  FileText,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Lead {
  id: number
  cnpj: string
  razao_social: string
  nome_fantasia?: string
  nome_socio: string
  telefone: string
  email: string
  cidade: string
  uf?: string
  fonte: string
  status: string
  data_coleta: string
  socios?: any[]
  endereco?: string // Added for enriched data
}

export default function DashboardPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [smartSearch, setSmartSearch] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState("")
  const [quota, setQuota] = useState({ used: 5, limit: 10, remaining: 5 })
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "email" | "ai" | null>(null)
  const [contactMessage, setContactMessage] = useState("")
  const [isSendingContact, setIsSendingContact] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [compareLeads, setCompareLeads] = useState<Lead[]>([])

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated")
    if (!isAuth) {
      router.push("/login")
    }
  }, [router])

  useEffect(() => {
    const loadLeads = async () => {
      try {
        console.log("[v0] Carregando leads da API...")
        const response = await fetch("/api/leads")

        if (!response.ok) {
          throw new Error("Erro ao carregar leads")
        }

        const data = await response.json()
        console.log("[v0] Leads carregados:", data)
        setLeads(data)
      } catch (error) {
        console.error("[v0] Erro ao carregar leads:", error)
        // Manter array vazio em caso de erro
      }
    }

    loadLeads()
  }, [])

  useEffect(() => {
    let filtered = leads

    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.nome_socio.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.cnpj.includes(searchTerm) ||
          lead.cidade.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "todos") {
      filtered = filtered.filter((lead) => lead.status === statusFilter)
    }

    setFilteredLeads(filtered)
  }, [searchTerm, statusFilter, leads])

  const handleSmartSearch = async () => {
    if (!smartSearch.trim()) {
      setSearchError("Digite um CNPJ, CNAE, nome da empresa ou sócio")
      return
    }

    setIsSearching(true)
    setSearchError("")

    try {
      console.log("[v0] Iniciando busca inteligente:", smartSearch)

      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: smartSearch, userId: "user123" }),
      })

      const data = await response.json()
      console.log("[v0] Resposta da busca:", data)

      if (response.status === 429) {
        setSearchError(data.message)
        setQuota(data.quota)
        return
      }

      if (!response.ok) {
        throw new Error(data.error || "Erro ao buscar")
      }

      if (data.quota) {
        setQuota(data.quota)
      }

      if (data.results && data.results.length > 0) {
        const newLeads = data.results.map((result: any, index: number) => ({
          id: Date.now() + index,
          cnpj: result.cnpj || "N/A",
          razao_social: result.razao_social || result.razao_social || "Não informado",
          nome_fantasia: result.nome_fantasia,
          nome_socio: result.socios?.[0]?.nome || "Não informado",
          telefone: result.telefone || "Não informado",
          email: result.email || "Não informado",
          cidade: result.cidade || "Não informado",
          uf: result.uf,
          fonte: result.sources?.join(", ") || result.fonte || "Busca Inteligente",
          status: "novo",
          data_coleta: result.data_coleta || new Date().toISOString(),
          socios: result.socios,
        }))

        setLeads([...newLeads, ...leads])
        setSmartSearch("")
        setSearchError("")
      } else {
        setSearchError("Nenhum resultado encontrado")
      }
    } catch (error: any) {
      console.error("[v0] Erro na busca:", error)
      setSearchError(error.message || "Erro ao buscar. Tente novamente.")
    } finally {
      setIsSearching(false)
    }
  }

  const handleQualify = (id: number, newStatus: string) => {
    setLeads(leads.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead)))
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const handleExportExcel = async () => {
    try {
      const XLSX = await import("xlsx")

      const data = filteredLeads.map((lead) => ({
        "Nome da Empresa": lead.razao_social,
        "Nome do Sócio": lead.nome_socio,
        Telefone: lead.telefone,
        Email: lead.email,
        CNPJ: lead.cnpj,
        Cidade: lead.cidade,
        UF: lead.uf || "",
        Fonte: lead.fonte,
        Status: lead.status,
        "Data Coleta": new Date(lead.data_coleta).toLocaleString("pt-BR"),
      }))

      const ws = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Leads")

      // Use writeFile which works in browser
      XLSX.writeFile(wb, `leads-${new Date().toISOString().split("T")[0]}.xlsx`)
    } catch (error) {
      console.error("Erro ao exportar Excel:", error)
      alert("Erro ao exportar para Excel. Tente novamente.")
    }
  }

  const handleExportCSV = () => {
    const csv = [
      [
        "Nome da Empresa",
        "Nome do Sócio",
        "Telefone",
        "Email",
        "CNPJ",
        "Cidade",
        "UF",
        "Fonte",
        "Status",
        "Data Coleta",
      ],
      ...filteredLeads.map((lead) => [
        lead.razao_social,
        lead.nome_socio,
        lead.telefone,
        lead.email,
        lead.cnpj,
        lead.cidade,
        lead.uf || "",
        lead.fonte,
        lead.status,
        new Date(lead.data_coleta).toLocaleString("pt-BR"),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const BOM = "\uFEFF"
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleExportPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf")
      const autoTable = (await import("jspdf-autotable")).default

      const doc = new jsPDF()

      doc.setFontSize(18)
      doc.text("Relatório de Leads", 14, 20)

      doc.setFontSize(10)
      doc.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 14, 28)
      doc.text(`Total de leads: ${filteredLeads.length}`, 14, 34)

      const tableData = filteredLeads.map((lead) => [
        lead.razao_social,
        lead.nome_socio,
        lead.telefone,
        lead.email,
        lead.cnpj,
        `${lead.cidade}${lead.uf ? ` - ${lead.uf}` : ""}`,
        lead.status,
      ])

      autoTable(doc, {
        startY: 40,
        head: [["Empresa", "Sócio", "Telefone", "Email", "CNPJ", "Localização", "Status"]],
        body: tableData,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [99, 102, 241] },
      })

      doc.save(`leads-${new Date().toISOString().split("T")[0]}.pdf`)
    } catch (error) {
      console.error("Erro ao exportar PDF:", error)
      alert("Erro ao exportar para PDF. Tente novamente.")
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/leads/import-excel", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao importar arquivo")
      }

      if (data.leads && data.leads.length > 0) {
        const enrichedLeads = await Promise.all(
          data.leads.map(async (lead: Lead) => {
            // If CNPJ exists, fetch real data
            if (lead.cnpj && lead.cnpj.replace(/\D/g, "").length === 14) {
              try {
                const cnpjResponse = await fetch("/api/cnpj/search", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ cnpj: lead.cnpj }),
                })

                if (cnpjResponse.ok) {
                  const cnpjData = await cnpjResponse.json()
                  if (cnpjData.success && cnpjData.data) {
                    // Merge real data with imported data
                    return {
                      ...lead,
                      razao_social: cnpjData.data.razao_social || lead.razao_social,
                      nome_fantasia: cnpjData.data.nome_fantasia,
                      nome_socio: cnpjData.data.socios?.[0]?.nome || lead.nome_socio, // Corrected to access name property
                      telefone: cnpjData.data.telefone || lead.telefone,
                      email: cnpjData.data.email || lead.email,
                      cidade: cnpjData.data.cidade || lead.cidade,
                      uf: cnpjData.data.uf || lead.uf,
                      endereco: cnpjData.data.endereco,
                      fonte: cnpjData.data.sources?.join(", ") || "Importação + APIs",
                    }
                  }
                }
              } catch (error) {
                console.error(`Erro ao buscar dados do CNPJ ${lead.cnpj}:`, error)
              }
            }
            return lead
          }),
        )

        setLeads([...enrichedLeads, ...leads])
        alert(`${enrichedLeads.length} leads importados e enriquecidos com dados reais!`)
      }
    } catch (error: any) {
      alert(error.message || "Erro ao importar arquivo")
    } finally {
      setIsUploading(false)
      setUploadedFile(null)
      e.target.value = ""
    }
  }

  const handleSendContact = async () => {
    if (!selectedLead || !contactMethod) return

    setIsSendingContact(true)

    try {
      const response = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: selectedLead.id,
          method: contactMethod,
          message: contactMessage,
          lead: selectedLead,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar contato")
      }

      alert(`Contato enviado com sucesso via ${contactMethod}!`)
      setContactMethod(null)
      setContactMessage("")
    } catch (error: any) {
      alert(error.message || "Erro ao enviar contato")
    } finally {
      setIsSendingContact(false)
    }
  }

  const toggleCompare = (lead: Lead) => {
    if (compareLeads.find((l) => l.id === lead.id)) {
      setCompareLeads(compareLeads.filter((l) => l.id !== lead.id))
    } else if (compareLeads.length < 4) {
      setCompareLeads([...compareLeads, lead])
    } else {
      alert("Você pode comparar no máximo 4 empresas")
    }
  }

  const stats = {
    total: leads.length,
    novos: leads.filter((l) => l.status === "novo").length,
    qualificados: leads.filter((l) => l.status === "qualificado").length,
    descartados: leads.filter((l) => l.status === "descartado").length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Leads Ativos</h1>
              <p className="text-xs text-muted-foreground">Plataforma de Prospecção Inteligente</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              localStorage.removeItem("isAuthenticated")
              localStorage.removeItem("userRole")
              router.push("/login")
            }}
          >
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Card className="p-4 mb-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold">Plano Gratuito</span>
            </div>
            <Button size="sm" variant="default">
              Fazer Upgrade
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Buscas utilizadas: {quota.used} de {quota.limit}
              </span>
              <span className="font-semibold">{quota.remaining} restantes</span>
            </div>
            <Progress value={(quota.used / quota.limit) * 100} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Upgrade para o plano Pro e tenha buscas ilimitadas + acesso a dados avançados
          </p>
        </Card>

        <Card className="p-6 mb-8 bg-card border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Busca Inteligente</h2>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Digite CNPJ, CNAE, nome da empresa ou sócio..."
                value={smartSearch}
                onChange={(e) => setSmartSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSmartSearch()}
                className="bg-secondary border-border"
                disabled={isSearching || quota.remaining === 0}
              />
              {searchError && (
                <div className="flex items-center gap-2 mt-2">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <p className="text-sm text-destructive">{searchError}</p>
                </div>
              )}
            </div>
            <Button
              onClick={handleSmartSearch}
              disabled={isSearching || quota.remaining === 0}
              className="min-w-[140px]"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </>
              )}
            </Button>
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-xs text-muted-foreground">
              <strong>Busca automática:</strong> CNPJ (14 dígitos) → APIs públicas | CNAE (7 dígitos) → Banco local |
              Texto → Nome da empresa ou sócio
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Fontes:</strong> ReceitaWS, CNPJ.ws, CNPJá (APIs) + Banco de Dados Receita Federal (local)
            </p>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total de Leads</span>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl font-bold">{stats.total}</div>
          </Card>

          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Novos</span>
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div className="text-3xl font-bold">{stats.novos}</div>
          </Card>

          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Qualificados</span>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold">{stats.qualificados}</div>
          </Card>

          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Taxa de Qualificação</span>
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl font-bold">
              {stats.total > 0 ? Math.round((stats.qualificados / stats.total) * 100) : 0}%
            </div>
          </Card>
        </div>

        {/* Actions Bar */}
        <Card className="p-4 mb-6 bg-card border-border/50">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, email, CNPJ ou cidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                />
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Button
                variant={statusFilter === "todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("todos")}
              >
                Todos
              </Button>
              <Button
                variant={statusFilter === "novo" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("novo")}
              >
                Novos
              </Button>
              <Button
                variant={statusFilter === "qualificado" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("qualificado")}
              >
                Qualificados
              </Button>
            </div>

            <div className="flex gap-2">
              <label htmlFor="excel-upload">
                <Button variant="outline" size="sm" disabled={isUploading} asChild>
                  <span className="cursor-pointer">
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    Importar
                  </span>
                </Button>
              </label>
              <input
                id="excel-upload"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />

              {compareLeads.length > 0 && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => router.push(`/dashboard/compare?ids=${compareLeads.map((l) => l.id).join(",")}`)}
                >
                  <GitCompare className="w-4 h-4 mr-2" />
                  Comparar ({compareLeads.length})
                </Button>
              )}

              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Atualizar
              </Button>

              {/* Dropdown Menu for Export Options */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleExportExcel}>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Exportar Excel (.xlsx)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportCSV}>
                    <FileText className="w-4 h-4 mr-2" />
                    Exportar CSV (.csv)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportPDF}>
                    <FileText className="w-4 h-4 mr-2" />
                    Exportar PDF (.pdf)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>

        {/* Leads Table */}
        <Card className="bg-card border-border/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border/50">
                <tr className="bg-muted/30">
                  <th className="text-left p-4 text-sm font-semibold">Comparar</th>
                  <th className="text-left p-4 text-sm font-semibold">Razão Social / Sócio</th>
                  <th className="text-left p-4 text-sm font-semibold">CNPJ</th>
                  <th className="text-left p-4 text-sm font-semibold">Contato</th>
                  <th className="text-left p-4 text-sm font-semibold">Localização</th>
                  <th className="text-left p-4 text-sm font-semibold">Fonte</th>
                  <th className="text-left p-4 text-sm font-semibold">Status</th>
                  <th className="text-left p-4 text-sm font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={compareLeads.some((l) => l.id === lead.id)}
                        onChange={() => toggleCompare(lead)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="p-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="text-left hover:text-primary transition-colors"
                          >
                            <div className="font-medium hover:underline">{lead.razao_social}</div>
                            <div className="text-sm text-muted-foreground">{lead.nome_socio}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(lead.data_coleta).toLocaleDateString("pt-BR")}
                            </div>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{lead.razao_social}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">CNPJ</p>
                                <p className="font-mono font-semibold">{lead.cnpj}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Status</p>
                                <Badge
                                  variant={
                                    lead.status === "qualificado"
                                      ? "default"
                                      : lead.status === "novo"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                >
                                  {lead.status === "novo"
                                    ? "Novo"
                                    : lead.status === "qualificado"
                                      ? "Qualificado"
                                      : "Descartado"}
                                </Badge>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Nome Fantasia</p>
                              <p className="font-semibold">{lead.nome_fantasia || "Não informado"}</p>
                            </div>

                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Sócio Principal</p>
                              <p className="font-semibold">{lead.nome_socio}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Telefone</p>
                                <p className="font-semibold">{lead.telefone}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Email</p>
                                <p className="font-semibold text-sm">{lead.email}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Localização</p>
                              <p className="font-semibold">
                                {lead.cidade}
                                {lead.uf && ` - ${lead.uf}`}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Fonte</p>
                              <Badge variant="outline">{lead.fonte}</Badge>
                            </div>

                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Data de Coleta</p>
                              <p className="font-semibold">{new Date(lead.data_coleta).toLocaleString("pt-BR")}</p>
                            </div>

                            <div className="border-t pt-6">
                              <p className="text-sm font-semibold mb-4">Entrar em Contato</p>
                              <div className="grid grid-cols-3 gap-3">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full bg-transparent"
                                      onClick={() => {
                                        setContactMethod("whatsapp")
                                        setContactMessage(
                                          `Olá ${lead.nome_socio}, tudo bem? Vi que você é sócio da ${lead.razao_social} e gostaria de conversar sobre uma oportunidade.`,
                                        )
                                      }}
                                    >
                                      <MessageSquare className="w-4 h-4 mr-2" />
                                      WhatsApp
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Enviar mensagem via WhatsApp</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <p className="text-sm text-muted-foreground mb-2">Para: {lead.telefone}</p>
                                        <Textarea
                                          value={contactMessage}
                                          onChange={(e) => setContactMessage(e.target.value)}
                                          rows={6}
                                          placeholder="Digite sua mensagem..."
                                        />
                                      </div>
                                      <Button
                                        onClick={handleSendContact}
                                        disabled={isSendingContact}
                                        className="w-full"
                                      >
                                        {isSendingContact ? (
                                          <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Enviando...
                                          </>
                                        ) : (
                                          <>
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Enviar WhatsApp
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full bg-transparent"
                                      onClick={() => {
                                        setContactMethod("email")
                                        setContactMessage(
                                          `Prezado(a) ${lead.nome_socio},\n\nEspero que esta mensagem o(a) encontre bem.\n\nMeu nome é [SEU NOME] e gostaria de conversar sobre uma oportunidade para ${lead.razao_social}.\n\nPodemos agendar uma conversa?\n\nAtenciosamente,`,
                                        )
                                      }}
                                    >
                                      <Mail className="w-4 h-4 mr-2" />
                                      Email
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Enviar email</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <p className="text-sm text-muted-foreground mb-2">Para: {lead.email}</p>
                                        <Textarea
                                          value={contactMessage}
                                          onChange={(e) => setContactMessage(e.target.value)}
                                          rows={8}
                                          placeholder="Digite sua mensagem..."
                                        />
                                      </div>
                                      <Button
                                        onClick={handleSendContact}
                                        disabled={isSendingContact}
                                        className="w-full"
                                      >
                                        {isSendingContact ? (
                                          <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Enviando...
                                          </>
                                        ) : (
                                          <>
                                            <Mail className="w-4 h-4 mr-2" />
                                            Enviar Email
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full bg-transparent"
                                      onClick={() => {
                                        setContactMethod("ai")
                                        setContactMessage("")
                                      }}
                                    >
                                      <Bot className="w-4 h-4 mr-2" />
                                      IA
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Contato Automático com IA</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <p className="text-sm text-muted-foreground">
                                        A IA irá gerar e enviar automaticamente uma mensagem personalizada para{" "}
                                        {lead.nome_socio} via WhatsApp e Email, baseada no perfil da empresa e histórico
                                        de interações.
                                      </p>
                                      <div className="bg-muted p-4 rounded-lg">
                                        <p className="text-sm font-semibold mb-2">Mensagem será enviada para:</p>
                                        <p className="text-sm">WhatsApp: {lead.telefone}</p>
                                        <p className="text-sm">Email: {lead.email}</p>
                                      </div>
                                      <Button
                                        onClick={handleSendContact}
                                        disabled={isSendingContact}
                                        className="w-full"
                                      >
                                        {isSendingContact ? (
                                          <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Gerando e enviando...
                                          </>
                                        ) : (
                                          <>
                                            <Bot className="w-4 h-4 mr-2" />
                                            Enviar com IA
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                    <td className="p-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="text-sm font-mono hover:text-primary hover:underline cursor-pointer"
                          >
                            {lead.cnpj}
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{lead.razao_social}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">CNPJ</p>
                                <div className="flex items-center gap-2">
                                  <p className="font-mono font-semibold">{lead.cnpj}</p>
                                  <a
                                    href={`https://cnpjfy.com/${lead.cnpj.replace(/\D/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Status</p>
                                <Badge
                                  variant={
                                    lead.status === "qualificado"
                                      ? "default"
                                      : lead.status === "novo"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                >
                                  {lead.status === "novo"
                                    ? "Novo"
                                    : lead.status === "qualificado"
                                      ? "Qualificado"
                                      : "Descartado"}
                                </Badge>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Nome Fantasia</p>
                              <p className="font-semibold">{lead.nome_fantasia || "Não informado"}</p>
                            </div>

                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Sócio Principal</p>
                              <p className="font-semibold">{lead.nome_socio}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Telefone</p>
                                <p className="font-semibold">{lead.telefone}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Email</p>
                                <p className="font-semibold text-sm">{lead.email}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Localização</p>
                              <p className="font-semibold">
                                {lead.cidade}
                                {lead.uf && ` - ${lead.uf}`}
                              </p>
                            </div>

                            {(lead as any).endereco && (
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Endereço Completo</p>
                                <p className="font-semibold">{(lead as any).endereco}</p>
                              </div>
                            )}

                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Fonte</p>
                              <Badge variant="outline">{lead.fonte}</Badge>
                            </div>

                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Data de Coleta</p>
                              <p className="font-semibold">{new Date(lead.data_coleta).toLocaleString("pt-BR")}</p>
                            </div>

                            <div className="border-t pt-6">
                              <p className="text-sm font-semibold mb-4">Entrar em Contato</p>
                              <div className="grid grid-cols-3 gap-3">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full bg-transparent"
                                      onClick={() => {
                                        setContactMethod("whatsapp")
                                        setContactMessage(
                                          `Olá ${lead.nome_socio}, tudo bem? Vi que você é sócio da ${lead.razao_social} e gostaria de conversar sobre uma oportunidade.`,
                                        )
                                      }}
                                    >
                                      <MessageSquare className="w-4 h-4 mr-2" />
                                      WhatsApp
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Enviar mensagem via WhatsApp</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <p className="text-sm text-muted-foreground mb-2">Para: {lead.telefone}</p>
                                        <Textarea
                                          value={contactMessage}
                                          onChange={(e) => setContactMessage(e.target.value)}
                                          rows={6}
                                          placeholder="Digite sua mensagem..."
                                        />
                                      </div>
                                      <Button
                                        onClick={handleSendContact}
                                        disabled={isSendingContact}
                                        className="w-full"
                                      >
                                        {isSendingContact ? (
                                          <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Enviando...
                                          </>
                                        ) : (
                                          <>
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Enviar WhatsApp
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full bg-transparent"
                                      onClick={() => {
                                        setContactMethod("email")
                                        setContactMessage(
                                          `Prezado(a) ${lead.nome_socio},\n\nEspero que esta mensagem o(a) encontre bem.\n\nMeu nome é [SEU NOME] e gostaria de conversar sobre uma oportunidade para ${lead.razao_social}.\n\nPodemos agendar uma conversa?\n\nAtenciosamente,`,
                                        )
                                      }}
                                    >
                                      <Mail className="w-4 h-4 mr-2" />
                                      Email
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Enviar email</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <p className="text-sm text-muted-foreground mb-2">Para: {lead.email}</p>
                                        <Textarea
                                          value={contactMessage}
                                          onChange={(e) => setContactMessage(e.target.value)}
                                          rows={8}
                                          placeholder="Digite sua mensagem..."
                                        />
                                      </div>
                                      <Button
                                        onClick={handleSendContact}
                                        disabled={isSendingContact}
                                        className="w-full"
                                      >
                                        {isSendingContact ? (
                                          <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Enviando...
                                          </>
                                        ) : (
                                          <>
                                            <Mail className="w-4 h-4 mr-2" />
                                            Enviar Email
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full bg-transparent"
                                      onClick={() => {
                                        setContactMethod("ai")
                                        setContactMessage("")
                                      }}
                                    >
                                      <Bot className="w-4 h-4 mr-2" />
                                      IA
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Contato Automático com IA</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <p className="text-sm text-muted-foreground">
                                        A IA irá gerar e enviar automaticamente uma mensagem personalizada para{" "}
                                        {lead.nome_socio} via WhatsApp e Email, baseada no perfil da empresa e histórico
                                        de interações.
                                      </p>
                                      <div className="bg-muted p-4 rounded-lg">
                                        <p className="text-sm font-semibold mb-2">Mensagem será enviada para:</p>
                                        <p className="text-sm">WhatsApp: {lead.telefone}</p>
                                        <p className="text-sm">Email: {lead.email}</p>
                                      </div>
                                      <Button
                                        onClick={handleSendContact}
                                        disabled={isSendingContact}
                                        className="w-full"
                                      >
                                        {isSendingContact ? (
                                          <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Gerando e enviando...
                                          </>
                                        ) : (
                                          <>
                                            <Bot className="w-4 h-4 mr-2" />
                                            Enviar com IA
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                    <td className="p-4">
                      <a
                        href={`https://cnpjfy.com/${lead.cnpj.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono hover:text-primary hover:underline flex items-center gap-1"
                      >
                        {lead.cnpj}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span>{lead.telefone}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span>
                          {lead.cidade}
                          {lead.uf && ` - ${lead.uf}`}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">
                        {lead.fonte}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          lead.status === "qualificado"
                            ? "default"
                            : lead.status === "novo"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {lead.status === "novo" ? "Novo" : lead.status === "qualificado" ? "Qualificado" : "Descartado"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {lead.status !== "qualificado" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQualify(lead.id, "qualificado")}
                            className="text-xs"
                          >
                            Qualificar
                          </Button>
                        )}
                        {lead.status !== "descartado" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleQualify(lead.id, "descartado")}
                            className="text-xs"
                          >
                            Descartar
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="p-12 text-center">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Nenhum lead encontrado</h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm || statusFilter !== "todos"
                  ? "Tente ajustar os filtros de busca"
                  : "Digite um CNPJ acima para buscar novos leads"}
              </p>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
