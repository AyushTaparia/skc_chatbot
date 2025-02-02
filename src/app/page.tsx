import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 flex flex-col items-center justify-center p-4">
      <main className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">Welcome to PythonPal!</h1>
        <div className="text-center mb-8">
          <p className="text-lg mb-4 dark:text-gray-300">
            PythonPal is your friendly AI tutor designed to help kids learn Python programming in a fun and interactive
            way. With colorful lessons, engaging challenges, and a personalized learning experience, you&apos;ll be coding
            like a pro in no time!
          </p>
          <p className="text-lg dark:text-gray-300">
            Our unique features include customizable AI tutor characters that match your interests and interactive
            homework assignments to reinforce what you&apos;ve learned. Start your coding adventure today and unlock the
            amazing world of Python!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/chat">
            <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 transform hover:scale-105">
              Start Learning!
            </Button>
          </Link>
          <Link href="/config">
            <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 transform hover:scale-105">
              Configure API Key
            </Button>
          </Link>
          <Link href="/customize">
            <Button className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 transform hover:scale-105">
              Customize Tutor
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

