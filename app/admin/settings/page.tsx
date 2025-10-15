import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Zap, FileCheck, CheckCircle, XCircle } from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default function SettingsPage() {
  const integrations = [
    {
      name: "WhatsApp Cloud API",
      icon: MessageSquare,
      status: "connected",
      description: "Envio automático de mensagens para leads qualificados",
      envVar: "WHATSAPP_ACCESS_TOKEN",
    },
    {
      name: "Apollo.io",
      icon: Zap,
      status: "disconnected",
      description: "Prospecção ativa B2B e enriquecimento de dados",
      envVar: "APOLLO_API_KEY",
    },
    {
      name: "Clicksign",
      icon: FileCheck,
      status: "connected",
      description: "Envio e assinatura digital de contratos",
      envVar: "CLICKSIGN_API_KEY",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Configurações</h1>
              <p className="text-muted-foreground">Gerencie integrações e configurações da plataforma</p>
            </div>

            {/* Integrations */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Integrações</h2>
              <div className="space-y-4">
                {integrations.map((integration) => {
                  const Icon = integration.icon
                  return (
                    <Card key={integration.name} className="p-6 bg-card border-border/50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{integration.name}</h3>
                              {integration.status === "connected" ? (
                                <Badge className="bg-green-500/10 text-green-500">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Conectado
                                </Badge>
                              ) : (
                                <Badge className="bg-red-500/10 text-red-500">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Desconectado
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                            <div className="space-y-2">
                              <Label htmlFor={integration.envVar} className="text-xs text-muted-foreground">
                                Variável de ambiente: {integration.envVar}
                              </Label>
                              <Input
                                id={integration.envVar}
                                type="password"
                                placeholder="••••••••••••••••"
                                className="bg-secondary border-border"
                              />
                            </div>
                          </div>
                        </div>
                        <Button
                          variant={integration.status === "connected" ? "outline" : "default"}
                          className={integration.status === "connected" ? "bg-transparent" : "bg-primary"}
                        >
                          {integration.status === "connected" ? "Desconectar" : "Conectar"}
                        </Button>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* WhatsApp Template */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-4">Mensagem Automática WhatsApp</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Personalize a mensagem enviada automaticamente para leads qualificados
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="whatsapp-template">Template da Mensagem</Label>
                  <textarea
                    id="whatsapp-template"
                    rows={6}
                    className="w-full mt-2 px-3 py-2 bg-secondary border border-border rounded-lg text-sm"
                    defaultValue={`Olá {{nome}}, tudo bem?

Sou da equipe Fluxo LeadAI, e vi que você demonstrou interesse em nossos serviços.

Um especialista já recebeu seu contato e falará com você em breve.

Obrigado!`}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Use as variáveis: {"{"}
                  {"{"}nome{"}"} {"{"}
                  {"{"}empresa{"}"} {"{"}
                  {"{"}cidade{"}"}
                </p>
                <Button className="bg-primary hover:bg-primary/90">Salvar Template</Button>
              </div>
            </Card>

            {/* AI Configuration */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="text-xl font-semibold mb-4">Configuração da IA</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ai-model">Modelo de IA</Label>
                  <select
                    id="ai-model"
                    className="w-full mt-2 px-3 py-2 bg-secondary border border-border rounded-lg text-sm"
                  >
                    <option value="gpt-4o-mini">GPT-4o Mini (Recomendado)</option>
                    <option value="gpt-4o">GPT-4o (Mais preciso)</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="qualification-threshold">Score Mínimo para Qualificação</Label>
                  <Input
                    id="qualification-threshold"
                    type="number"
                    min="0"
                    max="100"
                    defaultValue="70"
                    className="mt-2 bg-secondary border-border"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leads com score igual ou superior serão marcados como qualificados
                  </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">Salvar Configurações</Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
