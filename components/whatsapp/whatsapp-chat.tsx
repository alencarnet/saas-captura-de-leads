"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Smile, Mic } from "lucide-react"
import { cn } from "@/lib/utils"

const messages = [
  {
    id: 1,
    text: "Olá! Vi que você se interessou pelo nosso produto. Como posso ajudar?",
    sender: "me",
    time: "09:30",
  },
  {
    id: 2,
    text: "Oi! Sim, estou procurando uma solução de CRM para minha empresa.",
    sender: "them",
    time: "09:32",
  },
  {
    id: 3,
    text: "Perfeito! Temos uma solução completa que integra CRM, WhatsApp e gestão de anúncios. Quantas pessoas trabalham na sua equipe de vendas?",
    sender: "me",
    time: "09:33",
  },
  {
    id: 4,
    text: "Somos 5 vendedores no time.",
    sender: "them",
    time: "09:35",
  },
  {
    id: 5,
    text: "Ótimo! Para 5 usuários, recomendo nosso plano Professional. Ele inclui todas as funcionalidades que vocês precisam. Posso enviar uma proposta personalizada?",
    sender: "me",
    time: "09:36",
  },
  {
    id: 6,
    text: "Sim, por favor! Gostaria de ver os valores e funcionalidades.",
    sender: "them",
    time: "09:38",
  },
  {
    id: 7,
    text: "Perfeito! Vou preparar uma proposta completa e envio em alguns minutos. Enquanto isso, você tem alguma dúvida específica sobre o sistema?",
    sender: "me",
    time: "09:40",
  },
  {
    id: 8,
    text: "Como funciona a integração com WhatsApp? É automática?",
    sender: "them",
    time: "10:15",
  },
  {
    id: 9,
    text: "Sim! A integração é totalmente automática. Você conecta seu WhatsApp Business e todas as conversas aparecem aqui na plataforma. Pode criar respostas automáticas, templates e até automações de follow-up.",
    sender: "me",
    time: "10:17",
  },
  {
    id: 10,
    text: "Obrigada pelas informações!",
    sender: "them",
    time: "10:30",
  },
]

export function WhatsAppChat() {
  const [message, setMessage] = useState("")

  return (
    <div className="flex-1 flex flex-col bg-muted/20">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[70%] space-y-1", msg.sender === "me" ? "items-end" : "items-start")}>
              <div
                className={cn(
                  "rounded-lg px-4 py-2",
                  msg.sender === "me"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                    : "bg-card border border-border",
                )}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              <span className="text-xs text-muted-foreground px-1">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Replies */}
      <div className="px-6 py-3 border-t border-border bg-card">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground">Respostas rápidas:</span>
          <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
            Agendar reunião
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
            Enviar proposta
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
            Solicitar informações
          </Button>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Smile className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-background"
          />
          {message ? (
            <Button
              size="icon"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
            >
              <Send className="w-5 h-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon">
              <Mic className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
