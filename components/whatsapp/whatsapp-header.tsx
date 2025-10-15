import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Phone, Video, MoreVertical, Star } from "lucide-react"

export function WhatsAppHeader() {
  return (
    <div className="h-16 border-b border-border px-6 flex items-center justify-between bg-card">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-to-br from-green-600 to-emerald-500 text-white">MS</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Maria Santos</h2>
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 text-xs">
              Qualificado
            </Badge>
            <span className="text-xs text-muted-foreground">Tech Solutions</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
