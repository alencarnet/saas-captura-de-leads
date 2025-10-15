import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Check } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        <Card className="p-8 bg-card border-border/50">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Crie sua conta</h1>
            <p className="text-muted-foreground text-sm mt-1">Comece a qualificar leads com IA</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" type="text" placeholder="João Silva" required className="bg-secondary border-border" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email profissional</Label>
              <Input
                id="email"
                type="email"
                placeholder="joao@empresa.com"
                required
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Nome da empresa</Label>
              <Input
                id="company"
                type="text"
                placeholder="Minha Empresa Ltda"
                required
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-secondary border-border"
              />
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">Começar Agora</Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Já tem uma conta? </span>
            <Link href="/login" className="text-primary hover:underline font-medium">
              Fazer login
            </Link>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Ao criar uma conta, você concorda com nossos{" "}
            <Link href="/terms" className="underline">
              Termos de Serviço
            </Link>
          </p>
        </Card>

        <div className="hidden md:block">
          <h2 className="text-2xl font-bold mb-6">O que você ganha:</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Qualificação com IA</h3>
                <p className="text-sm text-muted-foreground">GPT-4 analisa e pontua cada lead automaticamente</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Múltiplas fontes</h3>
                <p className="text-sm text-muted-foreground">Integração com Google Ads, Meta, Apollo.io e mais</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">WhatsApp automático</h3>
                <p className="text-sm text-muted-foreground">Notificações e mensagens enviadas automaticamente</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Dashboard completo</h3>
                <p className="text-sm text-muted-foreground">Métricas em tempo real e relatórios detalhados</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
