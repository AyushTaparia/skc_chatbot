"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ConfigPage() {
  const [apiKey, setApiKey] = useState("");
  const [isKeySet, setIsKeySet] = useState(false);
  const router = useRouter();

  // Load stored API key on mount
  useEffect(() => {
    const storedKey = localStorage.getItem("apiKey");
    if (storedKey) {
      setApiKey(storedKey);
      setIsKeySet(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem("apiKey", apiKey);
      setIsKeySet(true);
      setTimeout(() => router.push("/chat"), 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-yellow-200 to-orange-300 dark:from-gray-900 dark:to-gray-800">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>
      </div>

      {/* Glassmorphic Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6 text-orange-600 dark:text-orange-400">
          🔑 Configure API Key
        </h1>

        {/* Input Field */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="apiKey"
              className="text-lg font-semibold dark:text-gray-300"
            >
              Enter your AI service API key:
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Your API key"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setIsKeySet(false);
              }}
              required
              className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
          </div>

          {/* Button and Status Message */}
          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className={`w-full font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 ${
                isKeySet
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {isKeySet ? "✅ API Key Set!" : "Save and Start Learning"}
            </Button>
            {isKeySet && (
              <p className="text-green-600 dark:text-green-400 text-center">
                API Key successfully saved! Redirecting...
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
