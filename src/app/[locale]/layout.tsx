import { ThemeProvider } from "@/components/ThemeProvider"
import '../../globals.css';
import { ReactNode } from "react";


// Root layout requires suppressHudrationWaring when using next-themes
export default function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Safely import Material Symbols to prevent rendering icons as plain text */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-500 dark:bg-[#0f172a] transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}