"use client"

import { Brain, LayoutDashboard, Target, Users, Settings, Zap, FileText, MessageSquare } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/campaigns", label: "Campanhas", icon: Target },
    { href: "/admin/leads", label: "Leads", icon: Zap },
    { href: "/admin/clients", label: "Clientes", icon: Users },
    { href: "/admin/messages", label: "Mensagens", icon: MessageSquare },
    { href: "/admin/reports", label: "Relatórios", icon: FileText },
    { href: "/admin/settings", label: "Configurações", icon: Settings },
  ]

  return (
    <aside className="w-64 border-r border-border/50 bg-card/30 flex flex-col">
      <div className="p-6 border-b border-border/50">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold">Fluxo LeadAI</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@fluxoleadai.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
