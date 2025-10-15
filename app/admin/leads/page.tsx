import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, Search, Filter, Download, Brain, MessageSquare, UserPlus } from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default function LeadsPage() {
  const leads = [
    {
      id: 1,
      name: "Carlos Silva",
      email: "carlos@empresa.com",
      phone: "+55 11 98765-4321",
      company: "Tech Solutions Ltda",
      city: "São Paulo",
      campaign: "Google Ads - Imóveis",
      score: 87,
      category: "Alta",
      status: "qualified",
      created: "2025-01-15",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@consultoria.com",
      phone: "+55 21 97654-3210",
      company: "Consultoria Premium",
      city: "Rio de Janeiro",
      campaign: "Meta Ads - Consultoria",
      score: 72,
      category: "Alta",
      status: "distributed",
      created: "2025-01-15",
    },
    {
      id: 3,
      name: "João Oliveira",
      email: "joao@startup.io",
      phone: "+55 11 96543-2109",
      company: "Startup Tech",
      city: "São Paulo",
      campaign: "Apollo.io - B2B Tech",
      score: 91,
      category: "Alta",
      status: "qualified",
      created: "2025-01-14",
    },
    {
      id: 4,
      name: "Ana Costa",
      email: "ana@eventos.com",
      phone: "+55 31 95432-1098",
      company: "Eventos Premium",
      city: "Belo Horizonte",
      campaign: "Import Manual - Eventos",
      score: 45,
      category: "Média",
      status: "new",
      created: "2025-01-14",
    },
    {
      id: 5,
      name: "Pedro Almeida",
      email: "pedro@tech.com",
      phone: "+55 11 94321-0987",
      company: "Tech Innovations",
      city: "São Paulo",
      campaign: "Google Ads - Imóveis",
      score: 28,
      category: "Baixa",
      status: "new",
      created: "2025-01-13",
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-500"
    if (score >= 40) return "text-yellow-500"
    return "text-red-500"
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      new: { label: "Novo", className: "bg-blue-500/10 text-blue-500" },
      qualified: { label: "Qualificado", className: "bg-green-500/10 text-green-500" },
      distributed: { label: "Distribuído", className: "bg-purple-500/10 text-purple-500" },
      contacted: { label: "Contatado", className: "bg-yellow-500/10 text-yellow-500" },
      converted: { label: "Convertido", className: "bg-emerald-500/10 text-emerald-500" },
    }
    const variant = variants[status] || variants.new
    return <Badge className={variant.className}>{variant.label}</Badge>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Leads</h1>
                <p className="text-muted-foreground">Gerencie e qualifique seus leads</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button className="bg-primary hover:bg-primary/90">
                  <Upload className="w-4 h-4 mr-2" />
                  Importar CSV
                </Button>
              </div>
            </div>

            <Card className="p-6 bg-card border-border/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, email, empresa..."
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Lead</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contato</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Campanha</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Score IA</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Data</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium">{lead.name}</p>
                            <p className="text-sm text-muted-foreground">{lead.company}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <p className="text-muted-foreground">{lead.email}</p>
                            <p className="text-muted-foreground">{lead.phone}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm">{lead.campaign}</p>
                          <p className="text-xs text-muted-foreground">{lead.city}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Brain className={`w-4 h-4 ${getScoreColor(lead.score)}`} />
                            <span className={`text-lg font-bold ${getScoreColor(lead.score)}`}>{lead.score}</span>
                            <span className="text-xs text-muted-foreground">({lead.category})</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">{getStatusBadge(lead.status)}</td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-muted-foreground">
                            {new Date(lead.created).toLocaleDateString("pt-BR")}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" title="Enviar WhatsApp">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Atribuir cliente">
                              <UserPlus className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground">Mostrando 5 de 1,247 leads</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm">
                    Próximo
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
