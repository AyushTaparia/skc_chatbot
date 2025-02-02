import type { Metadata } from "next"
import { Karla } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import type React from "react" // Import React

const karla = Karla({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PythonPal: AI Python Tutor for Kids",
  description: "Learn Python programming with a fun, interactive AI tutor!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={karla.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="absolute top-4 right-4 z-50">
            <ModeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

