import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/(payload)/email'

/**
 * POST /api/send-email
 *
 * Example API route for sending contact form emails
 *
 * Request body:
 * {
 *   name: string
 *   email: string
 *   subject?: string
 *   message: string
 * }
 */
interface ContactFormBody {
  name: string
  email: string
  subject?: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormBody
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Send email
    await sendContactFormEmail({
      to: process.env.SMTP_FROM_EMAIL || 'admin@andersonproperties.com',
      subject: subject || 'New Contact Form Submission',
      name,
      email,
      message,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Email sending error:', error)

    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

/**
 * GET /api/send-email/test
 *
 * Test endpoint to verify email configuration
 */
export async function GET() {
  try {
    const { verifyEmailConnection } = await import('@/(payload)/email')
    const isConnected = await verifyEmailConnection()

    return NextResponse.json({
      success: isConnected,
      message: isConnected
        ? 'Email configuration is working correctly'
        : 'Email configuration failed verification',
    })
  } catch (error) {
    console.error('Email verification error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to verify email configuration',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
