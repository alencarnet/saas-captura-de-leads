"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { ToastContainer } from "@/components/toast-notification"
import { useState, createContext, useContext } from "react"

interface Toast {
  id: string
  type: "success" | "error" | "info" | "loading"
  message: string
}

interface ToastContextType {
  showToast: (type: Toast["type"], message: string) => string
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (type: Toast["type"], message: string) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, type, message }])
    return id
  }

  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
        <ToastContainer toasts={toasts} onClose={hideToast} />
      </div>
    </ToastContext.Provider>
  )
}
