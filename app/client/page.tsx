import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, Users, Zap, ArrowUpRight, Download } from "lucide-react"
import { ClientSidebar } from "@/components/client/client-sidebar"
import { ClientHeader } from "@/components/client/client-header"

export default function ClientDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <ClientSidebar />

      <div className="flex-1 flex flex-col">
        <ClientHeader />

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Seus leads qualificados por IA</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6 bg-card border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>8</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Leads Recebidos</p>
                  <p className="text-3xl font-bold">47</p>
                  <p className="text-xs text-muted-foreground">Este mês</p>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-sm text-muted-foreground">Média</div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Score Médio</p>
                  <p className="text-3xl font-bold text-accent">78</p>
                  <p className="text-xs text-muted-foreground">Qualidade alta</p>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>12%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Leads Contatados</p>
                  <p className="text-3xl font-bold">32</p>
                  <p className="text-xs text-muted-foreground">68% do total</p>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>5%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Conversões</p>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">25.5% taxa</p>
                </div>
              </Card>
            </div>

            {/* Plan Status */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Plano Professional</h3>
                  <p className="text-sm text-muted-foreground mb-4">100 leads qualificados por mês</p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-2xl font-bold">47</p>
                      <p className="text-xs text-muted-foreground">Recebidos</p>
                    </div>
                    <div className="text-muted-foreground">•</div>
                    <div>
                      <p className="text-2xl font-bold text-primary">53</p>
                      <p className="text-xs text-muted-foreground">Disponíveis</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-32 h-32 relative">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-secondary"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(47 / 100) * 351.86} 351.86`}
                        className="text-primary"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">47%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Leads */}
            <Card className="p-6 bg-card border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Leads Recentes</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Ver Todos
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "Carlos Silva",
                    company: "Tech Solutions Ltda",
                    score: 87,
                    city: "São Paulo",
                    time: "2 horas atrás",
                  },
                  {
                    name: "Maria Santos",
                    company: "Consultoria Premium",
                    score: 72,
                    city: "Rio de Janeiro",
                    time: "5 horas atrás",
                  },
                  {
                    name: "João Oliveira",
                    company: "Startup Tech",
                    score: 91,
                    city: "São Paulo",
                    time: "1 dia atrás",
                  },
                  {
                    name: "Ana Costa",
                    company: "Eventos Premium",
                    score: 78,
                    city: "Belo Horizonte",
                    time: "1 dia atrás",
                  },
                ].map((lead, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{lead.score}</span>
                      </div>
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{lead.city}</p>
                      <p className="text-xs text-muted-foreground">{lead.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
