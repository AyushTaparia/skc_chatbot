"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function ConfigPage() {
  const [apiKey, setApiKey] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API key storage (e.g., in localStorage or secure cookie)
    console.log("API Key set:", apiKey)
    router.push("/chat")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">Configure API Key</h1>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Enter your AI service API key:</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
            Save and Start Learning
          </Button>
        </div>
      </form>
    </div>
  )
}

