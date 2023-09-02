import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from '@prisma/client'  // Ajusta la ruta según la ubicación de tu cliente prisma

const prisma = new PrismaClient()
export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
})
