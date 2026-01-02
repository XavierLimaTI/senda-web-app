import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const tokenRequired = process.env.CLEANUP_BEARER_TOKEN
    if (tokenRequired) {
      const auth = req.headers.get('authorization') || ''
      const parts = auth.split(' ')
      const supplied = parts.length === 2 && parts[0].toLowerCase() === 'bearer' ? parts[1] : null
      if (!supplied || supplied !== tokenRequired) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const now = new Date()

    // defensive check: if Prisma client wasn't regenerated after schema change,
    // `prisma.emailVerificationToken` may be undefined and cause an unclear crash.
    if (!('emailVerificationToken' in prisma) || typeof (prisma as any).emailVerificationToken?.deleteMany !== 'function') {
      const msg = 'Prisma client missing model `emailVerificationToken`. Run `npx prisma generate` and restart the server.'
      console.error(msg)
      return NextResponse.json({ error: msg }, { status: 500 })
    }

    try {
      const result = await (prisma as any).emailVerificationToken.deleteMany({ where: { expiresAt: { lt: now } } })
      return NextResponse.json({ deleted: result.count })
    } catch (innerErr: any) {
      console.error('Error deleting expired verification tokens', innerErr)
      return NextResponse.json({ error: innerErr?.message || 'Failed to delete tokens' }, { status: 500 })
    }
  } catch (err: any) {
    console.error('cleanup-verification error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
