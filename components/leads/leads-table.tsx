import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreVertical, Mail, Phone, MessageSquare } from "lucide-react"

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
    source: "Google Ads",
    createdAt: "15/01/2025",
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
    source: "Facebook Ads",
    createdAt: "14/01/2025",
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
    source: "Indicação",
    createdAt: "13/01/2025",
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
    source: "Website",
    createdAt: "12/01/2025",
  },
  {
    id: 5,
    name: "Juliana Costa",
    email: "juliana@servicos.com",
    phone: "(51) 94321-0987",
    company: "Serviços Pro",
    status: "Novo",
    value: "R$ 12.000",
    stage: "Novo Lead",
    source: "WhatsApp",
    createdAt: "11/01/2025",
  },
]

const statusColors: Record<string, string> = {
  Novo: "bg-blue-500/10 text-blue-600",
  Qualificado: "bg-purple-500/10 text-purple-600",
  Negociação: "bg-orange-500/10 text-orange-600",
}

export function LeadsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Lead</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Contato</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Etapa</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Valor</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Origem</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Data</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Ações</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-border hover:bg-muted/50">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-sm">
                      {lead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="space-y-1">
                  <p className="text-sm flex items-center gap-1">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    {lead.email}
                  </p>
                  <p className="text-sm flex items-center gap-1">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    {lead.phone}
                  </p>
                </div>
              </td>
              <td className="py-4 px-4">
                <Badge variant="secondary" className={statusColors[lead.status]}>
                  {lead.status}
                </Badge>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm">{lead.stage}</span>
              </td>
              <td className="py-4 px-4">
                <span className="font-semibold">{lead.value}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-muted-foreground">{lead.source}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-muted-foreground">{lead.createdAt}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
