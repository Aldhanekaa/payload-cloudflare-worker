# Email Configuration with Nodemailer

This directory contains the email configuration and templates for the Anderson Properties PayloadCMS project.

## Setup

### 1. Install Dependencies

The required packages are already installed:

- `nodemailer` - Email sending library
- `@types/nodemailer` - TypeScript types

### 2. Environment Variables

Add the following environment variables to your `.env` file:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=noreply@andersonproperties.com
SMTP_FROM_NAME=Anderson Properties
```

### 3. Popular SMTP Providers

#### Gmail

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Generate from Google Account Security
```

#### Outlook/Office 365

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

#### SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

#### Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-user
SMTP_PASS=your-mailgun-password
```

#### AWS SES

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-aws-smtp-username
SMTP_PASS=your-aws-smtp-password
```

## Usage

### Basic Email Sending

```typescript
import { sendCustomEmail } from '@/(payload)/email'

await sendCustomEmail({
  to: 'recipient@example.com',
  subject: 'Welcome!',
  html: '<p>Welcome to Anderson Properties!</p>',
  text: 'Welcome to Anderson Properties!',
})
```

### Using Email Templates

#### Send Verification Email

```typescript
import { sendVerificationEmail } from '@/(payload)/email'

await sendVerificationEmail('user@example.com', 'verification-token-here', 'https://yoursite.com')
```

#### Send Password Reset Email

```typescript
import { sendPasswordResetEmail } from '@/(payload)/email'

await sendPasswordResetEmail('user@example.com', 'reset-token-here', 'https://yoursite.com')
```

#### Send Contact Form Email

```typescript
import { sendContactFormEmail } from '@/(payload)/email'

await sendContactFormEmail({
  to: 'admin@andersonproperties.com',
  subject: 'New Contact Form Submission',
  name: 'John Doe',
  email: 'john@example.com',
  message: 'I am interested in property XYZ...',
})
```

### Testing Email Configuration

```typescript
import { verifyEmailConnection, sendTestEmail } from '@/(payload)/email'

// Verify connection
const isConnected = await verifyEmailConnection()

// Send test email
if (isConnected) {
  await sendTestEmail('your-email@example.com')
}
```

## File Structure

```
src/(payload)/email/
├── index.ts           # Main exports
├── nodemailer.ts      # Nodemailer configuration
├── templates.ts       # Email templates
└── README.md          # This file
```

## Integration with PayloadCMS

The email configuration is automatically integrated into PayloadCMS through `payload.config.ts`. PayloadCMS will use this configuration for:

- User verification emails
- Password reset emails
- Admin notifications

## Custom Email Templates

To create a new email template, add a function to `templates.ts`:

```typescript
export const sendPropertyInquiryEmail = async (data: {
  to: string
  propertyName: string
  inquirerName: string
  inquirerEmail: string
  message: string
}): Promise<void> => {
  const mailOptions: SendMailOptions = {
    from: \`\${emailConfig.fromName} <\${emailConfig.from}>\`,
    to: data.to,
    subject: \`Property Inquiry: \${data.propertyName}\`,
    html: \`
      <!-- Your custom HTML template -->
    \`,
  }

  const transporter = getTransporter()
  await transporter.sendMail(mailOptions)
}
```

## Security Notes

1. **Never commit `.env` files** with real credentials
2. Use **app-specific passwords** for Gmail (not your main password)
3. For production, use **dedicated email services** (SendGrid, Mailgun, AWS SES)
4. Enable **2FA** on your email accounts
5. Regularly **rotate** SMTP credentials

## Troubleshooting

### Gmail "Less Secure Apps" Error

Use an **App Password** instead of your regular password:

1. Enable 2-Step Verification on your Google Account
2. Go to Security > App passwords
3. Generate a new app password for "Mail"

### Connection Timeout

- Check firewall settings
- Verify SMTP host and port
- Try different ports (587, 465, 25)

### Authentication Failed

- Verify credentials are correct
- Check if account requires app-specific passwords
- Ensure account is not locked or restricted

## API Routes Example

Create an API route for sending emails:

```typescript
// src/app/api/send-email/route.ts
import { sendContactFormEmail } from '@/(payload)/email'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    await sendContactFormEmail({
      to: 'admin@andersonproperties.com',
      subject: 'New Contact Form Submission',
      name: data.name,
      email: data.email,
      message: data.message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
```

## Support

For issues or questions:

1. Check Nodemailer documentation: https://nodemailer.com/
2. Review SMTP provider documentation
3. Check PayloadCMS email documentation: https://payloadcms.com/docs/email/overview
