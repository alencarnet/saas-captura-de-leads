import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageSquare, Phone, Mail, Building, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { LeadQualificationCard } from "@/components/admin/lead-qualification-card"

export default function LeadDetailPage() {
  // Mock lead data - in production this would come from database
  const lead = {
    id: 1,
    name: "Carlos Silva",
    email: "carlos@empresa.com",
    phone: "+55 11 98765-4321",
    company: "Tech Solutions Ltda",
    city: "São Paulo",
    state: "SP",
    message: "Gostaria de saber mais sobre soluções de automação para minha empresa de tecnologia.",
    campaign: "Google Ads - Imóveis",
    source: "google_ads",
    created: "2025-01-15T10:30:00",
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Link href="/admin/leads">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold mb-1">Detalhes do Lead</h1>
                <p className="text-muted-foreground">Visualize e qualifique este lead</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-4">Informações do Lead</h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{lead.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefone</p>
                        <p className="font-medium">{lead.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Building className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Empresa</p>
                        <p className="font-medium">{lead.company}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Localização</p>
                        <p className="font-medium">
                          {lead.city}, {lead.state}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Data de Captura</p>
                        <p className="font-medium">{new Date(lead.created).toLocaleString("pt-BR")}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-4">Mensagem</h2>
                  <p className="text-muted-foreground leading-relaxed">{lead.message}</p>
                </Card>

                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-4">Origem</h2>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Campanha</span>
                      <Badge className="bg-primary/10 text-primary">{lead.campaign}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Fonte</span>
                      <Badge className="bg-accent/10 text-accent">{lead.source}</Badge>
                    </div>
                  </div>
                </Card>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Enviar WhatsApp
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar
                  </Button>
                </div>
              </div>

              <div>
                <LeadQualificationCard lead={lead} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
