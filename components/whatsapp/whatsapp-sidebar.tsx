"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const conversations = [
  {
    id: 1,
    name: "Maria Santos",
    company: "Tech Solutions",
    lastMessage: "Obrigada pelas informações!",
    time: "10:30",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    company: "StartupXYZ",
    lastMessage: "Quando podemos agendar uma call?",
    time: "09:15",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Ana Paula",
    company: "Comércio ABC",
    lastMessage: "Recebi a proposta, vou analisar",
    time: "Ontem",
    unread: 1,
    online: true,
  },
  {
    id: 4,
    name: "Roberto Lima",
    company: "Indústria XYZ",
    lastMessage: "Perfeito! Vamos fechar então",
    time: "Ontem",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Juliana Costa",
    company: "Serviços Pro",
    lastMessage: "Bom dia! Gostaria de mais detalhes",
    time: "15/01",
    unread: 3,
    online: true,
  },
]

export function WhatsAppSidebar() {
  const [selectedId, setSelectedId] = useState(1)

  return (
    <div className="w-80 border-r border-border flex flex-col bg-card">
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Conversas</h2>
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar conversas..." className="pl-10 bg-background" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            Todas
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            Não lidas
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => setSelectedId(conversation.id)}
            className={cn(
              "w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors border-b border-border text-left",
              selectedId === conversation.id && "bg-muted",
            )}
          >
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-br from-green-600 to-emerald-500 text-white">
                  {conversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {conversation.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="font-semibold text-sm truncate">{conversation.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{conversation.company}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 ml-2">{conversation.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                {conversation.unread > 0 && (
                  <Badge className="ml-2 bg-green-600 hover:bg-green-700 h-5 min-w-5 px-1.5 text-xs">
                    {conversation.unread}
                  </Badge>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
