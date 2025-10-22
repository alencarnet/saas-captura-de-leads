"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Workflow,
  Settings,
  Bot,
  Zap,
  Mail,
  GitBranch,
  Filter,
  ChevronDown,
  Brain,
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Leads",
    icon: Users,
    href: "/dashboard/leads",
  },
  {
    title: "Chat",
    icon: MessageSquare,
    href: "/dashboard/chat",
  },
  {
    title: "CRM",
    icon: Workflow,
    href: "/dashboard/crm",
  },
  {
    title: "SDR",
    icon: Bot,
    href: "/dashboard/sdr",
    submenu: [
      { title: "IA", icon: Brain, href: "/dashboard/sdr/ia" },
      { title: "Automações", icon: Zap, href: "/dashboard/sdr/automacoes" },
      { title: "Follow-up", icon: Mail, href: "/dashboard/sdr/followup" },
      { title: "Agentes", icon: Bot, href: "/dashboard/sdr/agentes" },
      { title: "Funis", icon: Filter, href: "/dashboard/sdr/funis" },
    ],
  },
  {
    title: "Canais",
    icon: GitBranch,
    href: "/dashboard/canais",
  },
  {
    title: "Configurações",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedMenu, setExpandedMenu] = useState<string | null>("SDR")

  const toggleSubmenu = (title: string) => {
    setExpandedMenu(expandedMenu === title ? null : title)
  }

  return (
    <aside className="w-64 bg-card border-r border-border/50 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">SaaSCapture</h1>
            <p className="text-xs text-muted-foreground">Gestão Inteligente de Leads</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const hasSubmenu = item.submenu && item.submenu.length > 0
            const isExpanded = expandedMenu === item.title

            return (
              <li key={item.title}>
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={cn(
                        "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
                    </button>
                    {isExpanded && (
                      <ul className="mt-1 ml-4 space-y-1 border-l-2 border-border/50 pl-4">
                        {item.submenu.map((subitem) => {
                          const isSubActive = pathname === subitem.href
                          return (
                            <li key={subitem.title}>
                              <Link
                                href={subitem.href}
                                className={cn(
                                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm",
                                  isSubActive
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                )}
                              >
                                <subitem.icon className="w-4 h-4" />
                                <span>{subitem.title}</span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-lg">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-white">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Usuário</p>
            <p className="text-xs text-muted-foreground truncate">user@email.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
