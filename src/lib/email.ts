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

/**
 * Função genérica para enviar emails
 * Tenta SendGrid primeiro, depois Nodemailer (SMTP)
 */
export async function sendEmail(params: {
  to: string
  subject: string
  html: string
}) {
  const { to, subject, html } = params

  try {
    const hasSendGrid = Boolean(process.env.SENDGRID_API_KEY)
    const hasSmtp = Boolean(process.env.SMTP_HOST || (process.env.SMTP_USER && process.env.SMTP_PASS))

    if (hasSendGrid) {
      await sendViaSendGrid(to, subject, html)
    } else if (hasSmtp) {
      await sendViaNodemailer(to, subject, html)
    } else {
      console.warn('No email provider configured: set SENDGRID_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS. Skipping sending email.')
    }
  } catch (err) {
    console.error('Error sending email', err)
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

/**
 * Send booking confirmation email to client
 */
export async function sendBookingConfirmationEmail(
  clientEmail: string,
  clientName: string,
  bookingDetails: {
    therapistName: string
    serviceName: string
    startTime: Date
    endTime: Date
    price: number
    bookingId: number
  }
) {
  const { therapistName, serviceName, startTime, endTime, price, bookingId } = bookingDetails
  
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(startTime)
  
  const formattedTime = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(startTime)

  const subject = 'Agendamento Confirmado — Senda'
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #B2B8A3 0%, #C8963E 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: #F0EBE3; margin: 0; font-size: 28px;">Senda</h1>
        <p style="color: #F0EBE3; margin-top: 10px; font-size: 16px;">Seu caminho de autocuidado</p>
      </div>
      
      <div style="padding: 40px 30px; background: #F0EBE3;">
        <h2 style="color: #2d3748; margin-top: 0;">Olá, ${clientName}!</h2>
        
        <p style="line-height: 1.6; color: #4a5568;">
          Seu agendamento foi confirmado com sucesso. Estamos ansiosos para acompanhá-lo nesta jornada.
        </p>
        
        <div style="background: white; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #B2B8A3;">
          <h3 style="margin-top: 0; color: #2d3748; font-size: 18px;">Detalhes do Agendamento</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Terapeuta:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${therapistName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Serviço:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Data:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Horário:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${formattedTime}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Valor:</td>
              <td style="padding: 8px 0; color: #C8963E; text-align: right; font-weight: 600;">R$ ${price.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #D99A8B20; border-radius: 8px; padding: 16px; margin: 24px 0;">
          <p style="margin: 0; color: #4a5568; font-size: 14px;">
            <strong style="color: #B2B8A3;">• Preparação:</strong> Recomendamos chegar 5-10 minutos antes do horário agendado. 
            Traga roupas confortáveis e uma mente aberta para a experiência.
          </p>
        </div>
        
        <p style="line-height: 1.6; color: #4a5568; margin-top: 24px;">
          Se precisar cancelar ou reagendar, você pode fazer isso pelo seu dashboard até 24 horas antes da sessão.
        </p>
        
        <div style="text-align: center; margin-top: 32px;">
          <a href="${process.env.NEXTAUTH_URL}/client/bookings" 
             style="display: inline-block; background: #B2B8A3; color: white; padding: 14px 32px; 
                    text-decoration: none; border-radius: 8px; font-weight: 600;">
            Ver Meus Agendamentos
          </a>
        </div>
      </div>
      
      <div style="padding: 24px; text-align: center; background: #2d3748; color: #a0aec0; font-size: 12px;">
        <p style="margin: 0;">Agendamento #${bookingId}</p>
        <p style="margin: 8px 0 0 0;">© 2026 Senda. Seu caminho de autocuidado.</p>
      </div>
    </div>
  `

  try {
    const hasSendGrid = Boolean(process.env.SENDGRID_API_KEY)
    const hasSmtp = Boolean(process.env.SMTP_HOST || (process.env.SMTP_USER && process.env.SMTP_PASS))

    if (hasSendGrid) {
      await sendViaSendGrid(clientEmail, subject, html)
    } else if (hasSmtp) {
      await sendViaNodemailer(clientEmail, subject, html)
    } else {
      console.warn('No email provider configured. Skipping booking confirmation email.')
      return
    }
    
    console.log(`✅ Booking confirmation email sent to ${clientEmail}`)
  } catch (err) {
    console.error('Error sending booking confirmation email:', err)
  }
}

/**
 * Send booking notification to therapist
 */
export async function sendBookingNotificationToTherapist(
  therapistEmail: string,
  therapistName: string,
  bookingDetails: {
    clientName: string
    serviceName: string
    startTime: Date
    endTime: Date
    price: number
    bookingId: number
  }
) {
  const { clientName, serviceName, startTime, endTime, price, bookingId } = bookingDetails
  
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(startTime)
  
  const formattedTime = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(startTime)

  const subject = '🔔 Novo Agendamento Recebido — Senda'
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #C8963E 0%, #B2B8A3 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: #F0EBE3; margin: 0; font-size: 28px;">Senda</h1>
        <p style="color: #F0EBE3; margin-top: 10px; font-size: 16px;">Dashboard do Terapeuta</p>
      </div>
      
      <div style="padding: 40px 30px; background: #F0EBE3;">
        <h2 style="color: #2d3748; margin-top: 0;">Olá, ${therapistName}! 🌟</h2>
        
        <p style="line-height: 1.6; color: #4a5568;">
          Você recebeu um novo agendamento. Um cliente está confiando em você para sua jornada de bem-estar.
        </p>
        
        <div style="background: white; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #C8963E;">
          <h3 style="margin-top: 0; color: #2d3748; font-size: 18px;">Detalhes do Agendamento</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Cliente:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${clientName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Serviço:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Data:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Horário:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${formattedTime}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Valor:</td>
              <td style="padding: 8px 0; color: #C8963E; text-align: right; font-weight: 600;">R$ ${price.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #B2B8A320; border-radius: 8px; padding: 16px; margin: 24px 0;">
          <p style="margin: 0; color: #4a5568; font-size: 14px;">
            <strong>💡 Lembrete:</strong> Prepare o espaço com antecedência e revise quaisquer preferências 
            ou histórico do cliente antes da sessão.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 32px;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard/therapist/bookings" 
             style="display: inline-block; background: #C8963E; color: white; padding: 14px 32px; 
                    text-decoration: none; border-radius: 8px; font-weight: 600;">
            Ver Agenda Completa
          </a>
        </div>
      </div>
      
      <div style="padding: 24px; text-align: center; background: #2d3748; color: #a0aec0; font-size: 12px;">
        <p style="margin: 0;">Agendamento #${bookingId}</p>
        <p style="margin: 8px 0 0 0;">© 2026 Senda. Transformando vidas através do cuidado.</p>
      </div>
    </div>
  `

  try {
    const hasSendGrid = Boolean(process.env.SENDGRID_API_KEY)
    const hasSmtp = Boolean(process.env.SMTP_HOST || (process.env.SMTP_USER && process.env.SMTP_PASS))

    if (hasSendGrid) {
      await sendViaSendGrid(therapistEmail, subject, html)
    } else if (hasSmtp) {
      await sendViaNodemailer(therapistEmail, subject, html)
    } else {
      console.warn('No email provider configured. Skipping therapist notification email.')
      return
    }
    
    console.log(`✅ Therapist notification email sent to ${therapistEmail}`)
  } catch (err) {
    console.error('Error sending therapist notification email:', err)
  }
}

/**
 * Send cancellation notification
 */
export async function sendCancellationEmail(
  recipientEmail: string,
  recipientName: string,
  bookingDetails: {
    serviceName: string
    startTime: Date
    reason?: string
    isClient: boolean
  }
) {
  const { serviceName, startTime, reason, isClient } = bookingDetails
  
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(startTime)
  
  const formattedTime = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(startTime)

  const subject = '⚠️ Agendamento Cancelado — Senda'
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #D99A8B 0%, #B2B8A3 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: #F0EBE3; margin: 0; font-size: 28px;">Senda</h1>
      </div>
      
      <div style="padding: 40px 30px; background: #F0EBE3;">
        <h2 style="color: #2d3748; margin-top: 0;">Olá, ${recipientName}</h2>
        
        <p style="line-height: 1.6; color: #4a5568;">
          Informamos que o agendamento abaixo foi cancelado.
        </p>
        
        <div style="background: white; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #D99A8B;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Serviço:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Data:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Horário:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${formattedTime}</td>
            </tr>
          </table>
          
          ${reason ? `
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #718096; font-size: 14px;"><strong>Motivo:</strong></p>
              <p style="margin: 4px 0 0 0; color: #4a5568;">${reason}</p>
            </div>
          ` : ''}
        </div>
        
        ${isClient ? `
          <p style="line-height: 1.6; color: #4a5568;">
            Você pode fazer um novo agendamento quando desejar. Estamos aqui para sua jornada de autocuidado.
          </p>
          
          <div style="text-align: center; margin-top: 32px;">
            <a href="${process.env.NEXTAUTH_URL}/explore/therapists" 
               style="display: inline-block; background: #B2B8A3; color: white; padding: 14px 32px; 
                      text-decoration: none; border-radius: 8px; font-weight: 600;">
              Explorar Terapeutas
            </a>
          </div>
        ` : `
          <p style="line-height: 1.6; color: #4a5568;">
            Este horário voltou a ficar disponível em sua agenda.
          </p>
        `}
      </div>
      
      <div style="padding: 24px; text-align: center; background: #2d3748; color: #a0aec0; font-size: 12px;">
        <p style="margin: 0;">© 2026 Senda. Seu caminho de autocuidado.</p>
      </div>
    </div>
  `

  try {
    const hasSendGrid = Boolean(process.env.SENDGRID_API_KEY)
    const hasSmtp = Boolean(process.env.SMTP_HOST || (process.env.SMTP_USER && process.env.SMTP_PASS))

    if (hasSendGrid) {
      await sendViaSendGrid(recipientEmail, subject, html)
    } else if (hasSmtp) {
      await sendViaNodemailer(recipientEmail, subject, html)
    } else {
      console.warn('No email provider configured. Skipping cancellation email.')
      return
    }
    
    console.log(`✅ Cancellation email sent to ${recipientEmail}`)
  } catch (err) {
    console.error('Error sending cancellation email:', err)
  }
}

/**
 * Send reschedule notification to client
 */
export async function sendRescheduleNotificationToClient(
  clientEmail: string,
  clientName: string,
  bookingDetails: {
    therapistName: string
    serviceName: string
    oldStartTime: Date
    newStartTime: Date
    price: number
    bookingId: number
  }
) {
  const { therapistName, serviceName, oldStartTime, newStartTime, price, bookingId } = bookingDetails
  
  const formatDateTime = (date: Date) => {
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
    
    const formattedTime = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
    
    return `${formattedDate} às ${formattedTime}`
  }

  const subject = 'Agendamento Reagendado — Senda'
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #B2B8A3 0%, #C8963E 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: #F0EBE3; margin: 0; font-size: 28px;">Senda</h1>
        <p style="color: #F0EBE3; margin-top: 10px; font-size: 16px;">Seu caminho de autocuidado</p>
      </div>
      
      <div style="padding: 40px 30px; background: #F0EBE3;">
        <h2 style="color: #2d3748; margin-top: 0;">Olá, ${clientName}!</h2>
        
        <p style="line-height: 1.6; color: #4a5568;">
          Seu agendamento foi reagendado com sucesso. Confira os novos detalhes abaixo:
        </p>
        
        <div style="background: white; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #B2B8A3;">
          <h3 style="margin-top: 0; color: #2d3748; font-size: 18px;">Novo Agendamento</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Terapeuta:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${therapistName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Serviço:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Nova Data/Hora:</td>
              <td style="padding: 8px 0; color: #B2B8A3; text-align: right; font-weight: 600;">${formatDateTime(newStartTime)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Valor:</td>
              <td style="padding: 8px 0; color: #C8963E; text-align: right; font-weight: 600;">R$ ${price.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #D99A8B20; border-radius: 8px; padding: 16px; margin: 24px 0;">
          <p style="margin: 0; color: #718096; font-size: 13px; text-decoration: line-through;">
            Data anterior: ${formatDateTime(oldStartTime)}
          </p>
        </div>
        
        <p style="line-height: 1.6; color: #4a5568; font-size: 14px;">
          <strong>Lembrete:</strong> Se precisar reagendar novamente, você pode fazer isso pelo seu dashboard até 24 horas antes da nova data.
        </p>
        
        <div style="text-align: center; margin-top: 32px;">
          <a href="${process.env.NEXTAUTH_URL}/client/bookings" 
             style="display: inline-block; background: #B2B8A3; color: white; padding: 14px 32px; 
                    text-decoration: none; border-radius: 8px; font-weight: 600;">
            Ver Meus Agendamentos
          </a>
        </div>
      </div>
      
      <div style="padding: 24px; text-align: center; background: #2d3748; color: #a0aec0; font-size: 12px;">
        <p style="margin: 0;">Agendamento #${bookingId}</p>
        <p style="margin: 8px 0 0 0;">© 2026 Senda. Seu caminho de autocuidado.</p>
      </div>
    </div>
  `

  try {
    const hasSendGrid = Boolean(process.env.SENDGRID_API_KEY)
    const hasSmtp = Boolean(process.env.SMTP_HOST || (process.env.SMTP_USER && process.env.SMTP_PASS))

    if (hasSendGrid) {
      await sendViaSendGrid(clientEmail, subject, html)
    } else if (hasSmtp) {
      await sendViaNodemailer(clientEmail, subject, html)
    } else {
      console.warn('No email provider configured. Skipping reschedule notification email.')
      return
    }
    
    console.log(`✅ Reschedule notification sent to client ${clientEmail}`)
  } catch (err) {
    console.error('Error sending reschedule notification to client:', err)
  }
}

/**
 * Send reschedule notification to therapist
 */
export async function sendRescheduleNotificationToTherapist(
  therapistEmail: string,
  therapistName: string,
  bookingDetails: {
    clientName: string
    serviceName: string
    oldStartTime: Date
    newStartTime: Date
    price: number
    bookingId: number
  }
) {
  const { clientName, serviceName, oldStartTime, newStartTime, price, bookingId } = bookingDetails
  
  const formatDateTime = (date: Date) => {
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
    
    const formattedTime = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
    
    return `${formattedDate} às ${formattedTime}`
  }

  const subject = '🔄 Agendamento Reagendado — Senda'
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #C8963E 0%, #B2B8A3 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: #F0EBE3; margin: 0; font-size: 28px;">Senda</h1>
        <p style="color: #F0EBE3; margin-top: 10px; font-size: 16px;">Dashboard do Terapeuta</p>
      </div>
      
      <div style="padding: 40px 30px; background: #F0EBE3;">
        <h2 style="color: #2d3748; margin-top: 0;">Olá, ${therapistName}! 🔄</h2>
        
        <p style="line-height: 1.6; color: #4a5568;">
          Um cliente reagendou uma sessão com você. Sua agenda foi atualizada automaticamente.
        </p>
        
        <div style="background: white; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #C8963E;">
          <h3 style="margin-top: 0; color: #2d3748; font-size: 18px;">Agendamento Atualizado</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Cliente:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${clientName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Serviço:</td>
              <td style="padding: 8px 0; color: #2d3748; text-align: right;">${serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Nova Data/Hora:</td>
              <td style="padding: 8px 0; color: #C8963E; text-align: right; font-weight: 600;">${formatDateTime(newStartTime)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #718096; font-weight: 500;">Valor:</td>
              <td style="padding: 8px 0; color: #C8963E; text-align: right; font-weight: 600;">R$ ${price.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #B2B8A320; border-radius: 8px; padding: 16px; margin: 24px 0;">
          <p style="margin: 0 0 8px 0; color: #718096; font-size: 13px; font-weight: 500;">Reagendado de:</p>
          <p style="margin: 0; color: #718096; font-size: 13px; text-decoration: line-through;">
            ${formatDateTime(oldStartTime)}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 32px;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard/therapist/bookings" 
             style="display: inline-block; background: #C8963E; color: white; padding: 14px 32px; 
                    text-decoration: none; border-radius: 8px; font-weight: 600;">
            Ver Agenda Completa
          </a>
        </div>
      </div>
      
      <div style="padding: 24px; text-align: center; background: #2d3748; color: #a0aec0; font-size: 12px;">
        <p style="margin: 0;">Agendamento #${bookingId}</p>
        <p style="margin: 8px 0 0 0;">© 2026 Senda. Transformando vidas através do cuidado.</p>
      </div>
    </div>
  `

  try {
    const hasSendGrid = Boolean(process.env.SENDGRID_API_KEY)
    const hasSmtp = Boolean(process.env.SMTP_HOST || (process.env.SMTP_USER && process.env.SMTP_PASS))

    if (hasSendGrid) {
      await sendViaSendGrid(therapistEmail, subject, html)
    } else if (hasSmtp) {
      await sendViaNodemailer(therapistEmail, subject, html)
    } else {
      console.warn('No email provider configured. Skipping therapist reschedule notification.')
      return
    }
    
    console.log(`✅ Reschedule notification sent to therapist ${therapistEmail}`)
  } catch (err) {
    console.error('Error sending reschedule notification to therapist:', err)
  }
}

export default null
