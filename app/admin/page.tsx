import { Card } from "@/components/ui/card"
import { Brain, Users, Target, TrendingUp, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Visão geral da plataforma Fluxo LeadAI</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6 bg-card border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>12%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Leads Gerados</p>
                  <p className="text-3xl font-bold">1,247</p>
                  <p className="text-xs text-muted-foreground">+156 esta semana</p>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>8%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Leads Qualificados</p>
                  <p className="text-3xl font-bold">892</p>
                  <p className="text-xs text-muted-foreground">71.5% taxa de qualificação</p>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>5%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Clientes Ativos</p>
                  <p className="text-3xl font-bold">47</p>
                  <p className="text-xs text-muted-foreground">+3 este mês</p>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-red-500">
                    <ArrowDownRight className="w-4 h-4" />
                    <span>3%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
                  <p className="text-3xl font-bold">24.3%</p>
                  <p className="text-xs text-muted-foreground">217 conversões</p>
                </div>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6 bg-card border-border/50">
                <h3 className="text-lg font-semibold mb-4">Leads por Campanha</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Campanha Google Ads - Imóveis</span>
                      <span className="font-medium">342</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "68%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Meta Ads - Consultoria</span>
                      <span className="font-medium">287</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: "57%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Apollo.io - B2B Tech</span>
                      <span className="font-medium">198</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "40%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Import Manual - Eventos</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: "31%" }} />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border/50">
                <h3 className="text-lg font-semibold mb-4">Distribuição por Score</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Alta (70-100)</p>
                      <p className="text-2xl font-bold text-green-500">412</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">33%</p>
                      <Zap className="w-8 h-8 text-green-500 ml-auto" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Média (40-69)</p>
                      <p className="text-2xl font-bold text-yellow-500">480</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">38%</p>
                      <Target className="w-8 h-8 text-yellow-500 ml-auto" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Baixa (0-39)</p>
                      <p className="text-2xl font-bold text-red-500">355</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">29%</p>
                      <ArrowDownRight className="w-8 h-8 text-red-500 ml-auto" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6 bg-card border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Atividade Recente</h3>
                <Link href="/admin/leads" className="text-sm text-primary hover:underline">
                  Ver todos
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { action: "Novo lead qualificado", campaign: "Google Ads - Imóveis", score: 87, time: "2 min atrás" },
                  { action: "Lead distribuído", campaign: "Meta Ads - Consultoria", score: 72, time: "5 min atrás" },
                  {
                    action: "Novo lead qualificado",
                    campaign: "Apollo.io - B2B Tech",
                    score: 91,
                    time: "12 min atrás",
                  },
                  { action: "Lead convertido", campaign: "Import Manual - Eventos", score: 78, time: "18 min atrás" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.campaign}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Score: {activity.score}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
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
