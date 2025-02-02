import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-200 to-green-200 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      {/* Main Container with Glassmorphism Effect */}
      <main className="max-w-3xl w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-3xl shadow-lg p-10 border border-gray-200 dark:border-gray-700">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center mb-6 text-blue-600 dark:text-blue-400 drop-shadow-lg">
          Welcome to{" "}
          <span className="text-green-500 dark:text-green-400">PythonPal!</span>
        </h1>

        {/* Description */}
        <div className="text-center mb-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <p className="mb-4">
            PythonPal is your friendly AI tutor designed to help kids learn
            Python programming in a fun and interactive way.
          </p>
          <p>
            🚀 Engage in colorful lessons, interactive challenges, and customize
            your AI tutor for a personalized experience!
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/chat">
            <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
              🚀 Start Learning!
            </Button>
          </Link>
          <Link href="/config">
            <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
              🔑 Configure API Key
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
