/**
 * Email Usage Examples
 *
 * This file contains examples of how to use the email functionality
 * in different parts of your application.
 */

import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendContactFormEmail,
  sendCustomEmail,
  verifyEmailConnection,
  sendTestEmail,
} from './index'

/**
 * Example 1: Verify email configuration on startup
 */
export async function verifyEmailOnStartup() {
  console.log('Verifying email configuration...')
  const isVerified = await verifyEmailConnection()

  if (isVerified) {
    console.log('✅ Email is configured correctly')
  } else {
    console.error('❌ Email configuration failed. Check your SMTP settings.')
  }
}

/**
 * Example 2: Send verification email when user registers
 */
export async function handleUserRegistration(userEmail: string, verificationToken: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    await sendVerificationEmail(userEmail, verificationToken, baseUrl)

    console.log(`Verification email sent to ${userEmail}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send verification email:', error)
    return { success: false, error }
  }
}

/**
 * Example 3: Send password reset email
 */
export async function handlePasswordResetRequest(userEmail: string, resetToken: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    await sendPasswordResetEmail(userEmail, resetToken, baseUrl)

    console.log(`Password reset email sent to ${userEmail}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send password reset email:', error)
    return { success: false, error }
  }
}

/**
 * Example 4: Handle contact form submission
 */
export async function handleContactFormSubmission(data: {
  name: string
  email: string
  message: string
}) {
  try {
    await sendContactFormEmail({
      to: 'admin@andersonproperties.com', // Your admin email
      subject: 'New Contact Form Submission',
      name: data.name,
      email: data.email,
      message: data.message,
    })

    console.log('Contact form email sent successfully')
    return { success: true }
  } catch (error) {
    console.error('Failed to send contact form email:', error)
    return { success: false, error }
  }
}

/**
 * Example 5: Send property inquiry email
 */
export async function sendPropertyInquiry(data: {
  propertyId: string
  propertyTitle: string
  inquirerName: string
  inquirerEmail: string
  inquirerPhone?: string
  message: string
}) {
  try {
    const htmlContent = `
      <h2>New Property Inquiry</h2>
      <p><strong>Property:</strong> ${data.propertyTitle} (ID: ${data.propertyId})</p>
      <hr>
      <p><strong>From:</strong> ${data.inquirerName}</p>
      <p><strong>Email:</strong> ${data.inquirerEmail}</p>
      ${data.inquirerPhone ? `<p><strong>Phone:</strong> ${data.inquirerPhone}</p>` : ''}
      <hr>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `

    await sendCustomEmail({
      to: 'properties@andersonproperties.com',
      subject: `Property Inquiry: ${data.propertyTitle}`,
      html: htmlContent,
      text: `
Property: ${data.propertyTitle} (ID: ${data.propertyId})
From: ${data.inquirerName}
Email: ${data.inquirerEmail}
${data.inquirerPhone ? `Phone: ${data.inquirerPhone}` : ''}

Message:
${data.message}
      `,
    })

    console.log('Property inquiry email sent successfully')
    return { success: true }
  } catch (error) {
    console.error('Failed to send property inquiry email:', error)
    return { success: false, error }
  }
}

/**
 * Example 6: Send notification to multiple recipients
 */
export async function sendBulkNotification(recipients: string[], subject: string, message: string) {
  try {
    await sendCustomEmail({
      to: recipients,
      subject,
      html: `<p>${message}</p>`,
      text: message,
    })

    console.log(`Notification sent to ${recipients.length} recipients`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send bulk notification:', error)
    return { success: false, error }
  }
}

/**
 * Example 7: Send email with attachment
 */
export async function sendEmailWithAttachment(
  to: string,
  subject: string,
  message: string,
  attachmentPath: string,
  attachmentName: string,
) {
  try {
    await sendCustomEmail({
      to,
      subject,
      html: `<p>${message}</p>`,
      text: message,
      attachments: [
        {
          filename: attachmentName,
          path: attachmentPath,
        },
      ],
    })

    console.log(`Email with attachment sent to ${to}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send email with attachment:', error)
    return { success: false, error }
  }
}

/**
 * Example 8: Send test email to verify configuration
 */
export async function testEmailConfiguration(recipientEmail: string) {
  try {
    await sendTestEmail(recipientEmail)
    console.log(`Test email sent to ${recipientEmail}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send test email:', error)
    return { success: false, error }
  }
}

/**
 * Example 9: Integrate with PayloadCMS hooks
 *
 * You can use this in your PayloadCMS collection hooks:
 *
 * // In your Users collection:
 * {
 *   hooks: {
 *     afterChange: [
 *       async ({ doc, operation }) => {
 *         if (operation === 'create' && doc.email) {
 *           const token = generateVerificationToken(doc.id)
 *           await handleUserRegistration(doc.email, token)
 *         }
 *       }
 *     ]
 *   }
 * }
 */

/**
 * Example 10: Error handling and retry logic
 */
export async function sendEmailWithRetry(emailFunction: () => Promise<void>, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await emailFunction()
      console.log(`Email sent successfully on attempt ${attempt}`)
      return { success: true, attempt }
    } catch (error) {
      console.error(`Email attempt ${attempt} failed:`, error)

      if (attempt === maxRetries) {
        console.error('All email attempts failed')
        return { success: false, error, attempts: maxRetries }
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}
