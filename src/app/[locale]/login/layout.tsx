import { ThemeProvider } from "@/components/ThemeProvider"
import '@/globals.css'
import { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-500 dark:bg-[#0f172a] transition-colors duration-300 min-h-screen">
      {/* Safely import Material Symbols - Next.js will hoist this to the document head */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </div>
  )
}