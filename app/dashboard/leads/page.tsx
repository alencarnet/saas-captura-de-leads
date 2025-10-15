import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { LeadsTable } from "@/components/leads/leads-table"
import { Plus, Filter, Download } from "lucide-react"

export default function LeadsPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Leads & Contatos</h1>
              <p className="text-muted-foreground">Gerencie todos os seus leads em um só lugar</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 gap-2">
              <Plus className="w-4 h-4" />
              Novo Lead
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Input placeholder="Buscar por nome, email ou empresa..." className="max-w-md" />
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
              <Button variant="outline" className="gap-2 ml-auto bg-transparent">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>

            <LeadsTable />
          </Card>
        </main>
      </div>
    </div>
  )
}
