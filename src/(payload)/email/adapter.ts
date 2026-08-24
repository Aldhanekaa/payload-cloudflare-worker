import type { EmailAdapter, Payload } from 'payload'
import nodemailer from 'nodemailer'
import type { Transporter, SendMailOptions } from 'nodemailer'

let transporter: Transporter | null = null

/**
 * Get or create transporter instance
 */
const getTransporter = (): Transporter => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  return transporter
}

/**
 * Create a Nodemailer email adapter for PayloadCMS
 * This adapter integrates Nodemailer with PayloadCMS email system
 */
export const nodemailerAdapter: EmailAdapter = ({ payload }: { payload: Payload }) => {
  return {
    name: 'nodemailer',
    defaultFromAddress: process.env.SMTP_FROM_EMAIL || 'noreply@example.com',
    defaultFromName: process.env.SMTP_FROM_NAME || 'Anderson Properties',

    sendEmail: async (message) => {
      const transport = getTransporter()

      const mailOptions: SendMailOptions = {
        from:
          message.from ||
          `${process.env.SMTP_FROM_NAME || 'Anderson Properties'} <${process.env.SMTP_FROM_EMAIL || 'noreply@example.com'}>`,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      }

      try {
        const info = await transport.sendMail(mailOptions)
        console.log('Email sent successfully:', info.messageId)
        return info
      } catch (error) {
        console.error('Failed to send email via Nodemailer:', error)
        throw error
      }
    },
  }
}
