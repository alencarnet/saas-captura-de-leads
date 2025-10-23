"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, TrendingUp, Users, DollarSign } from "lucide-react"
import { useToast } from "@/components/toast-context"

interface Funnel {
  id: string
  name: string
  description: string
  leads: number
  conversionRate: number
  revenue: number
  stages: { name: string; count: number }[]
}

const mockFunnels: Funnel[] = [
  {
    id: "1",
    name: "Funil Principal",
    description: "Funil de vendas padrão para novos leads",
    leads: 156,
    conversionRate: 24.8,
    revenue: 487200,
    stages: [
      { name: "Primeiro Contato", count: 45 },
      { name: "Em Andamento", count: 32 },
      { name: "Aguardando Pagamento", count: 18 },
      { name: "Cliente Ganho", count: 12 },
    ],
  },
  {
    id: "2",
    name: "Funil Enterprise",
    description: "Funil especializado para grandes empresas",
    leads: 42,
    conversionRate: 35.7,
    revenue: 892000,
    stages: [
      { name: "Qualificação", count: 15 },
      { name: "Proposta", count: 12 },
      { name: "Negociação", count: 8 },
      { name: "Fechamento", count: 7 },
    ],
  },
]

export default function FunisPage() {
  const { showToast } = useToast()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Funis de Vendas</h1>
          <p className="text-muted-foreground">Gerencie e otimize seus funis de conversão</p>
        </div>
        <Button onClick={() => showToast("Funcionalidade em desenvolvimento", "info")}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Funil
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockFunnels.map((funnel) => (
          <Card key={funnel.id} className="p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{funnel.name}</h3>
                  <p className="text-sm text-muted-foreground">{funnel.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Total de Leads</span>
                  </div>
                  <p className="text-2xl font-bold">{funnel.leads}</p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Taxa de Conversão</span>
                  </div>
                  <p className="text-2xl font-bold">{funnel.conversionRate}%</p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-muted-foreground">Receita Gerada</span>
                  </div>
                  <p className="text-2xl font-bold">R$ {(funnel.revenue / 1000).toFixed(0)}k</p>
                </div>
              </div>

              {/* Estágios */}
              <div>
                <h4 className="font-semibold mb-4">Distribuição por Estágio</h4>
                <div className="space-y-3">
                  {funnel.stages.map((stage, index) => {
                    const percentage = (stage.count / funnel.leads) * 100

                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{stage.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{stage.count} leads</Badge>
                            <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</span>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
