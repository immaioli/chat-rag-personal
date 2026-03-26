import '@/globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider'; // Ajuste o caminho se necessário

// METADATA: SEO and browser tab configuration
export const metadata = {
    title: 'maioli.dev | mAIo Assistant Chat',
    description: 'AI Portfolio and RAG Knowledge Base',
};

// ROOT LAYOUT: Mandatory in Next.js App Router to define HTML structure
export default function RootLayout({
    children,
    params: { locale }
}: {
    children: ReactNode;
    params: { locale: string };
}) {
    return (
        // WARNING: suppressHydrationWarning is strictly required when using next-themes
        <html lang={locale} suppressHydrationWarning>
            <body className="antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-[#111418] transition-colors">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}