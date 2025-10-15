import { Card } from "@/components/ui/card"
import { MessageSquare, Phone, Mail, FileText, UserPlus } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "message",
    icon: MessageSquare,
    color: "text-green-600",
    bgColor: "bg-green-500/10",
    title: "Mensagem enviada",
    description: "WhatsApp para Maria Santos",
    time: "Há 15 min",
  },
  {
    id: 2,
    type: "call",
    icon: Phone,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
    title: "Ligação realizada",
    description: "Carlos Oliveira - 12 min",
    time: "Há 1 hora",
  },
  {
    id: 3,
    type: "email",
    icon: Mail,
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
    title: "Email enviado",
    description: "Proposta para Ana Paula",
    time: "Há 2 horas",
  },
  {
    id: 4,
    type: "proposal",
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
    title: "Proposta criada",
    description: "Roberto Lima - R$ 35k",
    time: "Há 3 horas",
  },
  {
    id: 5,
    type: "lead",
    icon: UserPlus,
    color: "text-cyan-600",
    bgColor: "bg-cyan-500/10",
    title: "Novo lead",
    description: "Facebook Ads - Tech Corp",
    time: "Há 4 horas",
  },
]

export function ActivityFeed() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Atividades Recentes</h2>
        <p className="text-sm text-muted-foreground">Últimas ações da equipe</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className={`w-10 h-10 ${activity.bgColor} rounded-lg flex items-center justify-center shrink-0`}>
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
