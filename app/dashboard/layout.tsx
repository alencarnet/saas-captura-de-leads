"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { ToastContainer } from "@/components/toast-notification"
import { ToastContext } from "@/components/toast-context"
import type { Toast } from "@/components/toast-context"
import { useState, useCallback } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((type: Toast["type"], message: string) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, type, message }])
    return id
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

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
