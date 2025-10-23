"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Mail, MessageSquare, Phone } from "lucide-react"
import { useToast } from "@/components/toast-context"

interface FollowUp {
  id: string
  lead: string
  company: string
  type: "email" | "whatsapp" | "call"
  scheduledFor: string
  status: "pending" | "completed" | "overdue"
  message: string
}

const mockFollowUps: FollowUp[] = [
  {
    id: "1",
    lead: "João Silva",
    company: "Tech Solutions LTDA",
    type: "whatsapp",
    scheduledFor: "Hoje, 14:00",
    status: "pending",
    message: "Follow-up sobre proposta enviada",
  },
  {
    id: "2",
    lead: "Maria Santos",
    company: "Inovação Digital ME",
    type: "email",
    scheduledFor: "Hoje, 16:30",
    status: "pending",
    message: "Enviar material complementar",
  },
  {
    id: "3",
    lead: "Carlos Oliveira",
    company: "Comércio XYZ",
    type: "call",
    scheduledFor: "Amanhã, 10:00",
    status: "pending",
    message: "Ligar para agendar reunião",
  },
]

const typeIcons = {
  email: Mail,
  whatsapp: MessageSquare,
  call: Phone,
}

const typeColors = {
  email: "text-blue-500",
  whatsapp: "text-green-500",
  call: "text-orange-500",
}

const statusColors = {
  pending: "secondary",
  completed: "default",
  overdue: "destructive",
}

export default function FollowUpPage() {
  const { showToast } = useToast()

  const handleComplete = (id: string) => {
    showToast("Follow-up marcado como concluído!", "success")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Follow-up</h1>
        <p className="text-muted-foreground">Gerencie seus follow-ups agendados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold mt-1">3</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Hoje</p>
              <p className="text-2xl font-bold mt-1">2</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Concluídos (semana)</p>
              <p className="text-2xl font-bold mt-1">12</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        {mockFollowUps.map((followUp) => {
          const Icon = typeIcons[followUp.type]
          const iconColor = typeColors[followUp.type]

          return (
            <Card key={followUp.id} className="p-6">
              <div className="flex items-start gap-4">
                <Checkbox onCheckedChange={() => handleComplete(followUp.id)} />

                <div className={`w-10 h-10 bg-muted rounded-lg flex items-center justify-center ${iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{followUp.lead}</h3>
                      <p className="text-sm text-muted-foreground">{followUp.company}</p>
                    </div>
                    <Badge variant={statusColors[followUp.status] as any}>{followUp.status}</Badge>
                  </div>

                  <p className="text-sm mb-3">{followUp.message}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{followUp.scheduledFor}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" onClick={() => handleComplete(followUp.id)}>
                  Concluir
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
