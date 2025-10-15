import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, MoreVertical, Play, Pause, Target } from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default function CampaignsPage() {
  const campaigns = [
    {
      id: 1,
      name: "Google Ads - Imóveis",
      source: "google_ads",
      leads: 342,
      qualified: 287,
      active: true,
      niche: "Imobiliário",
      created: "15/01/2025",
    },
    {
      id: 2,
      name: "Meta Ads - Consultoria",
      source: "meta_ads",
      leads: 287,
      qualified: 198,
      active: true,
      niche: "Consultoria",
      created: "10/01/2025",
    },
    {
      id: 3,
      name: "Apollo.io - B2B Tech",
      source: "apollo",
      leads: 198,
      qualified: 156,
      active: true,
      niche: "Tecnologia",
      created: "05/01/2025",
    },
    {
      id: 4,
      name: "Import Manual - Eventos",
      source: "manual",
      leads: 156,
      qualified: 98,
      active: false,
      niche: "Eventos",
      created: "28/12/2024",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Campanhas</h1>
                <p className="text-muted-foreground">Gerencie suas campanhas de prospecção</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Nova Campanha
              </Button>
            </div>

            <Card className="p-6 bg-card border-border/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Buscar campanhas..." className="pl-10 bg-secondary border-border" />
                </div>
                <Button variant="outline">Filtros</Button>
              </div>

              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold">{campaign.name}</h3>
                          {campaign.active ? (
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs rounded-full">
                              Ativa
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-gray-500/10 text-gray-500 text-xs rounded-full">
                              Pausada
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Nicho: {campaign.niche}</span>
                          <span>•</span>
                          <span>Criada em {campaign.created}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{campaign.leads}</p>
                        <p className="text-xs text-muted-foreground">Leads</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{campaign.qualified}</p>
                        <p className="text-xs text-muted-foreground">Qualificados</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-accent">
                          {Math.round((campaign.qualified / campaign.leads) * 100)}%
                        </p>
                        <p className="text-xs text-muted-foreground">Taxa</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          {campaign.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
