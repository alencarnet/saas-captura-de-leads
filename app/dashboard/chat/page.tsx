"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Search, Phone, Video, MoreVertical, MessageSquare, Mail, Instagram, Loader2 } from "lucide-react"
import { useToast } from "@/components/toast-context"

interface Contact {
  id: string
  contact_id: string
  name: string
  phone_number: string
  last_message_at: string
  unread_count: number
}

interface Message {
  id: string
  message_id: string
  body: string
  timestamp: number
  is_from_me: boolean
}

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [message, setMessage] = useState("")
  const [contacts, setContacts] = useState<Contact[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
    if (selectedContact) {
      loadMessages(selectedContact.contact_id)
    }
  }, [selectedContact])

  const loadContacts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/whatsapp/contacts")
      const data = await response.json()

      if (data.contacts) {
        setContacts(data.contacts)
      }
    } catch (error) {
      console.error("[v0] Error loading contacts:", error)
      showToast("Erro ao carregar contatos", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const loadMessages = async (chatId: string) => {
    try {
      const response = await fetch(`/api/whatsapp/messages?chatId=${chatId}`)
      const data = await response.json()

      if (data.messages) {
        setMessages(data.messages)
      }
    } catch (error) {
      console.error("[v0] Error loading messages:", error)
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedContact) return

    setIsSending(true)
    try {
      const response = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: selectedContact.contact_id,
          message: message.trim(),
        }),
      })

      const data = await response.json()

      if (data.success) {
        showToast("Mensagem enviada!", "success")
        setMessage("")
        // Reload messages to show the new one
        await loadMessages(selectedContact.contact_id)
      } else {
        showToast(data.error || "Erro ao enviar mensagem", "error")
      }
    } catch (error) {
      console.error("[v0] Send error:", error)
      showToast("Erro ao enviar mensagem", "error")
    } finally {
      setIsSending(false)
    }
  }

  const getChannelIcon = (channel = "whatsapp") => {
    return (
      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
        <MessageSquare className="w-3 h-3 text-white" />
      </div>
    )
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)

    if (minutes < 60) return `${minutes} min`
    if (hours < 24) return `${hours}h`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Chat</h1>
        <p className="text-muted-foreground">Suas conversas reais do WhatsApp</p>
      </div>

      <Tabs value="whatsapp" className="w-full">
        <TabsList className="grid w-full grid-cols-5 max-w-2xl">
          <TabsTrigger value="all" className="gap-2" disabled>
            <MessageSquare className="w-4 h-4" />
            Todos
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <MessageSquare className="w-2.5 h-2.5 text-white" />
            </div>
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="instagram" className="gap-2" disabled>
            <Instagram className="w-4 h-4" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2" disabled>
            <Mail className="w-4 h-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="sms" className="gap-2" disabled>
            <MessageSquare className="w-4 h-4" />
            SMS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp" className="mt-6">
          <div className="flex h-[calc(100vh-16rem)] gap-4">
            {/* Lista de Conversas */}
            <Card className="w-80 flex flex-col">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Buscar conversas..." className="pl-9" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <p className="text-sm">Nenhuma conversa encontrada</p>
                    <p className="text-xs mt-2">Conecte seu WhatsApp em Canais</p>
                  </div>
                ) : (
                  contacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className={`w-full p-4 border-b hover:bg-muted/50 transition-colors text-left ${
                        selectedContact?.id === contact.id ? "bg-muted" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold">{contact.name[0]}</span>
                          </Avatar>
                          <div className="absolute -top-1 -right-1">{getChannelIcon()}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm truncate">{contact.name}</p>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(new Date(contact.last_message_at).getTime())}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{contact.phone_number}</p>
                        </div>
                        {contact.unread_count > 0 && (
                          <Badge variant="default" className="ml-2">
                            {contact.unread_count}
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </Card>

            {/* Área de Chat */}
            <Card className="flex-1 flex flex-col">
              {selectedContact ? (
                <>
                  {/* Header do Chat */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold">{selectedContact.name[0]}</span>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1">{getChannelIcon()}</div>
                      </div>
                      <div>
                        <p className="font-semibold">{selectedContact.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedContact.phone_number}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" disabled>
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled>
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled>
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Mensagens */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.is_from_me ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`rounded-lg p-3 max-w-[70%] ${
                              msg.is_from_me ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{msg.body}</p>
                            <span
                              className={`text-xs mt-1 block ${msg.is_from_me ? "opacity-70" : "text-muted-foreground"}`}
                            >
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Input de Mensagem */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Digite sua mensagem..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && !isSending && handleSendMessage()}
                        disabled={isSending}
                      />
                      <Button onClick={handleSendMessage} disabled={isSending || !message.trim()}>
                        {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Selecione uma conversa para começar</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
