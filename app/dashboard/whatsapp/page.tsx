import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { WhatsAppChat } from "@/components/whatsapp/whatsapp-chat"
import { WhatsAppSidebar } from "@/components/whatsapp/whatsapp-sidebar"
import { WhatsAppHeader } from "@/components/whatsapp/whatsapp-header"

export default function WhatsAppPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          <div className="h-[calc(100vh-8rem)] bg-card rounded-lg border border-border overflow-hidden flex">
            <WhatsAppSidebar />
            <div className="flex-1 flex flex-col">
              <WhatsAppHeader />
              <WhatsAppChat />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
