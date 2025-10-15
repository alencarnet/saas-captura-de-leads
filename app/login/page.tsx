"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (email === "admin" && password === "admin") {
      // Store auth in localStorage
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userRole", "admin")
      router.push("/dashboard")
    } else {
      setError("Credenciais inválidas. Use admin/admin")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 bg-card border-border/50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
          <p className="text-muted-foreground text-sm mt-1">Entre na sua conta Fluxo LeadAI</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email ou Usuário</Label>
            <Input
              id="email"
              type="text"
              placeholder="admin"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Esqueceu?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="admin"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Entrar
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Não tem uma conta? </span>
          <Link href="/signup" className="text-primary hover:underline font-medium">
            Criar conta grátis
          </Link>
        </div>

        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg text-center">
          <p className="text-xs text-muted-foreground">Demo: admin / admin</p>
        </div>
      </Card>
    </div>
  )
}
