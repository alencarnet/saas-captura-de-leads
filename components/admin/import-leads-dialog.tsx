"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"

export function ImportLeadsDialog() {
  const [file, setFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; imported: number } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResult(null)
    }
  }

  const handleImport = async () => {
    if (!file) return

    setImporting(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/leads/import", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setResult({ success: true, imported: data.imported })
      } else {
        setResult({ success: false, imported: 0 })
      }
    } catch (error) {
      console.error("[v0] Import failed:", error)
      setResult({ success: false, imported: 0 })
    } finally {
      setImporting(false)
    }
  }

  return (
    <Card className="p-6 bg-card border-border/50 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Importar Leads via CSV</h2>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground mb-4">Arraste um arquivo CSV ou clique para selecionar</p>
          <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" id="csv-upload" />
          <label htmlFor="csv-upload">
            <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
              <span>Selecionar Arquivo</span>
            </Button>
          </label>
        </div>

        {file && (
          <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
            <FileText className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        )}

        {result && (
          <div
            className={`flex items-center gap-3 p-4 rounded-lg ${
              result.success ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            }`}
          >
            {result.success ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <p>
                  <strong>{result.imported}</strong> leads importados com sucesso!
                </p>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5" />
                <p>Erro ao importar leads. Verifique o formato do arquivo.</p>
              </>
            )}
          </div>
        )}

        <div className="bg-secondary/50 p-4 rounded-lg">
          <p className="text-sm font-medium mb-2">Formato esperado do CSV:</p>
          <code className="text-xs text-muted-foreground block">name,email,phone,company,city,state,message</code>
          <p className="text-xs text-muted-foreground mt-2">
            Certifique-se de que a primeira linha contém os cabeçalhos
          </p>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleImport} disabled={!file || importing}>
          {importing ? "Importando..." : "Importar Leads"}
        </Button>
      </div>
    </Card>
  )
}
