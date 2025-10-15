import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search } from "lucide-react"

export function ClientHeader() {
  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar leads..." className="pl-10 bg-secondary border-border" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  )
}
