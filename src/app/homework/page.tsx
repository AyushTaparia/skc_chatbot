"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function HomeworkPage() {
  const [code, setCode] = useState("")
  const [feedback, setFeedback] = useState("")

  const handleSubmit = async () => {
    // TODO: Implement API call to check homework
    // For now, we'll just provide a mock response
    setFeedback(
      "Great job! Your code looks good. Here's a tip: try using more descriptive variable names to make your code even clearer.",
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">Python Homework</h1>
        <p className="text-lg mb-4">
          Write a Python function that calculates the area of a rectangle. Use the formula: area = length * width
        </p>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your Python code here..."
          className="min-h-[200px] mb-4"
        />
        <Button onClick={handleSubmit} className="w-full bg-green-500 hover:bg-green-600 mb-4">
          Submit Homework
        </Button>
        {feedback && (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
            <p className="font-bold">Feedback</p>
            <p>{feedback}</p>
          </div>
        )}
      </div>
    </div>
  )
}

