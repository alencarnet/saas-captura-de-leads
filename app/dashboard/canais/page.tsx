"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageSquare, Instagram, Mail, Phone, CheckCircle, XCircle, Loader2, QrCode, AlertCircle } from "lucide-react"
import { useToast } from "@/components/toast-context"

export default function CanaisPage() {
  const { showToast } = useToast()
  const [whatsappStatus, setWhatsappStatus] = useState<"disconnected" | "connecting" | "qr_ready" | "connected">(
    "disconnected",
  )
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<"production" | "demo">("demo")
  const [phoneNumber, setPhoneNumber] = useState("")

  useEffect(() => {
    checkWhatsAppStatus()

    let interval: NodeJS.Timeout
    if (whatsappStatus === "qr_ready") {
      interval = setInterval(checkWhatsAppStatus, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [whatsappStatus])

  const checkWhatsAppStatus = async () => {
    try {
      const response = await fetch("/api/whatsapp/status")
      const data = await response.json()

      if (data.session) {
        setWhatsappStatus(data.session.status)
        setPhoneNumber(data.session.phone_number || "")
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
      setMode(data.mode || "demo")
      showToast(
        data.mode === "demo" ? "QR Code de demonstração gerado" : "QR Code gerado! Escaneie com seu WhatsApp",
        "success",
      )

      if (data.mode === "demo") {
        setTimeout(async () => {
          await simulateConnection()
        }, 8000)
      }
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
        setPhoneNumber("")
        showToast("WhatsApp desconectado", "success")
      }
    } catch (error) {
      console.error("[v0] Disconnect error:", error)
      showToast("Erro ao desconectar", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Canais de Comunicação</h1>
        <p className="text-muted-foreground">Conecte seu WhatsApp para gerenciar conversas (Multi-tenant)</p>
      </div>

      {mode === "demo" && whatsappStatus !== "disconnected" && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Modo Demonstração:</strong> Para usar WhatsApp real, configure a variável de ambiente{" "}
            <code className="bg-muted px-1 py-0.5 rounded">WHATSAPP_API_URL</code> apontando para seu microserviço
            WhatsApp.
          </AlertDescription>
        </Alert>
      )}

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
              <p className="text-sm text-muted-foreground">
                {phoneNumber ? `Conectado: ${phoneNumber}` : "Integração multi-tenant real"}
              </p>
            </div>
          </div>

          {whatsappStatus === "qr_ready" && qrCode && (
            <div className="mb-6 p-6 bg-muted rounded-lg border-2 border-dashed">
              <p className="text-sm font-medium mb-4 text-center">Escaneie o QR Code com seu WhatsApp</p>
              <div className="flex justify-center bg-white p-4 rounded-lg">
                <img src={qrCode || "/placeholder.svg"} alt="QR Code WhatsApp" className="w-64 h-64" />
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-xs text-muted-foreground text-center">
                  <strong>Como conectar:</strong>
                </p>
                <ol className="text-xs text-muted-foreground space-y-1 pl-4">
                  <li>1. Abra o WhatsApp no seu celular</li>
                  <li>
                    2. Toque em <strong>Mais opções</strong> ou <strong>Configurações</strong>
                  </li>
                  <li>
                    3. Toque em <strong>Aparelhos conectados</strong>
                  </li>
                  <li>
                    4. Toque em <strong>Conectar um aparelho</strong>
                  </li>
                  <li>5. Aponte seu celular para esta tela para escanear o código</li>
                </ol>
              </div>
            </div>
          )}

          {whatsappStatus === "connected" && (
            <div className="mb-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <div>
                  <p className="font-medium">WhatsApp Conectado</p>
                  <p className="text-sm text-muted-foreground">
                    {phoneNumber ? `Número: ${phoneNumber}` : "Suas conversas estão sincronizadas"}
                  </p>
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
                  Em breve
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Integração em desenvolvimento</p>
            </div>
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
                  Em breve
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">SMTP para envio de emails</p>
            </div>
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
                  Em breve
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Envio de SMS via API</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
