import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const token = url.searchParams.get('token')
    if (!token) return NextResponse.json({ error: 'Token is required' }, { status: 400 })

    const record = await prisma.emailVerificationToken.findUnique({ where: { token } })
    if (!record) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })

    if (record.expiresAt < new Date()) {
      // delete expired token
      await prisma.emailVerificationToken.delete({ where: { id: record.id } })
      return NextResponse.json({ error: 'Token expired' }, { status: 400 })
    }

    // mark user as verified
    await prisma.user.update({ where: { id: record.userId }, data: { emailVerified: new Date() } })

    // remove token
    await prisma.emailVerificationToken.delete({ where: { id: record.id } })

    // redirect to signin with success query
    const base = process.env.NEXTAUTH_URL || process.env.FRONTEND_URL || 'http://localhost:3000'
    const redirectTo = `${base.replace(/\/$/, '')}/auth/signin?verified=1`
    return NextResponse.redirect(redirectTo)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
