import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    if (user.emailVerified) return NextResponse.json({ error: 'Email already verified' }, { status: 400 })

    // optional rate-limit: check last token creation
    const last = await prisma.emailVerificationToken.findFirst({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } })
    if (last && last.createdAt > new Date(Date.now() - 1000 * 60)) {
      return NextResponse.json({ error: 'Please wait before requesting another token' }, { status: 429 })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24h
    await prisma.emailVerificationToken.create({ data: { token, userId: user.id, expiresAt } })
    await sendVerificationEmail(user.id, user.email, token)

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('resend-verification error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
