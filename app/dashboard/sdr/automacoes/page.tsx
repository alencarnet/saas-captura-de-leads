"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Zap, MessageSquare, Clock } from "lucide-react"
import { useToast } from "@/components/toast-context"

interface Automation {
  id: string
  name: string
  description: string
  trigger: string
  action: string
  active: boolean
  icon: any
  color: string
}

const mockAutomations: Automation[] = [
  {
    id: "1",
    name: "Boas-vindas Automáticas",
    description: "Envia mensagem de boas-vindas quando um novo lead é adicionado",
    trigger: "Novo lead adicionado",
    action: "Enviar WhatsApp",
    active: true,
    icon: MessageSquare,
    color: "text-green-500",
  },
  {
    id: "2",
    name: "Follow-up 24h",
    description: "Envia follow-up automático 24h após primeiro contato",
    trigger: "24h após primeiro contato",
    action: "Enviar Email",
    active: true,
    icon: Clock,
    color: "text-blue-500",
  },
  {
    id: "3",
    name: "Lead Quente",
    description: "Notifica equipe quando lead atinge score > 70",
    trigger: "Score > 70",
    action: "Notificar equipe",
    active: false,
    icon: Zap,
    color: "text-orange-500",
  },
]

export default function AutomacoesPage() {
  const { showToast } = useToast()

  const handleToggle = (id: string) => {
    showToast("Automação atualizada com sucesso!", "success")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automações</h1>
          <p className="text-muted-foreground">Configure automações para otimizar seu processo de vendas</p>
        </div>
        <Button onClick={() => showToast("Funcionalidade em desenvolvimento", "info")}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Automação
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockAutomations.map((automation) => (
          <Card key={automation.id} className="p-6">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 bg-muted rounded-lg flex items-center justify-center ${automation.color}`}>
                <automation.icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{automation.name}</h3>
                    <p className="text-sm text-muted-foreground">{automation.description}</p>
                  </div>
                  <Switch checked={automation.active} onCheckedChange={() => handleToggle(automation.id)} />
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Gatilho</Badge>
                    <span className="text-sm">{automation.trigger}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Ação</Badge>
                    <span className="text-sm">{automation.action}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
