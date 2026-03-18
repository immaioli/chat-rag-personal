import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Credentials({
        credentials: {
            password: { label: "Senha Segura", type: "password" }
        },
        async authorize(credentials) {
            if (credentials?.password === process.env.ADMIN_PASSWORD) {
                return { id: "1", name: "Irineu Admin" };
            }
            return null;
        }
    })],
    trustHost: true
})