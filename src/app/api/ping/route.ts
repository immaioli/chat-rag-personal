import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        service: 'chat-rag-personal-frontend',
        timestamp: new Date().toISOString()
    }, { status: 200 });
}