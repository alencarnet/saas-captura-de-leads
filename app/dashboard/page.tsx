"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, MessageSquare, Target, ArrowUp, ArrowDown, Clock, DollarSign } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total de Leads",
      value: "1,284",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Leads Quentes",
      value: "342",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Conversas Ativas",
      value: "89",
      change: "+23.1%",
      trend: "up",
      icon: MessageSquare,
      color: "text-purple-500",
    },
    {
      title: "Taxa de Conversão",
      value: "24.8%",
      change: "-2.4%",
      trend: "down",
      icon: Target,
      color: "text-orange-500",
    },
  ]

  const recentLeads = [
    {
      id: 1,
      company: "Tech Solutions LTDA",
      cnpj: "12.345.678/0001-90",
      score: 92,
      status: "Quente",
      time: "2 min",
    },
    {
      id: 2,
      company: "Inovação Digital ME",
      cnpj: "98.765.432/0001-10",
      score: 88,
      status: "Em Andamento",
      time: "5 min",
    },
    {
      id: 3,
      company: "Comércio XYZ",
      cnpj: "11.222.333/0001-44",
      score: 65,
      status: "Morno",
      time: "12 min",
    },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das suas métricas e atividades em tempo real</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-${stat.color}/10 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
              >
                {stat.trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span className="font-medium">{stat.change}</span>
              </div>
            </div>
            <h3 className="text-sm text-muted-foreground mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Leads Recentes</h2>
            <Button variant="ghost" size="sm">
              Ver Todos
            </Button>
          </div>
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{lead.company}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{lead.cnpj}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{lead.score}</div>
                    <div className="text-xs text-muted-foreground">score</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{lead.status}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lead.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Conversas Recentes */}
        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Conversas Recentes</h2>
            <Button variant="ghost" size="sm">
              Ver Todas
            </Button>
          </div>
          <div className="space-y-4">
            {[
              { company: "Tech Solutions", message: "Olá, gostaria de saber mais sobre...", time: "2 min" },
              { company: "Inovação Digital", message: "Qual o prazo de entrega?", time: "5 min" },
              { company: "Comércio XYZ", message: "Podemos agendar uma reunião?", time: "12 min" },
            ].map((conv, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {conv.company[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{conv.company}</h3>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conv.message}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pipeline Overview */}
      <Card className="p-6 bg-card border-border/50">
        <h2 className="text-xl font-semibold mb-6">Pipeline de CRM</h2>
        <div className="grid grid-cols-5 gap-4">
          {[
            { stage: "Primeiro Contato", count: 45, value: "R$ 125k", color: "bg-blue-500" },
            { stage: "Em Andamento", count: 32, value: "R$ 98k", color: "bg-purple-500" },
            { stage: "Aguardando Pagamento", count: 18, value: "R$ 156k", color: "bg-yellow-500" },
            { stage: "Cliente Ganho", count: 12, value: "R$ 87k", color: "bg-green-500" },
            { stage: "Cliente Perdido", count: 8, value: "R$ 41k", color: "bg-red-500" },
          ].map((stage) => (
            <div key={stage.stage} className="text-center">
              <div className={`${stage.color} h-2 rounded-full mb-3`} />
              <div className="text-3xl font-bold mb-1">{stage.count}</div>
              <div className="text-sm text-muted-foreground mb-2">{stage.stage}</div>
              <div className="text-sm font-medium text-primary">{stage.value}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
              <p className="text-2xl font-bold">24.8%</p>
              <p className="text-xs text-green-500">+3.2% vs mês anterior</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tempo Médio no Funil</p>
              <p className="text-2xl font-bold">14.5 dias</p>
              <p className="text-xs text-red-500">-2.3 dias vs mês anterior</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor Total em Pipeline</p>
              <p className="text-2xl font-bold">R$ 487.2k</p>
              <p className="text-xs text-green-500">+18.7% vs mês anterior</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
