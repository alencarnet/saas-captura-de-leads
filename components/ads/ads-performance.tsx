import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const topPerformers = [
  {
    id: 1,
    name: "Anúncio - CRM Completo",
    platform: "Facebook",
    impressions: "45.2k",
    ctr: "3.8%",
    conversions: 89,
    status: "Excelente",
  },
  {
    id: 2,
    name: "Google Search - Software",
    platform: "Google",
    impressions: "32.1k",
    ctr: "4.2%",
    conversions: 67,
    status: "Excelente",
  },
  {
    id: 3,
    name: "LinkedIn - B2B Sales",
    platform: "LinkedIn",
    impressions: "18.5k",
    ctr: "2.1%",
    conversions: 44,
    status: "Bom",
  },
  {
    id: 4,
    name: "Instagram Stories",
    platform: "Instagram",
    impressions: "28.9k",
    ctr: "1.8%",
    conversions: 32,
    status: "Regular",
  },
]

const statusColors: Record<string, string> = {
  Excelente: "bg-green-500/10 text-green-600",
  Bom: "bg-blue-500/10 text-blue-600",
  Regular: "bg-orange-500/10 text-orange-600",
}

export function AdsPerformance() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Top Anúncios</h2>
        <p className="text-sm text-muted-foreground">Melhor desempenho do mês</p>
      </div>

      <div className="space-y-4">
        {topPerformers.map((ad, index) => (
          <div key={ad.id} className="p-4 rounded-lg border border-border">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm mb-1 truncate">{ad.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {ad.platform}
                  </Badge>
                  <Badge variant="secondary" className={`text-xs ${statusColors[ad.status]}`}>
                    {ad.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Impressões</span>
                <span className="font-medium">{ad.impressions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">CTR</span>
                <span className="font-medium text-green-600">{ad.ctr}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Conversões</span>
                <span className="font-medium">{ad.conversions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
