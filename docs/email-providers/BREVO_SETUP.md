# Brevo (Sendinblue) Setup Guide

Brevo offers the most generous free tier for email sending: **300 emails/day** (9,000/month).

## Step-by-Step Setup

### 1. Create Brevo Account

1. Go to https://www.brevo.com/
2. Click "Sign Up Free"
3. Complete registration and verify your email

### 2. Get SMTP Credentials

1. Log into your Brevo dashboard
2. Go to **Settings** (top right menu)
3. Click **SMTP & API**
4. Under "SMTP" section, you'll see your credentials
5. Click **Create a new SMTP key** if you don't have one

### 3. Configure Your .env File

```env
# Brevo SMTP Configuration
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-brevo-login-email@example.com
SMTP_PASS=your-smtp-key-here
SMTP_FROM_EMAIL=noreply@yourdomain.com
SMTP_FROM_NAME=Anderson Properties
```

**Important Notes:**

- `SMTP_USER` is your Brevo account email
- `SMTP_PASS` is the SMTP key (not your account password)
- `SMTP_FROM_EMAIL` should be verified in Brevo

### 4. Verify Sender Email

To avoid spam issues:

1. In Brevo dashboard, go to **Senders**
2. Click **Add a sender**
3. Add your sender email (e.g., noreply@yourdomain.com)
4. Verify the email through the confirmation link

### 5. Test Your Configuration

```bash
npm run test:email your-test-email@example.com
```

## Brevo Free Tier Limits

- ✅ 300 emails per day
- ✅ 9,000 emails per month
- ✅ Email tracking and analytics
- ✅ Email templates
- ✅ Transactional emails
- ✅ Contact management
- ❌ Brevo branding in emails (can be removed on paid plans)

## Alternative Ports

If port 587 doesn't work due to firewall:

```env
# Alternative port
SMTP_PORT=2525
```

## Production Best Practices

### 1. Use a Custom Domain

Instead of: `noreply@gmail.com`  
Use: `noreply@andersonproperties.com`

### 2. Set Up SPF and DKIM

In Brevo dashboard:

1. Go to **Senders** → **Domains**
2. Add your domain
3. Follow instructions to add DNS records:
   - SPF record
   - DKIM record
   - DMARC (optional but recommended)

### 3. Monitor Email Statistics

- Track opens, clicks, bounces
- Monitor deliverability
- Adjust content based on performance

## Upgrading When Needed

When you exceed 300 emails/day:

- **Lite Plan**: $25/month - 10,000 emails/month
- **Premium**: $65/month - 20,000 emails/month
- **Enterprise**: Custom pricing

## Common Issues

### Issue: "Sender not verified"

**Solution:** Verify your sender email in Brevo dashboard

### Issue: "Authentication failed"

**Solution:** Make sure you're using the SMTP key, not your account password

### Issue: "Connection refused"

**Solution:** Try port 2525 instead of 587

### Issue: Emails going to spam

**Solution:**

1. Verify sender domain
2. Set up SPF/DKIM records
3. Use a professional sender name and email
4. Don't use spammy content or excessive links

## Testing

Send a test email using Brevo:

```typescript
import { sendCustomEmail } from '@/(payload)/email'

await sendCustomEmail({
  to: 'test@example.com',
  subject: 'Test Email via Brevo',
  html: '<h1>Hello!</h1><p>This email is sent via Brevo SMTP.</p>',
  text: 'Hello! This email is sent via Brevo SMTP.',
})
```

## Support

- Brevo Documentation: https://developers.brevo.com/docs
- API Reference: https://developers.brevo.com/reference
- Support: Available in dashboard

---

**You're all set!** Brevo is now configured and ready to send up to 300 emails per day for free.
