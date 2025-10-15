"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Sparkles, CheckCircle, XCircle, Loader2 } from "lucide-react"

interface Lead {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  city?: string
  message?: string
  campaign?: string
}

interface LeadQualificationCardProps {
  lead: Lead
  onQualified?: (qualification: any) => void
}

export function LeadQualificationCard({ lead, onQualified }: LeadQualificationCardProps) {
  const [qualifying, setQualifying] = useState(false)
  const [qualification, setQualification] = useState<any>(null)

  const handleQualify = async () => {
    setQualifying(true)

    try {
      const response = await fetch("/api/leads/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      })

      const data = await response.json()

      if (data.success) {
        setQualification(data.qualification)
        onQualified?.(data.qualification)
      }
    } catch (error) {
      console.error("[v0] Qualification failed:", error)
    } finally {
      setQualifying(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-500"
    if (score >= 40) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="p-6 bg-card border-border/50">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{lead.name}</h3>
          <p className="text-sm text-muted-foreground">{lead.company || "Empresa não informada"}</p>
        </div>
        {qualification && (
          <div className="flex items-center gap-2">
            {qualification.qualified ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <p className="text-muted-foreground">
          <strong>Email:</strong> {lead.email}
        </p>
        {lead.phone && (
          <p className="text-muted-foreground">
            <strong>Telefone:</strong> {lead.phone}
          </p>
        )}
        {lead.city && (
          <p className="text-muted-foreground">
            <strong>Cidade:</strong> {lead.city}
          </p>
        )}
        {lead.campaign && (
          <p className="text-muted-foreground">
            <strong>Campanha:</strong> {lead.campaign}
          </p>
        )}
      </div>

      {qualification ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
            <Brain className={`w-8 h-8 ${getScoreColor(qualification.score)}`} />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Score de Qualificação</p>
              <p className={`text-3xl font-bold ${getScoreColor(qualification.score)}`}>{qualification.score}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{qualification.category}</p>
              <p className="text-xs text-muted-foreground">
                {qualification.qualified ? "Qualificado" : "Não qualificado"}
              </p>
            </div>
          </div>

          <div className="p-4 bg-secondary/50 rounded-lg">
            <p className="text-sm font-medium mb-2">Análise da IA:</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{qualification.motivo}</p>
          </div>

          {qualification.pontos_fortes && qualification.pontos_fortes.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2 text-green-500">Pontos Fortes:</p>
              <ul className="space-y-1">
                {qualification.pontos_fortes.map((ponto: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{ponto}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {qualification.pontos_fracos && qualification.pontos_fracos.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2 text-red-500">Pontos de Atenção:</p>
              <ul className="space-y-1">
                {qualification.pontos_fracos.map((ponto: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{ponto}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleQualify} disabled={qualifying}>
          {qualifying ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Qualificando com IA...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Qualificar com IA
            </>
          )}
        </Button>
      )}
    </Card>
  )
}
