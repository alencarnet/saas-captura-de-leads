"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Filter, Download, Upload, Search, MoreVertical, MessageSquare, Eye, Phone, Mail } from "lucide-react"
import { useToast } from "@/components/toast-context"

interface Lead {
  id: string
  cnpj: string
  nome: string
  nome_socio: string
  telefone: string
  email: string
  cidade: string
  status: string
  score: number
  whatsappValid?: boolean
}

export default function LeadsPage() {
  const { showToast } = useToast()
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      cnpj: "12.345.678/0001-90",
      nome: "Tech Solutions LTDA",
      nome_socio: "João Silva",
      telefone: "+55 11 98765-4321",
      email: "contato@techsolutions.com",
      cidade: "São Paulo - SP",
      status: "Quente",
      score: 92,
      whatsappValid: true,
    },
    {
      id: "2",
      cnpj: "98.765.432/0001-10",
      nome: "Inovação Digital ME",
      nome_socio: "Maria Santos",
      telefone: "+55 21 97654-3210",
      email: "maria@inovacao.com",
      cidade: "Rio de Janeiro - RJ",
      status: "Morno",
      score: 65,
      whatsappValid: true,
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showQuickView, setShowQuickView] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const handleExport = (format: "excel" | "csv" | "pdf") => {
    showToast("info", `Exportando leads em formato ${format.toUpperCase()}...`)
    setTimeout(() => {
      showToast("success", `Leads exportados com sucesso em ${format.toUpperCase()}!`)
    }, 1500)
  }

  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".xlsx,.xls,.csv"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        showToast("info", `Importando ${file.name}...`)
        setTimeout(() => {
          showToast("success", "Leads importados e enriquecidos com sucesso!")
        }, 2000)
      }
    }
    input.click()
  }

  const openQuickView = (lead: Lead) => {
    setSelectedLead(lead)
    setShowQuickView(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Quente":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      case "Morno":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "Frio":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const filteredLeads = leads.filter(
    (lead) =>
      lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.cnpj.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.nome_socio.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Leads</h1>
          <p className="text-muted-foreground">Gerencie e qualifique seus leads com IA</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleImport} variant="outline" className="gap-2 bg-transparent">
            <Upload className="w-4 h-4" />
            Importar
          </Button>
          <Button className="gap-2 bg-primary">
            <Plus className="w-4 h-4" />
            Novo Lead
          </Button>
        </div>
      </div>

      {/* Search and Actions */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, CNPJ ou setor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport("excel")}>Exportar Excel</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("csv")}>Exportar CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>Exportar PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">Empresa</th>
                <th className="text-left p-4 font-medium">Sócio</th>
                <th className="text-left p-4 font-medium">Contato</th>
                <th className="text-left p-4 font-medium">Localização</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Score AI</th>
                <th className="text-right p-4 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t border-border hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => openQuickView(lead)}
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{lead.nome}</p>
                      <p className="text-sm text-muted-foreground">{lead.cnpj}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{lead.nome_socio}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{lead.telefone}</span>
                        {lead.whatsappValid && (
                          <Badge
                            variant="outline"
                            className="bg-green-500/10 text-green-600 border-green-500/20 text-xs"
                          >
                            WhatsApp
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{lead.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{lead.cidade}</p>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{lead.score}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          showToast("info", "Abrindo conversa no WhatsApp...")
                        }}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Enviar Email</DropdownMenuItem>
                          <DropdownMenuItem>Adicionar ao Funil</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Mostrando {filteredLeads.length} de {leads.length} leads
          </p>
        </div>
      </Card>

      {/* QuickView Dialog */}
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Eye className="w-5 h-5" />
              Detalhes do Lead
            </DialogTitle>
            <DialogDescription>Informações completas do lead selecionado</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Empresa</label>
                  <p className="text-lg font-semibold">{selectedLead.nome}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">CNPJ</label>
                  <p className="text-lg">{selectedLead.cnpj}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Sócio</label>
                  <p className="text-lg">{selectedLead.nome_socio}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Localização</label>
                  <p className="text-lg">{selectedLead.cidade}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                  <div className="flex items-center gap-2">
                    <p className="text-lg">{selectedLead.telefone}</p>
                    {selectedLead.whatsappValid && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                        WhatsApp
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-lg">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(selectedLead.status)}>{selectedLead.status}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Score AI</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${selectedLead.score}%` }}
                      />
                    </div>
                    <span className="text-lg font-semibold">{selectedLead.score}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Enviar WhatsApp
                </Button>
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Mail className="w-4 h-4" />
                  Enviar Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
