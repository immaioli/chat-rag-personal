import { User, Bot, Building2, Calendar } from 'lucide-react';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';
import { prisma } from '../../../backend/db/prisma';
import { LogOutButton } from '@/components/admin/LogoutButton';

// Server Component acting as an internal Admin Dashboard
export const dynamic = 'force-dynamic';

export default async function SystemDashboard() {
    // QUERY: Fetch visitors and their complete chat history
    const visitors = await prisma.visitor.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            messages: {
                orderBy: { createdAt: 'asc' }
            }
        }
    });

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <header className="border-b border-gray-800 pb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">System Telemetry</h1>
                    <p className="text-gray-400 mt-2">Real-time monitoring of intercepted AI interactions.</p>
                </div>
                <LogOutButton />
            </header>
            {/* SINGLE COLUMN LAYOUT: Maximizing space for chat logs */}
            <div className="space-y-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-xl">
                    <h2 className="text-xl font-semibold mb-6 text-gray-200 border-b border-gray-700 pb-4">
                        Intercepted Messages ({visitors.length})
                    </h2>
                    {visitors.length === 0 ? (
                        <p className="text-gray-500 text-sm">No conversations intercepted yet.</p>
                    ) : (
                        <div className="space-y-6">
                            {visitors.map((visitor) => (
                                <div key={visitor.id} className="bg-gray-900/80 border border-gray-700 rounded-lg overflow-hidden">
                                    {/* Visitor Header */}
                                    <div className="bg-gray-800/80 p-4 border-b border-gray-700 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-blue-400" />
                                                <span className="font-semibold text-gray-200">{visitor.name}</span>
                                            </div>
                                            {visitor.company && (
                                                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                                                    <Building2 className="w-4 h-4" />
                                                    <span>{visitor.company}</span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Actions & Timestamp */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(visitor.createdAt).toLocaleString('pt-BR')}
                                            </div>
                                            {/* IMPLEMENTATION: The secure tooltip delete button */}
                                            <DeleteConfirmButton visitorIdentifier={visitor.id} />
                                        </div>
                                    </div>
                                    {/* Chat Transcript */}
                                    <div className="p-4 space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                                        {visitor.messages.length === 0 ? (
                                            <p className="text-gray-600 text-sm text-center py-4">No messages sent.</p>
                                        ) : (
                                            visitor.messages.map((msg) => (
                                                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                    {msg.role === 'assistant' && (
                                                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                                                            <Bot className="w-4 h-4 text-indigo-400" />
                                                        </div>
                                                    )}
                                                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                                        ? 'bg-blue-600/20 text-blue-100 border border-blue-500/30 rounded-tr-none'
                                                        : 'bg-gray-800 text-gray-300 border border-gray-700 rounded-tl-none'
                                                        }`}>
                                                        {msg.content}
                                                    </div>
                                                    {msg.role === 'user' && (
                                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                                                            <User className="w-4 h-4 text-blue-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}