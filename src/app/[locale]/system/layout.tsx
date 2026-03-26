import '@/globals.css'

// System-specific Root Layout
export default function SystemLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            {/* Forced dark mode for the admin dashboard as an Enterprise standard */}
            <body className="bg-gray-900 text-gray-100 min-h-screen">
                {children}
            </body>
        </html>
    );
}