import '@/globals.css'

export default function SystemLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className='dark'>
            <body className='bg-gray-900 text-gray-100 min-h-screen antialiased'>
                {children}
            </body>
        </html>
    )
}