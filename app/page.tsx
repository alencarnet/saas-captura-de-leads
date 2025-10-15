import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Brain, Target, Zap, TrendingUp, Users, MessageSquare, FileCheck } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-xl z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Fluxo LeadAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Como Funciona
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Preços
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative container mx-auto px-4 py-24 md:py-32 overflow-hidden">
        {/* Purple gradient blob */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/30 via-accent/20 to-transparent rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Qualificação automática com IA</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-[1.1]">
            Capture e qualifique <span className="text-primary">leads com IA</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto leading-relaxed">
            Plataforma inteligente que captura leads de múltiplas fontes, qualifica automaticamente com IA e distribui
            para sua equipe.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-base px-8 h-12">
                Começar Agora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base px-8 h-12 bg-transparent">
              Ver Demonstração
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Sem cartão de crédito • Setup em minutos • Cancele quando quiser
          </p>
        </div>
      </section>

      <section id="how-it-works" className="container mx-auto px-4 py-20 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Como funciona</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Do lead bruto ao cliente qualificado em 4 etapas automatizadas
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Captura</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Colete leads de Google/Meta Ads, APIs de prospecção ou upload manual de planilhas
              </p>
            </div>

            <div className="relative">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Qualificação IA</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                IA analisa cada lead e atribui score de 0-100 baseado em interesse e perfil
              </p>
            </div>

            <div className="relative">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Distribuição</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Leads qualificados são distribuídos automaticamente para clientes conforme plano
              </p>
            </div>

            <div className="relative">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. Conversão</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Notificações automáticas via WhatsApp e e-mail para ação imediata
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Recursos poderosos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para transformar leads em clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualificação com IA</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                GPT-4 analisa cada lead e atribui score automático baseado em interesse, perfil e potencial de conversão
              </p>
            </Card>

            <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Múltiplas Fontes</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Integração com Google Ads, Meta Ads, Apollo.io, Hunter.io e importação manual via CSV
              </p>
            </Card>

            <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Distribuição Automática</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Leads qualificados são distribuídos automaticamente para clientes com saldo disponível no plano
              </p>
            </Card>

            <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp Automático</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Envio automático de mensagens personalizadas via WhatsApp Cloud API para leads qualificados
              </p>
            </Card>

            <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dashboard Completo</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Métricas em tempo real de leads gerados, qualificados, distribuídos e taxa de conversão
              </p>
            </Card>

            <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contratos Digitais</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Integração com Clicksign para envio e assinatura automática de contratos quando lead converte
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="container mx-auto px-4 py-20 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Planos flexíveis</h2>
            <p className="text-lg text-muted-foreground">Escolha o plano ideal para o volume de leads do seu negócio</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card border-border/50">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$ 197</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">20 leads qualificados/mês</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Qualificação com IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Notificações WhatsApp</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Dashboard básico</span>
                </li>
              </ul>
              <Button className="w-full bg-transparent" variant="outline">
                Começar Agora
              </Button>
            </Card>

            <Card className="p-8 bg-card border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Mais Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$ 497</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">100 leads qualificados/mês</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Múltiplas campanhas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Integração APIs externas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Relatórios avançados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Suporte prioritário</span>
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90">Começar Agora</Button>
            </Card>

            <Card className="p-8 bg-card border-border/50">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Leads ilimitados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">API completa</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Webhooks personalizados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Integração CRM</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Suporte dedicado</span>
                </li>
              </ul>
              <Button className="w-full bg-transparent" variant="outline">
                Falar com Vendas
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary via-accent to-primary rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para qualificar leads com IA?</h2>
          <p className="text-xl mb-8 text-white/90">Comece a receber leads qualificados automaticamente hoje mesmo</p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-base px-8 h-12">
              Começar Gratuitamente
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border/50 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Fluxo LeadAI</span>
              </div>
              <p className="text-sm text-muted-foreground">Qualificação inteligente de leads com IA</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-foreground">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-foreground">
                    Como Funciona
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Termos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Fluxo LeadAI. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
