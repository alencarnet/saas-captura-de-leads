"use client"

import { createContext, useContext } from "react"

interface Toast {
  id: string
  type: "success" | "error" | "info" | "loading"
  message: string
}

interface ToastContextType {
  showToast: (type: Toast["type"], message: string) => string
  hideToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

export type { Toast, ToastContextType }
