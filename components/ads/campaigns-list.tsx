import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreVertical, Play, Pause, TrendingUp } from "lucide-react"

const campaigns = [
  {
    id: 1,
    name: "Campanha Black Friday 2025",
    platform: "Facebook Ads",
    status: "Ativa",
    budget: "R$ 5.000",
    spent: "R$ 3.245",
    clicks: 2845,
    leads: 142,
    cpl: "R$ 22,85",
    roas: "4.2x",
  },
  {
    id: 2,
    name: "Google Ads - CRM Software",
    platform: "Google Ads",
    status: "Ativa",
    budget: "R$ 3.500",
    spent: "R$ 2.890",
    clicks: 1923,
    leads: 89,
    cpl: "R$ 32,47",
    roas: "3.8x",
  },
  {
    id: 3,
    name: "Instagram - Leads Qualificados",
    platform: "Facebook Ads",
    status: "Pausada",
    budget: "R$ 2.000",
    spent: "R$ 1.450",
    clicks: 1456,
    leads: 67,
    cpl: "R$ 21,64",
    roas: "3.2x",
  },
  {
    id: 4,
    name: "LinkedIn - Empresas B2B",
    platform: "LinkedIn Ads",
    status: "Ativa",
    budget: "R$ 4.000",
    spent: "R$ 2.865",
    clicks: 892,
    leads: 44,
    cpl: "R$ 65,11",
    roas: "5.1x",
  },
]

const statusColors: Record<string, string> = {
  Ativa: "bg-green-500/10 text-green-600",
  Pausada: "bg-orange-500/10 text-orange-600",
  Encerrada: "bg-gray-500/10 text-gray-600",
}

const platformColors: Record<string, string> = {
  "Facebook Ads": "bg-blue-500/10 text-blue-600",
  "Google Ads": "bg-red-500/10 text-red-600",
  "LinkedIn Ads": "bg-cyan-500/10 text-cyan-600",
}

export function CampaignsList() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Campanhas Ativas</h2>
          <p className="text-sm text-muted-foreground">Gerencie todas as suas campanhas publicitárias</p>
        </div>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="p-4 rounded-lg border border-border hover:bg-muted/50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{campaign.name}</h3>
                  <Badge variant="secondary" className={statusColors[campaign.status]}>
                    {campaign.status}
                  </Badge>
                  <Badge variant="secondary" className={platformColors[campaign.platform]}>
                    {campaign.platform}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    Orçamento: <span className="font-medium text-foreground">{campaign.budget}</span>
                  </span>
                  <span>•</span>
                  <span>
                    Gasto: <span className="font-medium text-foreground">{campaign.spent}</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  {campaign.status === "Ativa" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-3 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Cliques</p>
                <p className="text-lg font-semibold">{campaign.clicks.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Leads</p>
                <p className="text-lg font-semibold">{campaign.leads}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">CPL</p>
                <p className="text-lg font-semibold">{campaign.cpl}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  ROAS <TrendingUp className="w-3 h-3 text-green-600" />
                </p>
                <p className="text-lg font-semibold text-green-600">{campaign.roas}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
