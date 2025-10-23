"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Building2, Bell, Shield, Palette, Save } from "lucide-react"
import { useToast } from "@/components/toast-context"

export default function SettingsPage() {
  const { showToast } = useToast()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const handleSave = () => {
    showToast("Configurações salvas com sucesso!", "success")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Informações da Empresa */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Informações da Empresa</h2>
              <p className="text-sm text-muted-foreground">Atualize os dados da sua empresa</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nome da Empresa</Label>
              <Input id="company-name" defaultValue="Tech Solutions LTDA" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-sector">Setor</Label>
              <Input id="company-sector" defaultValue="Tecnologia" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-phone">Telefone</Label>
              <Input id="company-phone" defaultValue="+55 11 99999-9999" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-email">E-mail</Label>
              <Input id="company-email" type="email" defaultValue="alencar@gmail.com" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="company-address">Endereço</Label>
              <Textarea id="company-address" defaultValue="Rua Exemplo, 123 - São Paulo, SP" />
            </div>
          </div>
        </Card>

        {/* Notificações */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Notificações</h2>
              <p className="text-sm text-muted-foreground">Configure como deseja receber notificações</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Novas Mensagens</p>
                <p className="text-sm text-muted-foreground">Receba notificações de novas mensagens</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Novos Leads</p>
                <p className="text-sm text-muted-foreground">Notificação quando um novo lead é adicionado</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mudanças no Pipeline</p>
                <p className="text-sm text-muted-foreground">Quando um lead mudar de estágio</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Relatórios Semanais</p>
                <p className="text-sm text-muted-foreground">Receba resumo semanal por e-mail</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Integrações */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Integrações</h2>
              <p className="text-sm text-muted-foreground">Configure as integrações com APIs externas</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-token">WhatsApp Cloud Token</Label>
              <Input id="whatsapp-token" type="password" placeholder="••••••••" />
              <p className="text-xs text-muted-foreground">
                Obtenha em{" "}
                <a href="https://whapi.cloud" className="text-primary hover:underline">
                  whapi.cloud
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <Input id="openai-key" type="password" placeholder="sk-..." />
              <p className="text-xs text-muted-foreground">Para qualificação de leads por IA</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj-api">API de CNPJ</Label>
              <Input id="cnpj-api" type="password" placeholder="Digite sua API key" />
              <p className="text-xs text-muted-foreground">Para busca de dados de empresas</p>
            </div>
          </div>
        </Card>

        {/* Aparência */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Aparência</h2>
              <p className="text-sm text-muted-foreground">Personalize a aparência do sistema</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Modo Escuro</p>
                <p className="text-sm text-muted-foreground">Ativar tema escuro</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
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
