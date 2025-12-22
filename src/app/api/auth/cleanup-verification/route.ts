import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    const now = new Date()
    const result = await prisma.emailVerificationToken.deleteMany({ where: { expiresAt: { lt: now } } })
    return NextResponse.json({ deleted: result.count })
  } catch (err: any) {
    console.error('cleanup-verification error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
