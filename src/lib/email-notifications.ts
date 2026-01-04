import { sendEmail as coreEmailSend } from './email'

/**
 * Sends email using existing email infrastructure
 * Handles booking confirmations, reminders, and notifications
 */
export async function sendEmail({
  to,
  subject,
  html
}: {
  to: string
  subject: string
  html: string
}) {
  try {
    await coreEmailSend({ to, subject, html })
    console.log('✅ Email sent:', { to, subject })
    return { success: true }
  } catch (error) {
    console.error('❌ Email error:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Sends booking confirmation email to client
 */
export async function sendBookingConfirmationToClient({
  clientEmail,
  clientName,
  therapistName,
  serviceName,
  appointmentDate,
  appointmentTime,
  bookingId
}: {
  clientEmail: string
  clientName: string
  therapistName: string
  serviceName: string
  appointmentDate: string
  appointmentTime: string
  bookingId: number
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F0EBE3; }
          .header { background-color: white; padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
          .header h1 { color: #B2B8A3; margin: 0; font-size: 24px; }
          .content { background-color: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; }
          .detail { margin: 15px 0; padding: 15px; background-color: #F0EBE3; border-left: 4px solid #B2B8A3; }
          .detail-label { color: #666; font-size: 12px; text-transform: uppercase; }
          .detail-value { color: #333; font-weight: 600; margin-top: 5px; }
          .cta { display: inline-block; padding: 12px 24px; background-color: #B2B8A3; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Seu agendamento foi confirmado!</h1>
          </div>

          <div class="content">
            <p>Olá ${clientName},</p>
            <p>Seu agendamento com <strong>${therapistName}</strong> foi confirmado com sucesso!</p>

            <div class="detail">
              <div class="detail-label">Serviço</div>
              <div class="detail-value">${serviceName}</div>
            </div>

            <div class="detail">
              <div class="detail-label">Terapeuta</div>
              <div class="detail-value">${therapistName}</div>
            </div>

            <div class="detail">
              <div class="detail-label">Data e Hora</div>
              <div class="detail-value">${appointmentDate} às ${appointmentTime}</div>
            </div>

            <div class="detail">
              <div class="detail-label">Número do Agendamento</div>
              <div class="detail-value">#${bookingId}</div>
            </div>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              <strong>Lembretes importantes:</strong><br>
              • Você receberá um lembrete 24h antes do agendamento<br>
              • Pode cancelar com reembolso até 24h antes<br>
              • Tenha curiosidade e chegue alguns minutos antes
            </p>

            <a href="${process.env.NEXTAUTH_URL}/booking/${bookingId}" class="cta">Ver Detalhes do Agendamento</a>
          </div>

          <div class="footer">
            <p>Senda - Seu caminho para o bem-estar</p>
            <p>© 2026 Senda. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: clientEmail,
    subject: `✓ Seu agendamento com ${therapistName} foi confirmado!`,
    html
  })
}

/**
 * Sends booking notification email to therapist
 */
export async function sendBookingNotificationToTherapist({
  therapistEmail,
  therapistName,
  clientName,
  clientPhone,
  serviceName,
  appointmentDate,
  appointmentTime,
  bookingId
}: {
  therapistEmail: string
  therapistName: string
  clientName: string
  clientPhone: string | null
  serviceName: string
  appointmentDate: string
  appointmentTime: string
  bookingId: number
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F0EBE3; }
          .header { background-color: white; padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
          .header h1 { color: #B2B8A3; margin: 0; font-size: 24px; }
          .content { background-color: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; }
          .detail { margin: 15px 0; padding: 15px; background-color: #F0EBE3; border-left: 4px solid #B2B8A3; }
          .detail-label { color: #666; font-size: 12px; text-transform: uppercase; }
          .detail-value { color: #333; font-weight: 600; margin-top: 5px; }
          .cta { display: inline-block; padding: 12px 24px; background-color: #B2B8A3; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📅 Novo agendamento recebido!</h1>
          </div>

          <div class="content">
            <p>Olá ${therapistName},</p>
            <p>Você recebeu um novo agendamento! Confirme se está tudo bem.</p>

            <div class="detail">
              <div class="detail-label">Cliente</div>
              <div class="detail-value">${clientName}</div>
            </div>

            ${clientPhone ? `
            <div class="detail">
              <div class="detail-label">Telefone do Cliente</div>
              <div class="detail-value">${clientPhone}</div>
            </div>
            ` : ''}

            <div class="detail">
              <div class="detail-label">Serviço</div>
              <div class="detail-value">${serviceName}</div>
            </div>

            <div class="detail">
              <div class="detail-label">Data e Hora</div>
              <div class="detail-value">${appointmentDate} às ${appointmentTime}</div>
            </div>

            <div class="detail">
              <div class="detail-label">ID do Agendamento</div>
              <div class="detail-value">#${bookingId}</div>
            </div>

            <a href="${process.env.NEXTAUTH_URL}/dashboard/therapist/bookings" class="cta">Ver no Dashboard</a>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: therapistEmail,
    subject: `📅 Novo agendamento de ${clientName}`,
    html
  })
}

/**
 * Sends appointment reminder (24h before)
 */
export async function sendAppointmentReminder({
  to,
  name,
  therapistName,
  serviceName,
  appointmentTime,
  bookingId
}: {
  to: string
  name: string
  therapistName: string
  serviceName: string
  appointmentTime: string
  bookingId: number
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F0EBE3; }
          .header { background-color: white; padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
          .header h1 { color: #B2B8A3; margin: 0; font-size: 24px; }
          .content { background-color: white; padding: 30px; border-radius: 8px; }
          .detail { margin: 15px 0; padding: 15px; background-color: #F0EBE3; border-left: 4px solid #B2B8A3; }
          .detail-value { color: #333; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏰ Seu agendamento é amanhã!</h1>
          </div>

          <div class="content">
            <p>Olá ${name},</p>
            <p>Este é um lembrete do seu agendamento com <strong>${therapistName}</strong> amanhã!</p>

            <div class="detail">
              <div class="detail-value">Amanhã às ${appointmentTime}</div>
            </div>

            <div class="detail">
              <div class="detail-value">Serviço: ${serviceName}</div>
            </div>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              Precisando cancelar? Você pode fazê-lo sem custos até 24h antes.<br>
              Vejo você em breve! 🌿
            </p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to,
    subject: `⏰ Lembrete: Seu agendamento com ${therapistName} é amanhã!`,
    html
  })
}
