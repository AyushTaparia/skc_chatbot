"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

const tutorCharacters = [
  { id: "robot", name: "Robo", description: "A friendly robot who loves to explain coding concepts." },
  { id: "cat", name: "Whiskers", description: "A curious cat who enjoys exploring Python with you." },
  { id: "astronaut", name: "Cosmo", description: "An adventurous astronaut who takes you on coding space missions." },
]

export default function CustomizePage() {
  const [selectedTutor, setSelectedTutor] = useState("robot")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save the selected tutor preference
    console.log("Selected tutor:", selectedTutor)
    router.push("/chat")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600 dark:text-indigo-400">
          Customize Your AI Tutor
        </h1>
        <RadioGroup value={selectedTutor} onValueChange={setSelectedTutor} className="space-y-4">
          {tutorCharacters.map((character) => (
            <div key={character.id} className="flex items-center space-x-2">
              <RadioGroupItem value={character.id} id={character.id} />
              <Label htmlFor={character.id} className="flex flex-col">
                <span className="text-lg font-medium">{character.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{character.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
        <Button type="submit" className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600">
          Start Learning with {tutorCharacters.find((c) => c.id === selectedTutor)?.name}
        </Button>
      </form>
    </div>
  )
}

