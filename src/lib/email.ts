import { prisma } from './prisma'

const fromEmail = process.env.FROM_EMAIL || `no-reply@${process.env.NEXTAUTH_URL?.replace(/^https?:\/\//, '') || 'senda.app'}`

async function sendViaSendGrid(email: string, subject: string, html: string) {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) throw new Error('SENDGRID_API_KEY not configured')

  const payload = {
    personalizations: [{ to: [{ email }] }],
    from: { email: fromEmail },
    subject,
    content: [{ type: 'text/html', value: html }],
  }

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`SendGrid error: ${res.status} ${text}`)
  }
}

async function sendViaNodemailer(email: string, subject: string, html: string) {
  try {
    const nodemailerModule = await import('nodemailer')
    const nodemailer = nodemailerModule.default || nodemailerModule
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
    })

    await transporter.sendMail({ from: fromEmail, to: email, subject, html })
  } catch (err) {
    throw err
  }
}

export async function sendVerificationEmail(userId: number, email: string, token: string) {
  const base = process.env.NEXTAUTH_URL || process.env.FRONTEND_URL || 'http://localhost:3000'
  const verifyUrl = `${base.replace(/\/$/, '')}/api/auth/verify?token=${encodeURIComponent(token)}`

  const subject = 'Verifique seu e-mail — Senda'
  const html = `
    <p>Olá,</p>
    <p>Obrigado por criar sua conta no Senda. Por favor, confirme seu e-mail clicando no link abaixo:</p>
    <p><a href="${verifyUrl}">Confirmar meu e-mail</a></p>
    <p>Se você não criou essa conta, ignore este e-mail.</p>
    <hr />
    <p>Senda</p>
  `

  // send mail (prefer SendGrid via fetch to avoid extra deps)
  try {
    const hasSendGrid = Boolean(process.env.SENDGRID_API_KEY)
    const hasSmtp = Boolean(process.env.SMTP_HOST || (process.env.SMTP_USER && process.env.SMTP_PASS))

    if (hasSendGrid) {
      await sendViaSendGrid(email, subject, html)
    } else if (hasSmtp) {
      await sendViaNodemailer(email, subject, html)
    } else {
      console.warn('No email provider configured: set SENDGRID_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS. Skipping sending email.')
    }
  } catch (err) {
    console.error('Error sending verification email', err)
  }

  // store the token record just in case (already created by signup flow, this is optional safety)
  try {
    await prisma.emailVerificationToken.upsert({
      where: { token },
      update: {},
      create: {
        token,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
  } catch (err) {
    console.error('Error upserting email verification token', err)
  }
}

export default null
