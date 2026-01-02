/*
 Simple e2e helper script to exercise signup -> token creation -> verify.
 Run after `npm run dev` (app on http://localhost:3000).

 Usage:
   node scripts/e2e-signup-verify.js

 Note: This script reads the local SQLite DB via Prisma client to fetch token.
 Make sure `NODE_ENV` and `DATABASE_URL` point to the dev DB used by your app.
*/
const _nodeFetch = require('node-fetch')
const fetch = _nodeFetch.default || _nodeFetch
const { PrismaClient } = require('@prisma/client')

;(async function main(){
  const base = process.env.BASE_URL || 'http://localhost:3000'
  const prisma = new PrismaClient()
  const email = `test+${Date.now()}@example.com`
  const password = 'password123'
  console.log('Signing up', email)
  let res
  try {
    res = await fetch(`${base}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'E2E Tester', email, password, role: 'CLIENT' })
    })
  } catch (err) {
    // fallback if dev server started on 3001
    const fallback = base.replace(':3000', ':3001')
    console.log('Primary request failed, trying fallback', fallback)
    res = await fetch(`${fallback}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'E2E Tester', email, password, role: 'CLIENT' })
    })
  }
  const body = await res.json().catch(async () => {
    const text = await res.text().catch(()=>'')
    console.error('Non-JSON response from signup:', text.substring(0,200))
    throw new Error('Signup did not return JSON')
  })
  console.log('Signup response:', body)

  // wait a moment for token to be written
  await new Promise(r => setTimeout(r, 1000))

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) { console.error('User not found in DB'); process.exit(1) }
  const token = await prisma.emailVerificationToken.findFirst({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } })
  if (!token) { console.error('No verification token found'); process.exit(1) }
  console.log('Found token:', token.token)

  const verifyRes = await fetch(`${base}/api/auth/verify?token=${encodeURIComponent(token.token)}`, { redirect: 'manual' })
  console.log('Verify response status:', verifyRes.status, verifyRes.statusText)
  if (verifyRes.status === 307 || verifyRes.status === 302) {
    console.log('Verify redirect OK')
  } else {
    console.error('Verify failed')
    process.exit(1)
  }

  // cleanup
  await prisma.$disconnect()
  console.log('E2E script finished')
})().catch(err=>{ console.error(err); process.exit(1) })
