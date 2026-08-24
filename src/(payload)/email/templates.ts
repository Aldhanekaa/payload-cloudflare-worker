import type { SendMailOptions } from 'nodemailer'
import { getTransporter, emailConfig } from './nodemailer'

/**
 * Email template for user verification
 */
export const sendVerificationEmail = async (
  to: string,
  token: string,
  baseUrl: string,
): Promise<void> => {
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`

  const mailOptions: SendMailOptions = {
    from: `${emailConfig.fromName} <${emailConfig.from}>`,
    to,
    subject: 'Verify Your Email Address',
    text: `Please verify your email address by clicking on the following link: ${verificationUrl}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                  <tr>
                    <td style="padding: 40px 30px; text-align: center; background-color: #1a202c; color: #ffffff;">
                      <h1 style="margin: 0; font-size: 24px;">Verify Your Email Address</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="margin: 0 0 20px; font-size: 16px; color: #333333;">
                        Thank you for signing up! Please verify your email address by clicking the button below.
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 20px 0;">
                            <a href="${verificationUrl}" style="display: inline-block; padding: 14px 40px; background-color: #3182ce; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                              Verify Email
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p style="margin: 20px 0 0; font-size: 14px; color: #666666;">
                        If the button doesn't work, copy and paste this link into your browser:
                      </p>
                      <p style="margin: 10px 0 0; font-size: 14px; color: #3182ce; word-break: break-all;">
                        ${verificationUrl}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 30px; background-color: #f7fafc; text-align: center; font-size: 12px; color: #718096;">
                      <p style="margin: 0;">
                        If you didn't create an account, please ignore this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  }

  const transporter = getTransporter()
  await transporter.sendMail(mailOptions)
}

/**
 * Email template for password reset
 */
export const sendPasswordResetEmail = async (
  to: string,
  token: string,
  baseUrl: string,
): Promise<void> => {
  const resetUrl = `${baseUrl}/reset-password?token=${token}`

  const mailOptions: SendMailOptions = {
    from: `${emailConfig.fromName} <${emailConfig.from}>`,
    to,
    subject: 'Reset Your Password',
    text: `You requested to reset your password. Click the following link to reset it: ${resetUrl}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                  <tr>
                    <td style="padding: 40px 30px; text-align: center; background-color: #1a202c; color: #ffffff;">
                      <h1 style="margin: 0; font-size: 24px;">Reset Your Password</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="margin: 0 0 20px; font-size: 16px; color: #333333;">
                        We received a request to reset your password. Click the button below to choose a new password.
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 20px 0;">
                            <a href="${resetUrl}" style="display: inline-block; padding: 14px 40px; background-color: #e53e3e; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                              Reset Password
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p style="margin: 20px 0 0; font-size: 14px; color: #666666;">
                        If the button doesn't work, copy and paste this link into your browser:
                      </p>
                      <p style="margin: 10px 0 0; font-size: 14px; color: #3182ce; word-break: break-all;">
                        ${resetUrl}
                      </p>
                      <p style="margin: 20px 0 0; font-size: 14px; color: #e53e3e;">
                        This link will expire in 1 hour.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 30px; background-color: #f7fafc; text-align: center; font-size: 12px; color: #718096;">
                      <p style="margin: 0;">
                        If you didn't request a password reset, please ignore this email or contact support if you have concerns.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  }

  const transporter = getTransporter()
  await transporter.sendMail(mailOptions)
}

/**
 * Generic email template for contact forms or notifications
 */
export const sendContactFormEmail = async (data: {
  to: string
  subject: string
  name: string
  email: string
  message: string
}): Promise<void> => {
  const mailOptions: SendMailOptions = {
    from: `${emailConfig.fromName} <${emailConfig.from}>`,
    to: data.to,
    replyTo: data.email,
    subject: data.subject,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${data.subject}</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                  <tr>
                    <td style="padding: 40px 30px; text-align: center; background-color: #1a202c; color: #ffffff;">
                      <h1 style="margin: 0; font-size: 24px;">${data.subject}</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                        <tr>
                          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                            <strong style="color: #333333;">Name:</strong>
                            <span style="color: #666666; margin-left: 10px;">${data.name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                            <strong style="color: #333333;">Email:</strong>
                            <span style="color: #666666; margin-left: 10px;">${data.email}</span>
                          </td>
                        </tr>
                      </table>
                      <div style="margin-top: 30px;">
                        <strong style="color: #333333; font-size: 16px;">Message:</strong>
                        <p style="margin: 15px 0 0; font-size: 14px; color: #666666; line-height: 1.6; white-space: pre-wrap;">
${data.message}
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 30px; background-color: #f7fafc; text-align: center; font-size: 12px; color: #718096;">
                      <p style="margin: 0;">
                        This email was sent from the contact form on Anderson Properties website.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  }

  const transporter = getTransporter()
  await transporter.sendMail(mailOptions)
}

/**
 * Send a custom email with HTML content
 */
export const sendCustomEmail = async (options: {
  to: string | string[]
  subject: string
  text?: string
  html?: string
  cc?: string | string[]
  bcc?: string | string[]
  attachments?: Array<{
    filename: string
    path?: string
    content?: string | Buffer
  }>
}): Promise<void> => {
  const mailOptions: SendMailOptions = {
    from: `${emailConfig.fromName} <${emailConfig.from}>`,
    ...options,
  }

  const transporter = getTransporter()
  await transporter.sendMail(mailOptions)
}
