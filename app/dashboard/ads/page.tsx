import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { AdsStats } from "@/components/ads/ads-stats"
import { CampaignsList } from "@/components/ads/campaigns-list"
import { AdsPerformance } from "@/components/ads/ads-performance"
import { Plus } from "lucide-react"

export default function AdsPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gestão de Anúncios</h1>
              <p className="text-muted-foreground">Acompanhe e otimize suas campanhas publicitárias</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 gap-2">
              <Plus className="w-4 h-4" />
              Nova Campanha
            </Button>
          </div>

          <AdsStats />

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CampaignsList />
            </div>
            <div>
              <AdsPerformance />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
