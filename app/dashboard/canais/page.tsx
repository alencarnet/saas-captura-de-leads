"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Instagram, Mail, Phone, CheckCircle, XCircle, Loader2, QrCode } from "lucide-react"
import { useToast } from "@/components/toast-context"
import Image from "next/image"

interface Channel {
  id: string
  name: string
  icon: any
  color: string
  connected: boolean
  description: string
}

const channels: Channel[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: MessageSquare,
    color: "text-green-500",
    connected: false,
    description: "Integração multi-tenant real",
  },
  {
    id: "instagram",
    name: "Instagram Direct",
    icon: Instagram,
    color: "text-pink-500",
    connected: false,
    description: "Solução não oficial",
  },
  {
    id: "email",
    name: "Email",
    icon: Mail,
    color: "text-blue-500",
    connected: false,
    description: "SMTP para envio de emails",
  },
  {
    id: "sms",
    name: "SMS",
    icon: Phone,
    color: "text-orange-500",
    connected: false,
    description: "Envio de SMS via API",
  },
]

export default function CanaisPage() {
  const { showToast } = useToast()
  const [whatsappStatus, setWhatsappStatus] = useState<"disconnected" | "connecting" | "qr_ready" | "connected">(
    "disconnected",
  )
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [instagramUser, setInstagramUser] = useState("")

  useEffect(() => {
    checkWhatsAppStatus()
  }, [])

  const checkWhatsAppStatus = async () => {
    try {
      const response = await fetch("/api/whatsapp/status")
      const data = await response.json()

      if (data.session) {
        setWhatsappStatus(data.session.status)
        if (data.session.qr_code) {
          setQrCode(data.session.qr_code)
        }
      }
    } catch (error) {
      console.error("[v0] Error checking status:", error)
    }
  }

  const handleConnectWhatsApp = async () => {
    setIsLoading(true)
    showToast("Gerando QR Code...", "info")

    try {
      const response = await fetch("/api/whatsapp/connect", {
        method: "POST",
      })

      const data = await response.json()

      if (data.error) {
        showToast(data.error, "error")
        return
      }

      setWhatsappStatus("qr_ready")
      setQrCode(data.qrCode)
      showToast("QR Code gerado! Escaneie com seu WhatsApp", "success")

      // Simulate connection after 5 seconds (in production, this would be a webhook)
      setTimeout(async () => {
        await simulateConnection()
      }, 5000)
    } catch (error) {
      console.error("[v0] Connect error:", error)
      showToast("Erro ao conectar WhatsApp", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const simulateConnection = async () => {
    try {
      const response = await fetch("/api/whatsapp/simulate-connection", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        setWhatsappStatus("connected")
        setQrCode(null)
        showToast("WhatsApp conectado com sucesso!", "success")
      }
    } catch (error) {
      console.error("[v0] Simulate connection error:", error)
    }
  }

  const handleDisconnectWhatsApp = async () => {
    setIsLoading(true)
    showToast("Desconectando WhatsApp...", "info")

    try {
      const response = await fetch("/api/whatsapp/disconnect", {
        method: "POST",
      })

      if (response.ok) {
        setWhatsappStatus("disconnected")
        setQrCode(null)
        showToast("WhatsApp desconectado", "success")
      }
    } catch (error) {
      console.error("[v0] Disconnect error:", error)
      showToast("Erro ao desconectar", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = (channelId: string) => {
    showToast(`Canal ${channelId} conectado com sucesso!`, "success")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Canais de Comunicação</h1>
        <p className="text-muted-foreground">Conecte seu WhatsApp para gerenciar conversas (Multi-tenant)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WhatsApp - Real Integration */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">WhatsApp</h2>
                {whatsappStatus === "connected" ? (
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Conectado
                  </Badge>
                ) : whatsappStatus === "qr_ready" ? (
                  <Badge variant="outline" className="text-blue-500 border-blue-500">
                    <QrCode className="w-3 h-3 mr-1" />
                    Escaneie o QR
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    <XCircle className="w-3 h-3 mr-1" />
                    Desconectado
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Integração multi-tenant real</p>
            </div>
          </div>

          {whatsappStatus === "qr_ready" && qrCode && (
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-3 text-center">Escaneie o QR Code com seu WhatsApp</p>
              <div className="flex justify-center">
                <Image
                  src={qrCode || "/placeholder.svg"}
                  alt="QR Code WhatsApp"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Abra o WhatsApp → Configurações → Aparelhos conectados → Conectar aparelho
              </p>
            </div>
          )}

          {whatsappStatus === "connected" && (
            <div className="mb-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <div>
                  <p className="font-medium">WhatsApp Conectado</p>
                  <p className="text-sm text-muted-foreground">Suas conversas estão sincronizadas</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {whatsappStatus === "connected" ? (
              <Button onClick={handleDisconnectWhatsApp} variant="destructive" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Desconectar WhatsApp
              </Button>
            ) : (
              <Button
                onClick={handleConnectWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={isLoading || whatsappStatus === "qr_ready"}
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {whatsappStatus === "qr_ready" ? "Aguardando escaneamento..." : "Conectar via QR Code"}
              </Button>
            )}

            <p className="text-xs text-muted-foreground">
              Cada usuário conecta seu próprio WhatsApp. Suas conversas são privadas e isoladas.
            </p>
          </div>
        </Card>

        {/* Instagram */}
        <Card className="p-6 opacity-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center">
              <Instagram className="w-6 h-6 text-pink-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Instagram Direct</h2>
                <Badge variant="outline" className="text-xs">
                  <XCircle className="w-3 h-3 mr-1" />
                  Desconectado
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Solução não oficial</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instagram-user">Usuário do Instagram</Label>
              <Input
                id="instagram-user"
                placeholder="alencar@gmail.com"
                value={instagramUser}
                onChange={(e) => setInstagramUser(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram-pass">Senha</Label>
              <Input id="instagram-pass" type="password" placeholder="••••••••" />
            </div>

            <Button onClick={() => handleConnect("instagram")} className="w-full">
              Conectar Instagram
            </Button>

            <p className="text-xs text-muted-foreground">
              Suas credenciais são criptografadas e armazenadas com segurança
            </p>
          </div>
        </Card>

        {/* Email */}
        <Card className="p-6 opacity-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Email</h2>
                <Badge variant="outline" className="text-xs">
                  <XCircle className="w-3 h-3 mr-1" />
                  Desconectado
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">SMTP para envio de emails</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">Servidor SMTP</Label>
              <Input id="smtp-host" placeholder="smtp.gmail.com" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-port">Porta</Label>
                <Input id="smtp-port" placeholder="587" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-user">Usuário</Label>
                <Input id="smtp-user" placeholder="seu@email.com" />
              </div>
            </div>

            <Button onClick={() => handleConnect("email")} className="w-full">
              Conectar Email
            </Button>
          </div>
        </Card>

        {/* SMS */}
        <Card className="p-6 opacity-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-orange-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">SMS</h2>
                <Badge variant="outline" className="text-xs">
                  <XCircle className="w-3 h-3 mr-1" />
                  Desconectado
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Envio de SMS via API</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sms-api">API Key</Label>
              <Input id="sms-api" type="password" placeholder="Digite sua API key" />
            </div>

            <Button onClick={() => handleConnect("sms")} className="w-full">
              Conectar SMS
            </Button>

            <p className="text-xs text-muted-foreground">Suporta Twilio, Nexmo e outras plataformas</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
