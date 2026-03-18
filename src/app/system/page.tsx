import { prisma } from "../../../backend/db/prisma"

// Server Component acting as an internal Admin Dashboard
export default async function SystemDashboard() {
    // Query standard fields to bypass Prisma Studio's vector serialization limitations
    const docs = await prisma.$queryRaw`
        SELECT id, title FROM "Document" ORDER BY id DESC LIMIT 10
    ` as Array<{ id: number, title: string }>

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-primary">System Telemetry & RAG Audit</h1>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 border-4 border-b pb-2">Indexed Documents</h2>
                {docs.length === 0
                    ? (<p className="text-gray-500">No documents found in the vector store.</p>)
                    : (
                        <ul className="space-y-2">
                            {docs.map((doc) => (
                                <li className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                                    <span>{doc.title}</span>
                                    <span className="text-sm text-gray-400">ID: {doc.id}</span>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        </div>
    )
}