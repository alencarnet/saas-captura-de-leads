"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Brain, Zap, Save } from "lucide-react"
import { useToast } from "@/components/toast-context"

export default function IAPage() {
  const { showToast } = useToast()
  const [autoQualify, setAutoQualify] = useState(true)
  const [threshold, setThreshold] = useState([70])

  const handleSave = () => {
    showToast("Configurações de IA salvas com sucesso!", "success")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuração de IA</h1>
        <p className="text-muted-foreground">Configure os parâmetros de qualificação automática por IA</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Qualificação Automática</h2>
              <p className="text-sm text-muted-foreground">Configure como a IA qualifica leads</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Qualificação Automática</Label>
                <p className="text-sm text-muted-foreground">Qualificar leads automaticamente ao adicionar</p>
              </div>
              <Switch checked={autoQualify} onCheckedChange={setAutoQualify} />
            </div>

            <div className="space-y-3">
              <Label>Threshold para "Quente"</Label>
              <div className="flex items-center gap-4">
                <Slider value={threshold} onValueChange={setThreshold} max={100} step={1} className="flex-1" />
                <span className="text-sm font-semibold w-12 text-right">{threshold[0]}</span>
              </div>
              <p className="text-sm text-muted-foreground">Score mínimo para classificar como quente</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key">OpenAI API Key</Label>
              <Input id="api-key" type="password" placeholder="sk-..." />
              <p className="text-sm text-muted-foreground">Para qualificação de leads por IA</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Critérios de Qualificação</h2>
              <p className="text-sm text-muted-foreground">Defina os critérios para pontuação</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Porte da Empresa</span>
                <span className="text-sm text-muted-foreground">Peso: 30%</span>
              </div>
              <p className="text-sm text-muted-foreground">Empresas maiores recebem pontuação maior</p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Setor de Atuação</span>
                <span className="text-sm text-muted-foreground">Peso: 25%</span>
              </div>
              <p className="text-sm text-muted-foreground">Setores prioritários recebem mais pontos</p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Localização</span>
                <span className="text-sm text-muted-foreground">Peso: 20%</span>
              </div>
              <p className="text-sm text-muted-foreground">Proximidade geográfica aumenta score</p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Dados de Contato</span>
                <span className="text-sm text-muted-foreground">Peso: 25%</span>
              </div>
              <p className="text-sm text-muted-foreground">Disponibilidade de email e telefone</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}
