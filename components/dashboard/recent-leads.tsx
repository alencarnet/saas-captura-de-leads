import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreVertical, Mail, Phone } from "lucide-react"

const leads = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria@empresa.com",
    phone: "(11) 98765-4321",
    company: "Tech Solutions",
    status: "Qualificado",
    value: "R$ 15.000",
    stage: "Proposta",
    lastContact: "Há 2 horas",
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    email: "carlos@startup.com",
    phone: "(21) 97654-3210",
    company: "StartupXYZ",
    status: "Novo",
    value: "R$ 8.500",
    stage: "Contato Inicial",
    lastContact: "Há 5 horas",
  },
  {
    id: 3,
    name: "Ana Paula",
    email: "ana@comercio.com",
    phone: "(31) 96543-2109",
    company: "Comércio ABC",
    status: "Negociação",
    value: "R$ 22.000",
    stage: "Negociação",
    lastContact: "Há 1 dia",
  },
  {
    id: 4,
    name: "Roberto Lima",
    email: "roberto@industria.com",
    phone: "(41) 95432-1098",
    company: "Indústria XYZ",
    status: "Qualificado",
    value: "R$ 35.000",
    stage: "Proposta",
    lastContact: "Há 3 horas",
  },
]

const statusColors: Record<string, string> = {
  Novo: "bg-blue-500/10 text-blue-600",
  Qualificado: "bg-purple-500/10 text-purple-600",
  Negociação: "bg-orange-500/10 text-orange-600",
}

export function RecentLeads() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Leads Recentes</h2>
          <p className="text-sm text-muted-foreground">Últimas atualizações do pipeline</p>
        </div>
        <Button variant="outline" size="sm">
          Ver Todos
        </Button>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <div key={lead.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                {lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate">{lead.name}</h3>
                <Badge variant="secondary" className={statusColors[lead.status]}>
                  {lead.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {lead.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {lead.phone}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm mt-1">
                <span className="text-muted-foreground">{lead.company}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{lead.stage}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{lead.lastContact}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-semibold text-lg">{lead.value}</span>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
