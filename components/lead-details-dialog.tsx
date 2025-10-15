"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Building2, MapPin, Phone, Mail, Calendar, Users, FileText, MessageSquare, Send } from "lucide-react"

interface Lead {
  id: number
  cnpj: string
  razao_social: string
  nome_fantasia?: string
  nome_socio: string
  telefone: string
  email: string
  cidade: string
  uf?: string
  fonte: string
  status: string
  data_coleta: string
  socios?: any[]
}

interface LeadDetailsDialogProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onContact: (method: "whatsapp" | "email" | "ai") => void
}

export function LeadDetailsDialog({ lead, open, onOpenChange, onContact }: LeadDetailsDialogProps) {
  if (!lead) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Detalhes do Lead
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold">{lead.razao_social}</h3>
                {lead.nome_fantasia && <p className="text-sm text-muted-foreground">{lead.nome_fantasia}</p>}
              </div>
              <Badge variant={lead.status === "qualificado" ? "default" : "secondary"}>
                {lead.status === "novo" ? "Novo" : lead.status === "qualificado" ? "Qualificado" : "Descartado"}
              </Badge>
            </div>
            <p className="text-sm font-mono text-muted-foreground">CNPJ: {lead.cnpj}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Sócio Principal</p>
                  <p className="text-sm font-medium">{lead.nome_socio}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Telefone</p>
                  <p className="text-sm font-medium">{lead.telefone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium break-all">{lead.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Localização</p>
                  <p className="text-sm font-medium">
                    {lead.cidade}
                    {lead.uf && ` - ${lead.uf}`}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Fonte</p>
                  <p className="text-sm font-medium">{lead.fonte}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Data de Coleta</p>
                  <p className="text-sm font-medium">{new Date(lead.data_coleta).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">Entrar em Contato</h4>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent"
                onClick={() => onContact("whatsapp")}
              >
                <MessageSquare className="w-5 h-5 text-green-500" />
                <span className="text-xs">WhatsApp</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent"
                onClick={() => onContact("email")}
              >
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="text-xs">Email</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent"
                onClick={() => onContact("ai")}
              >
                <Send className="w-5 h-5 text-purple-500" />
                <span className="text-xs">IA Automática</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
