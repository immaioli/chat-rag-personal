import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// CONFIGURATION: Setup NextAuth with a secure Credentials Provider for the Admin Dashboard
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // SECURITY: Validate credentials against environment variables
                // In a real scenario, use process.env.ADMIN_EMAIL and process.env.ADMIN_PASSWORD
                const adminEmail = process.env.ADMIN_EMAIL || "admin@maioli.dev.br";
                const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

                if (credentials?.email === adminEmail && credentials?.password === adminPassword) {
                    return { id: "1", name: "Admin", email: adminEmail };
                }
                
                // RETURN: Null indicates failed login
                return null;
            }
        })
    ],
    pages: {
        // ROUTING: Redirect unauthenticated users to our new dedicated admin login page
        signIn: '/system/login',
    },
    callbacks: {
        // SESSION: Ensure the session token is securely passed
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub as string;
            }
            return session;
        }
    }
});