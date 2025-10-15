import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Clock, CheckCircle2, Lock, TrendingUp } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Fundamentos do CRM",
    description: "Aprenda a usar todas as funcionalidades do CRM para gerenciar seus leads",
    duration: "2h 30min",
    lessons: 12,
    progress: 100,
    status: "completed",
    category: "Básico",
  },
  {
    id: 2,
    title: "Automação de WhatsApp",
    description: "Domine as automações e templates para aumentar sua produtividade",
    duration: "1h 45min",
    lessons: 8,
    progress: 65,
    status: "in-progress",
    category: "Intermediário",
  },
  {
    id: 3,
    title: "Gestão de Campanhas Publicitárias",
    description: "Estratégias avançadas para otimizar seus anúncios e reduzir custos",
    duration: "3h 15min",
    lessons: 15,
    progress: 0,
    status: "locked",
    category: "Avançado",
  },
  {
    id: 4,
    title: "Técnicas de Vendas Consultivas",
    description: "Aprenda a vender mais usando técnicas comprovadas de vendas",
    duration: "2h 00min",
    lessons: 10,
    progress: 0,
    status: "available",
    category: "Vendas",
  },
]

const premiumCourses = [
  {
    id: 1,
    title: "Masterclass: Funil de Vendas de Alta Conversão",
    instructor: "Carlos Mendes",
    price: "R$ 497",
    rating: 4.9,
    students: 1243,
  },
  {
    id: 2,
    title: "Automação Avançada com IA",
    instructor: "Ana Silva",
    price: "R$ 697",
    rating: 4.8,
    students: 892,
  },
  {
    id: 3,
    title: "Growth Hacking para PMEs",
    instructor: "Roberto Costa",
    price: "R$ 397",
    rating: 4.7,
    students: 1567,
  },
]

const categoryColors: Record<string, string> = {
  Básico: "bg-blue-500/10 text-blue-600",
  Intermediário: "bg-purple-500/10 text-purple-600",
  Avançado: "bg-orange-500/10 text-orange-600",
  Vendas: "bg-green-500/10 text-green-600",
}

export default function TrainingPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Treinamentos</h1>
            <p className="text-muted-foreground">Aprenda a usar a plataforma e vender mais</p>
          </div>

          {/* Progress Overview */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Cursos Concluídos</p>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold">1 / 4</p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Horas de Estudo</p>
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold">4.2h</p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Certificados</p>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold">1</p>
            </Card>
          </div>

          {/* Courses List */}
          <div>
            <h2 className="text-xl font-bold mb-4">Cursos Inclusos na Assinatura</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className={categoryColors[course.category]}>
                      {course.category}
                    </Badge>
                    {course.status === "completed" && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    {course.status === "locked" && <Lock className="w-5 h-5 text-muted-foreground" />}
                  </div>

                  <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{course.description}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span>{course.lessons} aulas</span>
                  </div>

                  {course.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <Button
                    className={
                      course.status === "locked"
                        ? "w-full bg-transparent"
                        : "w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                    }
                    variant={course.status === "locked" ? "outline" : "default"}
                    disabled={course.status === "locked"}
                  >
                    {course.status === "completed" && (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Revisar Curso
                      </>
                    )}
                    {course.status === "in-progress" && (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Continuar
                      </>
                    )}
                    {course.status === "available" && (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Começar Agora
                      </>
                    )}
                    {course.status === "locked" && (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Bloqueado
                      </>
                    )}
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Premium Courses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">Cursos Premium</h2>
                <p className="text-sm text-muted-foreground">Treinamentos avançados para acelerar seus resultados</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {premiumCourses.map((course) => (
                <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg mb-4 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>

                  <h3 className="font-bold mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Por {course.instructor}</p>

                  <div className="flex items-center gap-4 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <span className="text-muted-foreground">{course.students.toLocaleString()} alunos</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{course.price}</span>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Ver Detalhes
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-2">Quer acelerar seus resultados?</h2>
              <p className="text-blue-50 mb-6">
                Adquira nossos cursos premium e tenha acesso a estratégias avançadas de vendas e marketing digital
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Ver Todos os Cursos Premium
              </Button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
