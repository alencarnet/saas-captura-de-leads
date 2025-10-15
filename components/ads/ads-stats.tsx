import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, MousePointerClick, Users, Target } from "lucide-react"

const stats = [
  {
    name: "Investimento Total",
    value: "R$ 12.450",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-500/10",
  },
  {
    name: "Cliques",
    value: "8.542",
    change: "+15%",
    trend: "up",
    icon: MousePointerClick,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    name: "Leads Gerados",
    value: "342",
    change: "+22%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
  },
  {
    name: "Custo por Lead",
    value: "R$ 36,40",
    change: "-12%",
    trend: "up",
    icon: Target,
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
  },
]

export function AdsStats() {
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
            <span className="text-sm font-medium text-green-600">{stat.change}</span>
            <span className="text-sm text-muted-foreground">vs mês anterior</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
