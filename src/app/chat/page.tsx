"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! I'm your PythonPal. What would you like to learn about Python today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [tutor, setTutor] = useState("robot");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    // TODO: Implement API call to AI service here
    // For now, we'll just echo the user's message
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { role: "assistant", content: `You said: ${input}` },
      ]);
    }, 1000);
  };

  const tutorCharacters = {
    robot: { name: "Robo", image: "/placeholder.svg?height=40&width=40" },
    cat: { name: "Whiskers", image: "/placeholder.svg?height=40&width=40" },
    astronaut: { name: "Cosmo", image: "/placeholder.svg?height=40&width=40" },
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            PythonPal Chat
          </h1>
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
      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar>
                  <AvatarImage
                    src={
                      message.role === "user"
                        ? "/placeholder.svg?height=40&width=40"
                        : (
                            tutorCharacters as {
                              [key: string]: { name: string; image: string };
                            }
                          )[tutor].image
                    }
                  />
                  <AvatarFallback>
                    {message.role === "user"
                      ? "U"
                      : (
                          tutorCharacters as {
                            [key: string]: { name: string; image: string };
                          }
                        )[tutor]?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-purple-500 text-white"
                      : "bg-white dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="max-w-4xl mx-auto flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            className="bg-purple-500 hover:bg-purple-600"
          >
            Send
          </Button>
        </div>
      </footer>
    </div>
  );
}
