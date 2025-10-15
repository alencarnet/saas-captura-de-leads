import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Play, Clock, Users, Star, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    id: 1,
    title: "Masterclass: Funil de Vendas de Alta Conversão",
    description: "Aprenda a criar funis de vendas que convertem até 5x mais usando estratégias comprovadas",
    instructor: "Carlos Mendes",
    price: "R$ 497",
    rating: 4.9,
    students: 1243,
    duration: "8h 30min",
    lessons: 42,
    level: "Avançado",
  },
  {
    id: 2,
    title: "Automação Avançada com IA",
    description: "Domine ferramentas de IA para automatizar processos e aumentar produtividade em 300%",
    instructor: "Ana Silva",
    price: "R$ 697",
    rating: 4.8,
    students: 892,
    duration: "6h 15min",
    lessons: 35,
    level: "Avançado",
  },
  {
    id: 3,
    title: "Growth Hacking para PMEs",
    description: "Estratégias de crescimento acelerado para pequenas e médias empresas",
    instructor: "Roberto Costa",
    price: "R$ 397",
    rating: 4.7,
    students: 1567,
    duration: "5h 45min",
    lessons: 28,
    level: "Intermediário",
  },
  {
    id: 4,
    title: "WhatsApp Marketing Avançado",
    description: "Técnicas profissionais para vender mais usando WhatsApp Business",
    instructor: "Juliana Santos",
    price: "R$ 297",
    rating: 4.9,
    students: 2134,
    duration: "4h 20min",
    lessons: 22,
    level: "Intermediário",
  },
  {
    id: 5,
    title: "Facebook e Instagram Ads Mastery",
    description: "Do básico ao avançado em anúncios no Facebook e Instagram",
    instructor: "Pedro Oliveira",
    price: "R$ 597",
    rating: 4.8,
    students: 1876,
    duration: "7h 10min",
    lessons: 38,
    level: "Todos os níveis",
  },
  {
    id: 6,
    title: "Vendas Consultivas B2B",
    description: "Técnicas de vendas para fechar contratos de alto valor",
    instructor: "Mariana Lima",
    price: "R$ 447",
    rating: 4.9,
    students: 1092,
    duration: "5h 30min",
    lessons: 26,
    level: "Avançado",
  },
]

export default function TrainingLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">VendaMax</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
              >
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-500/10 text-blue-600 border-blue-600/20">Treinamentos Premium</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Aprenda com os Melhores e{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Multiplique suas Vendas
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
            Cursos práticos e estratégias comprovadas para transformar sua equipe de vendas em máquina de resultados
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow flex flex-col">
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg mb-4 flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>

              <Badge variant="secondary" className="w-fit mb-3 bg-blue-500/10 text-blue-600">
                {course.level}
              </Badge>

              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{course.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()} alunos</span>
                  <span className="mx-2">•</span>
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium text-foreground">{course.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                  <span className="mx-2">•</span>
                  <span>{course.lessons} aulas</span>
                </div>
                <p className="text-sm text-muted-foreground">Por {course.instructor}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-2xl font-bold">{course.price}</span>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                >
                  Comprar Agora
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">O que você ganha com nossos treinamentos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Certificado de conclusão reconhecido",
              "Acesso vitalício ao conteúdo",
              "Atualizações gratuitas",
              "Suporte direto com instrutores",
              "Materiais complementares",
              "Comunidade exclusiva de alunos",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 VendaMax. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}
