import '@/globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl'
import { getMessages as getTranslate } from 'next-intl/server'

// METADATA: SEO and browser tab configuration
export const metadata = {
    title: 'maioli.dev | mAIo Assistant Chat',
    description: 'AI Portfolio and RAG Knowledge Base',
};

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const translates = await getTranslate()

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className='antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-custom_bg-main transition-colors'>
                {/* INTL provider: injects the i18n context so Client Component can use hooks like useRouter */}
                <NextIntlClientProvider messages={translates}>
                    {/* Theme provider: Dark mode injection */}
                    <ThemeProvider
                        attribute='class'
                        defaultTheme='dark'
                        enableSystem={false}
                    >
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )

}