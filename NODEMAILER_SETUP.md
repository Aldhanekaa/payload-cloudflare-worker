# Nodemailer Setup Complete ✅

## What Was Installed

- **nodemailer** - Core email sending library
- **@types/nodemailer** - TypeScript type definitions

## Files Created

### Core Email Files

1. **`src/(payload)/email/adapter.ts`** - PayloadCMS email adapter using Nodemailer
2. **`src/(payload)/email/nodemailer.ts`** - Nodemailer transporter configuration
3. **`src/(payload)/email/templates.ts`** - Pre-built email templates
4. **`src/(payload)/email/index.ts`** - Main exports
5. **`src/(payload)/email/examples.ts`** - Usage examples and patterns
6. **`src/(payload)/email/README.md`** - Comprehensive documentation

### API Routes

7. **`src/app/api/send-email/route.ts`** - Example API endpoint for sending emails

### Configuration Files Updated

8. **`.env.example`** - Added SMTP configuration variables
9. **`src/payload.config.ts`** - Integrated Nodemailer adapter

## Quick Start

### 1. Configure Environment Variables

Copy the new variables from `.env.example` to your `.env` file:

```bash
# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=noreply@andersonproperties.com
SMTP_FROM_NAME=Anderson Properties
```

### 2. Gmail Setup (Recommended for Development)

If using Gmail:

1. Enable 2-Factor Authentication on your Google account
2. Go to: https://myaccount.google.com/apppasswords
3. Generate an app password for "Mail"
4. Use that app password in `SMTP_PASS` (not your regular password)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=Anderson Properties
```

### 3. Test Your Configuration

You can test the email configuration using the API endpoint:

```bash
# Test connection
curl http://localhost:3000/api/send-email

# Send a test email
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Email",
    "message": "This is a test message"
  }'
```

### 4. Basic Usage in Your Code

```typescript
import { sendCustomEmail, sendContactFormEmail } from '@/(payload)/email'

// Send a simple email
await sendCustomEmail({
  to: 'recipient@example.com',
  subject: 'Hello!',
  html: '<h1>Welcome!</h1>',
  text: 'Welcome!',
})

// Send a contact form email
await sendContactFormEmail({
  to: 'admin@andersonproperties.com',
  subject: 'New Contact',
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello, I am interested...',
})
```

## Available Email Templates

The following pre-built templates are ready to use:

1. **`sendVerificationEmail`** - User email verification
2. **`sendPasswordResetEmail`** - Password reset requests
3. **`sendContactFormEmail`** - Contact form submissions
4. **`sendCustomEmail`** - Generic custom emails

See `src/(payload)/email/templates.ts` for full implementation details.

## PayloadCMS Integration

The Nodemailer adapter is automatically integrated into PayloadCMS. It will be used for:

- User account verification emails
- Password reset emails
- Admin notifications
- Any emails sent through Payload's email API

## Production Email Services

For production, consider using dedicated email services:

### SendGrid (Recommended)

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### AWS SES

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-aws-smtp-username
SMTP_PASS=your-aws-smtp-password
```

### Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-user
SMTP_PASS=your-mailgun-password
```

## Documentation

For more detailed information, see:

- **`src/(payload)/email/README.md`** - Comprehensive documentation
- **`src/(payload)/email/examples.ts`** - Usage examples
- **Nodemailer Docs**: https://nodemailer.com/
- **PayloadCMS Email Docs**: https://payloadcms.com/docs/email/overview

## Troubleshooting

### Common Issues

**Error: "Invalid login"**

- For Gmail, you need an App Password (not your regular password)
- Enable 2FA first, then generate an App Password

**Error: "Connection timeout"**

- Check firewall settings
- Try different ports (587, 465, 25)
- Verify SMTP host is correct

**Error: "Self-signed certificate"**

- Set `SMTP_SECURE=false` for port 587
- Set `SMTP_SECURE=true` for port 465

## Next Steps

1. Configure your SMTP settings in `.env`
2. Test the connection using the API endpoint
3. Review the examples in `src/(payload)/email/examples.ts`
4. Customize email templates in `src/(payload)/email/templates.ts`
5. Integrate email sending into your application logic

## Support

If you need help:

1. Check the README: `src/(payload)/email/README.md`
2. Review examples: `src/(payload)/email/examples.ts`
3. Consult Nodemailer docs: https://nodemailer.com/
4. Check PayloadCMS email docs: https://payloadcms.com/docs/email/overview

---

**Setup completed successfully!** 🎉

You're now ready to send emails from your Anderson Properties application.
