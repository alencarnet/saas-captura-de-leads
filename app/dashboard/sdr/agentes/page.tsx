"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, MessageSquare, Mail, Phone } from "lucide-react"
import { useToast } from "@/components/toast-context"

interface Agent {
  id: string
  name: string
  description: string
  type: "chat" | "email" | "voice"
  active: boolean
  interactions: number
  successRate: number
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Agente de Qualificação",
    description: "Qualifica leads automaticamente via chat",
    type: "chat",
    active: true,
    interactions: 245,
    successRate: 87,
  },
  {
    id: "2",
    name: "Agente de Follow-up",
    description: "Envia follow-ups automáticos por email",
    type: "email",
    active: true,
    interactions: 189,
    successRate: 72,
  },
  {
    id: "3",
    name: "Agente de Voz",
    description: "Realiza ligações automáticas de qualificação",
    type: "voice",
    active: false,
    interactions: 0,
    successRate: 0,
  },
]

const typeIcons = {
  chat: MessageSquare,
  email: Mail,
  voice: Phone,
}

const typeColors = {
  chat: "text-blue-500",
  email: "text-green-500",
  voice: "text-orange-500",
}

export default function AgentesPage() {
  const { showToast } = useToast()

  const handleToggle = (id: string) => {
    showToast("Agente atualizado com sucesso!", "success")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agentes de IA</h1>
          <p className="text-muted-foreground">Configure agentes inteligentes para automatizar interações</p>
        </div>
        <Button onClick={() => showToast("Funcionalidade em desenvolvimento", "info")}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Agente
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockAgents.map((agent) => {
          const Icon = typeIcons[agent.type]
          const iconColor = typeColors[agent.type]

          return (
            <Card key={agent.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-muted rounded-lg flex items-center justify-center ${iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{agent.name}</h3>
                        <Badge variant={agent.active ? "default" : "secondary"}>
                          {agent.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{agent.description}</p>
                    </div>
                    <Switch checked={agent.active} onCheckedChange={() => handleToggle(agent.id)} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Interações</p>
                      <p className="text-xl font-bold">{agent.interactions}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Taxa de Sucesso</p>
                      <p className="text-xl font-bold">{agent.successRate}%</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline">Configurar</Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
