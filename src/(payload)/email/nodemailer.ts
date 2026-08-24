import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

let transporter: Transporter | null = null

/**
 * Get or create a Nodemailer transporter instance
 */
export const getTransporter = (): Transporter => {
  if (transporter) {
    return transporter
  }

  // Create transporter based on environment configuration
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Optional: Add custom options
    ...(process.env.SMTP_SERVICE && { service: process.env.SMTP_SERVICE }),
  })

  return transporter
}

/**
 * Default email configuration
 */
export const emailConfig = {
  from: process.env.SMTP_FROM_EMAIL || 'noreply@example.com',
  fromName: process.env.SMTP_FROM_NAME || 'Anderson Properties',
}

/**
 * Verify transporter connection
 */
export const verifyEmailConnection = async (): Promise<boolean> => {
  try {
    const transport = getTransporter()
    await transport.verify()
    console.log('Email connection verified successfully')
    return true
  } catch (error) {
    console.error('Email connection verification failed:', error)
    return false
  }
}

/**
 * Send a test email
 */
export const sendTestEmail = async (to: string): Promise<boolean> => {
  try {
    const transport = getTransporter()
    await transport.sendMail({
      from: `${emailConfig.fromName} <${emailConfig.from}>`,
      to,
      subject: 'Test Email from Anderson Properties',
      text: 'This is a test email to verify your email configuration.',
      html: '<p>This is a test email to verify your email configuration.</p>',
    })
    console.log('Test email sent successfully')
    return true
  } catch (error) {
    console.error('Failed to send test email:', error)
    return false
  }
}
