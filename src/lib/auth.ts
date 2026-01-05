import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user) return null
        
        // Verificar se senha está correta
        const isValid = await compare(credentials.password, user.password)
        if (!isValid) return null
        
        // TEMPORÁRIO: Permitir login sem verificação de email em DEV
        // TODO: Remover em produção ou após testar email verification
        // if (!user.emailVerified) {
        //   throw new Error('Email não verificado. Verifique sua caixa de entrada.')
        // }
        
        return { id: user.id.toString(), email: user.email, name: user.name, role: user.role, avatar: user.avatar }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: (user as any).id,
          role: (user as any).role,
          avatar: (user as any).avatar,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: (token as any).id,
          role: (token as any).role,
          avatar: (token as any).avatar,
        }
      }
    },
  },
}

export default authOptions