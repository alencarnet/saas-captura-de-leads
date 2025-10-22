"use client"

import { useEffect } from "react"
import { CheckCircle2, XCircle, Info, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  id: string
  type: "success" | "error" | "info" | "loading"
  message: string
  onClose: (id: string) => void
}

export function Toast({ id, type, message, onClose }: ToastProps) {
  useEffect(() => {
    if (type !== "loading") {
      const timer = setTimeout(() => {
        onClose(id)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [id, type, onClose])

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    loading: <Loader2 className="w-5 h-5 text-primary animate-spin" />,
  }

  const bgColors = {
    success: "bg-green-500/10 border-green-500/20",
    error: "bg-red-500/10 border-red-500/20",
    info: "bg-blue-500/10 border-blue-500/20",
    loading: "bg-primary/10 border-primary/20",
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg border backdrop-blur-xl shadow-lg animate-in slide-in-from-right-full duration-300",
        bgColors[type],
      )}
    >
      {icons[type]}
      <p className="text-sm font-medium flex-1">{message}</p>
      {type !== "loading" && (
        <button onClick={() => onClose(id)} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export function ToastContainer({ toasts, onClose }: { toasts: ToastProps[]; onClose: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  )
}
