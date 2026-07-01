'use server'

import { prisma } from "../../../backend/db/prisma";
import { revalidatePath } from "next/cache";

/**
 * ACTION: Permanently deletes a visitor and all their associated chat messages.
 * Uses Prisma's cascade delete defined in the schema.
 */
export async function deleteVisitorConversation(visitorIdentifier: string) {
    try {
        await prisma.visitor.delete({
            where: { id: visitorIdentifier }
        });

        // REVALIDATION: Forces Next.js to refresh the dashboard data immediately
        revalidatePath('/system');
        
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete" };
    }
}