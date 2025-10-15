import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, DollarSign, Target, MessageSquare } from "lucide-react"

const stats = [
  {
    name: "Leads Ativos",
    value: "248",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    name: "Taxa de Conversão",
    value: "32%",
    change: "+5%",
    trend: "up",
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-500/10",
  },
  {
    name: "Vendas do Mês",
    value: "R$ 45.2k",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
  },
  {
    name: "Mensagens Enviadas",
    value: "1.2k",
    change: "-3%",
    trend: "down",
    icon: MessageSquare,
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
  },
]

export function StatsCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.name}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4">
            {stat.trend === "up" ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {stat.change}
            </span>
            <span className="text-sm text-muted-foreground">vs mês anterior</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
