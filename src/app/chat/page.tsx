"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your PythonPal. What would you like to learn about Python today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [tutor, setTutor] = useState("robot");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiKey = localStorage.getItem("apiKey");
      if (!apiKey) {
        alert("API key is required. Please set it.");
        return;
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages, apiKey }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from API");
      }

      const data = await response.json();

      if (data.message?.content) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.message.content.trim() },
        ]);
      } else {
        throw new Error("Invalid AI response format");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Can you try asking again?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const tutorCharacters: { [key: string]: { name: string } } = {
    robot: { name: "Robo" },
    cat: { name: "Whiskers" },
    astronaut: { name: "Cosmo" },
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      {/* Header with Back Button */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              PythonPal Chat
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Select onValueChange={setTutor} defaultValue={tutor}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose your tutor" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(tutorCharacters).map(([key, { name }]) => (
                  <SelectItem key={key} value={key}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Link href="/homework">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Homework
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-auto p-4 no-scrollbar">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-2  ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar */}
              <Avatar className="h-9 w-9 text-sm">
                <AvatarFallback>
                  {message.role === "user"
                    ? "U"
                    : tutorCharacters[tutor]?.name[0]}
                </AvatarFallback>
              </Avatar>

              {/* Message Bubble */}
              <div
                className={`px-4 py-2 rounded-xl max-w-[75%] shadow-lg text-sm ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                    : "bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-600 dark:text-white"
                }`}
              >
                {message.role === "assistant" ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}

          {/* Loader */}
          {loading && (
            <div className="flex justify-start">
              <div className="p-2 rounded-xl bg-white dark:bg-gray-700 dark:text-white flex items-center shadow-md">
                <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
                <span className="ml-2 text-sm">Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Chat Input */}
      <footer className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question here..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 dark:text-white border-none rounded-xl px-3 py-6"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 rounded-xl px-6"
            disabled={loading}
          >
            Send
          </Button>
        </div>
      </footer>
    </div>
  );
}
