'use server'

import { prisma } from '../../backend/db/prisma'

export async function registerVisitor(name: string, company: string) {
    try {
        const visitor = await prisma.visitor.create({
            data: {
                name,
                company: company || null,
            }
        })

        return { success: true, visitorId: visitor.id }
    } catch (error) {
        console.error('ERROR IN REGISTER VISITOR:', error)
        return { success: false, error: 'Failed to register' }
    }
}