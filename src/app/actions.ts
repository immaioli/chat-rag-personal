'use server';

import { z } from 'zod';

// Define strict validation rules using Zod
const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    company: z.string().min(2, "Company is required."),
});

// Server action triggered directly by the HTML form element
export async function submitProfile(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = userSchema.safeParse(rawData);

    // Early return: stop execution and return errors to the client
    if (!validatedFields.success) {
        // Zod v4 pattern: using top-level z.flattenError() function
        const { fieldErrors } = z.flattenError(validatedFields.error)

        return {
            errors: fieldErrors,
            message: "Failed to validate profile.",
        };
    }

    // TODO: Save user profile to PostgreSQL using Prisma here
    return { success: true, message: "Profile configured successfully!" };
}