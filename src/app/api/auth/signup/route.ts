import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password, role, legalConsent } = body
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Validar aceite legal
    if (!legalConsent || !legalConsent.acceptedTerms || !legalConsent.acceptedPrivacy) {
      return NextResponse.json({ error: 'Legal consent required' }, { status: 400 })
    }

    // basic email + password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ error: 'User already exists' }, { status: 409 })

    const hashed = await hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: role || 'CLIENT',
        // LGPD Compliance: Registrar aceite de termos
        acceptedTermsAt: new Date(),
        acceptedTermsVersion: '1.0.0',
        marketingConsent: legalConsent.marketingConsent || false,
        dataProcessingConsent: true, // Sempre true (necessário para serviço)
      },
    })

    // generate email verification token and send email
    try {
      const token = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24h
      await prisma.emailVerificationToken.create({
        data: { token, userId: user.id, expiresAt },
      })
      await sendVerificationEmail(user.id, user.email, token)
    } catch (err) {
      console.error('Failed to create/send verification token', err)
    }

    // create basic profile based on role
    if ((role || 'CLIENT') === 'CLIENT') {
      await prisma.clientProfile.create({ data: { userId: user.id } })
    }
    if ((role || 'CLIENT') === 'THERAPIST') {
      await prisma.therapistProfile.create({ data: { userId: user.id, specialty: '' } })
    }
    if ((role || 'CLIENT') === 'SPACE') {
      await prisma.spaceProfile.create({ data: { userId: user.id, name: `${name}'s Space`, address: '' } })
    }

    return NextResponse.json({ id: user.id, email: user.email, name: user.name })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
