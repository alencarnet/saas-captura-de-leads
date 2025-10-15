import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Brain, MessageSquare, Phone, Mail, CheckCircle, XCircle } from "lucide-react"
import { ClientSidebar } from "@/components/client/client-sidebar"
import { ClientHeader } from "@/components/client/client-header"

export default function ClientLeadsPage() {
  const leads = [
    {
      id: 1,
      name: "Carlos Silva",
      email: "carlos@empresa.com",
      phone: "+55 11 98765-4321",
      company: "Tech Solutions Ltda",
      city: "São Paulo",
      score: 87,
      category: "Alta",
      status: "new",
      received: "2025-01-15",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@consultoria.com",
      phone: "+55 21 97654-3210",
      company: "Consultoria Premium",
      city: "Rio de Janeiro",
      score: 72,
      category: "Alta",
      status: "contacted",
      received: "2025-01-15",
    },
    {
      id: 3,
      name: "João Oliveira",
      email: "joao@startup.io",
      phone: "+55 11 96543-2109",
      company: "Startup Tech",
      city: "São Paulo",
      score: 91,
      category: "Alta",
      status: "new",
      received: "2025-01-14",
    },
    {
      id: 4,
      name: "Ana Costa",
      email: "ana@eventos.com",
      phone: "+55 31 95432-1098",
      company: "Eventos Premium",
      city: "Belo Horizonte",
      score: 78,
      category: "Alta",
      status: "contacted",
      received: "2025-01-14",
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
      contacted: { label: "Contatado", className: "bg-yellow-500/10 text-yellow-500" },
      converted: { label: "Convertido", className: "bg-green-500/10 text-green-500" },
      discarded: { label: "Descartado", className: "bg-red-500/10 text-red-500" },
    }
    const variant = variants[status] || variants.new
    return <Badge className={variant.className}>{variant.label}</Badge>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <ClientSidebar />

      <div className="flex-1 flex flex-col">
        <ClientHeader />

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Meus Leads</h1>
                <p className="text-muted-foreground">Leads qualificados recebidos</p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>

            <Card className="p-6 bg-card border-border/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, empresa, cidade..."
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>

              <div className="grid gap-4">
                {leads.map((lead) => (
                  <Card
                    key={lead.id}
                    className="p-6 bg-secondary/30 border-border/50 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                          <div className="text-center">
                            <Brain className={`w-6 h-6 mx-auto mb-1 ${getScoreColor(lead.score)}`} />
                            <span className={`text-lg font-bold ${getScoreColor(lead.score)}`}>{lead.score}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{lead.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{lead.company}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{lead.city}</span>
                            <span>•</span>
                            <span>Recebido em {new Date(lead.received).toLocaleDateString("pt-BR")}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">{getStatusBadge(lead.status)}</div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4 p-4 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Categoria: {lead.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Phone className="w-4 h-4 mr-2" />
                        Ligar
                      </Button>
                      <Button variant="outline" size="icon" className="bg-transparent">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </Button>
                      <Button variant="outline" size="icon" className="bg-transparent">
                        <XCircle className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground">Mostrando 4 de 47 leads</p>
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
