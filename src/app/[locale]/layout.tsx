import { ThemeProvider } from "@/components/ThemeProvider"
import '../globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning is mandatory when using next-theme to prevent React mistmatch errors
    <html lang="en" suppressContentEditableWarning>
      <body className="bg-gray-500 dark:bg-[#0f172a] transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}