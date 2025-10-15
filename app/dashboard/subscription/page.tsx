import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Download, Calendar } from "lucide-react"

export default function SubscriptionPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Assinatura</h1>
            <p className="text-muted-foreground">Gerencie seu plano e pagamentos</p>
          </div>

          {/* Current Plan */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">Plano Professional</h2>
                  <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500">Ativo</Badge>
                </div>
                <p className="text-muted-foreground">Renovação automática em 15 de fevereiro de 2025</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">R$ 297</p>
                <p className="text-sm text-muted-foreground">por mês</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Usuários</p>
                <p className="text-2xl font-bold">3 / 5</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Contatos</p>
                <p className="text-2xl font-bold">2.4k / 10k</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Próxima cobrança</p>
                <p className="text-lg font-bold">15/02/2025</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="bg-transparent">
                Alterar Plano
              </Button>
              <Button variant="outline" className="bg-transparent text-destructive hover:bg-destructive/10">
                Cancelar Assinatura
              </Button>
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold mb-1">Método de Pagamento</h2>
                <p className="text-sm text-muted-foreground">Gerencie seus cartões de crédito</p>
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <CreditCard className="w-4 h-4" />
                Adicionar Cartão
              </Button>
            </div>

            <div className="p-4 rounded-lg border border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Visa •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expira em 12/2026</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                Padrão
              </Badge>
            </div>
          </Card>

          {/* Billing History */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold mb-1">Histórico de Pagamentos</h2>
                <p className="text-sm text-muted-foreground">Últimas transações e faturas</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { date: "15/01/2025", amount: "R$ 297,00", status: "Pago", invoice: "INV-2025-001" },
                { date: "15/12/2024", amount: "R$ 297,00", status: "Pago", invoice: "INV-2024-012" },
                { date: "15/11/2024", amount: "R$ 297,00", status: "Pago", invoice: "INV-2024-011" },
                { date: "15/10/2024", amount: "R$ 297,00", status: "Pago", invoice: "INV-2024-010" },
              ].map((payment) => (
                <div
                  key={payment.invoice}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{payment.invoice}</p>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">{payment.amount}</p>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600 text-xs">
                        {payment.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upgrade Options */}
          <Card className="p-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Upgrade para Enterprise</h2>
                <p className="text-blue-50 mb-4">
                  Usuários ilimitados, API completa e suporte prioritário por apenas R$ 697/mês
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>Contatos e usuários ilimitados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>Acesso completo à API</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>Treinamento personalizado para equipe</span>
                  </li>
                </ul>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Fazer Upgrade Agora
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
