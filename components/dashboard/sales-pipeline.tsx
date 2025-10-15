import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const pipelineStages = [
  { name: "Novo Lead", count: 45, value: "R$ 125k", color: "bg-gray-500" },
  { name: "Contato Inicial", count: 32, value: "R$ 89k", color: "bg-blue-500" },
  { name: "Qualificado", count: 18, value: "R$ 67k", color: "bg-purple-500" },
  { name: "Proposta", count: 12, value: "R$ 45k", color: "bg-orange-500" },
  { name: "Negociação", count: 8, value: "R$ 32k", color: "bg-yellow-500" },
  { name: "Fechado", count: 5, value: "R$ 18k", color: "bg-green-500" },
]

export function SalesPipeline() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Pipeline de Vendas</h2>
          <p className="text-sm text-muted-foreground">Visão geral do funil comercial</p>
        </div>
        <Badge variant="outline">120 leads ativos</Badge>
      </div>

      <div className="space-y-4">
        {pipelineStages.map((stage, index) => {
          const percentage = (stage.count / 45) * 100
          return (
            <div key={stage.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                  <span className="font-medium">{stage.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">{stage.count} leads</span>
                  <span className="font-semibold">{stage.value}</span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${stage.color} transition-all`} style={{ width: `${percentage}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
