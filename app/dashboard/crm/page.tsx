"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Plus, TrendingUp, DollarSign, Clock, GripVertical } from "lucide-react"
import { useToast } from "@/components/toast-context"

interface Lead {
  id: string
  name: string
  company: string
  value: number
  score: number
}

interface Stage {
  id: string
  title: string
  leads: Lead[]
  color: string
}

const mockStages: Stage[] = [
  {
    id: "1",
    title: "Primeiro Contato",
    color: "bg-blue-500",
    leads: [
      { id: "1", name: "Tech Solutions LTDA", company: "12.345.678/0001-90", value: 15000, score: 92 },
      { id: "2", name: "Inovação Digital ME", company: "98.765.432/0001-10", value: 8500, score: 88 },
    ],
  },
  {
    id: "2",
    title: "Em Andamento",
    color: "bg-yellow-500",
    leads: [{ id: "3", name: "Comércio XYZ", company: "11.222.333/0001-44", value: 12000, score: 65 }],
  },
  {
    id: "3",
    title: "Aguardando Pagamento",
    color: "bg-orange-500",
    leads: [{ id: "4", name: "Serviços ABC", company: "44.555.666/0001-77", value: 5000, score: 38 }],
  },
  {
    id: "4",
    title: "Cliente Ganho",
    color: "bg-green-500",
    leads: [{ id: "5", name: "Indústria 4.0 S/A", company: "22.333.444/0001-88", value: 25000, score: 85 }],
  },
  {
    id: "5",
    title: "Cliente Perdido",
    color: "bg-red-500",
    leads: [],
  },
]

export default function CRMPage() {
  const [stages, setStages] = useState(mockStages)
  const [draggedLead, setDraggedLead] = useState<{ lead: Lead; fromStageId: string } | null>(null)
  const [showNewLeadDialog, setShowNewLeadDialog] = useState(false)
  const [newLead, setNewLead] = useState({ name: "", company: "", value: "" })
  const { showToast } = useToast()

  const totalValue = stages.reduce((acc, stage) => {
    return acc + stage.leads.reduce((sum, lead) => sum + lead.value, 0)
  }, 0)

  const totalLeads = stages.reduce((acc, stage) => acc + stage.leads.length, 0)

  const handleDragStart = (lead: Lead, stageId: string) => {
    setDraggedLead({ lead, fromStageId: stageId })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (toStageId: string) => {
    if (!draggedLead) return

    const { lead, fromStageId } = draggedLead

    if (fromStageId === toStageId) {
      setDraggedLead(null)
      return
    }

    setStages((prevStages) => {
      const newStages = prevStages.map((stage) => {
        if (stage.id === fromStageId) {
          return { ...stage, leads: stage.leads.filter((l) => l.id !== lead.id) }
        }
        if (stage.id === toStageId) {
          return { ...stage, leads: [...stage.leads, lead] }
        }
        return stage
      })
      return newStages
    })

    const toStage = stages.find((s) => s.id === toStageId)
    showToast("success", `Lead movido para ${toStage?.title}!`)
    setDraggedLead(null)
  }

  const handleCreateLead = () => {
    if (!newLead.name || !newLead.company || !newLead.value) {
      showToast("error", "Preencha todos os campos!")
      return
    }

    const lead: Lead = {
      id: Date.now().toString(),
      name: newLead.name,
      company: newLead.company,
      value: Number.parseFloat(newLead.value),
      score: Math.floor(Math.random() * 100),
    }

    setStages((prevStages) => {
      const newStages = [...prevStages]
      newStages[0].leads.push(lead)
      return newStages
    })

    showToast("success", "Lead criado com sucesso!")
    setShowNewLeadDialog(false)
    setNewLead({ name: "", company: "", value: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pipeline de CRM</h1>
          <p className="text-muted-foreground">Acompanhe visualmente o progresso dos seus leads</p>
        </div>
        <Button onClick={() => setShowNewLeadDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Lead
        </Button>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Valor Total em Pipeline</p>
              <p className="text-2xl font-bold mt-1">R$ {(totalValue / 1000).toFixed(1)}k</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Leads</p>
              <p className="text-2xl font-bold mt-1">{totalLeads}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tempo Médio no Funil</p>
              <p className="text-2xl font-bold mt-1">14.5 dias</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Pipeline Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <Card
            key={stage.id}
            className="flex-shrink-0 w-80"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(stage.id)}
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{stage.title}</h3>
                <Badge variant="secondary">{stage.leads.length}</Badge>
              </div>
              <div className={`h-1 ${stage.color} rounded-full`} />
            </div>

            <div className="p-4 space-y-3 min-h-[400px]">
              {stage.leads.map((lead) => (
                <Card
                  key={lead.id}
                  draggable
                  onDragStart={() => handleDragStart(lead, stage.id)}
                  className="p-4 hover:shadow-md transition-shadow cursor-move"
                >
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{lead.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{lead.company}</p>
                          </div>
                          <Badge
                            variant={lead.score >= 70 ? "default" : lead.score >= 40 ? "secondary" : "outline"}
                            className="ml-2 flex-shrink-0"
                          >
                            {lead.score}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm font-semibold text-green-600">R$ {(lead.value / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* New Lead Dialog */}
      <Dialog open={showNewLeadDialog} onOpenChange={setShowNewLeadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Lead</DialogTitle>
            <DialogDescription>Adicione um novo lead ao pipeline</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome da Empresa</label>
              <Input
                placeholder="Ex: Tech Solutions LTDA"
                value={newLead.name}
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">CNPJ</label>
              <Input
                placeholder="Ex: 12.345.678/0001-90"
                value={newLead.company}
                onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Valor Estimado (R$)</label>
              <Input
                type="number"
                placeholder="Ex: 15000"
                value={newLead.value}
                onChange={(e) => setNewLead({ ...newLead, value: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateLead} className="flex-1">
                Criar Lead
              </Button>
              <Button variant="outline" onClick={() => setShowNewLeadDialog(false)} className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
