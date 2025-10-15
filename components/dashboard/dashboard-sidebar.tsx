"use client"

import { Button } from "@/components/ui/button"
import {
  Zap,
  LayoutDashboard,
  Users,
  MessageSquare,
  Target,
  BarChart3,
  GraduationCap,
  Settings,
  CreditCard,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads & Contatos", href: "/dashboard/leads", icon: Users },
  { name: "WhatsApp", href: "/dashboard/whatsapp", icon: MessageSquare },
  { name: "Anúncios", href: "/dashboard/ads", icon: Target },
  { name: "Relatórios", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Treinamentos", href: "/dashboard/training", icon: GraduationCap },
]

const bottomNavigation = [
  { name: "Assinatura", href: "/dashboard/subscription", icon: CreditCard },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">VendaMax</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-3", isActive && "bg-blue-500/10 text-blue-600")}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-1">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-3", isActive && "bg-blue-500/10 text-blue-600")}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
