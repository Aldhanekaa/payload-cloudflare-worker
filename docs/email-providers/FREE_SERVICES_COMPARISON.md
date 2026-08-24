# Free Email Services Comparison

Complete guide to free email services you can use with Nodemailer.

## Quick Reference

| Service           | Free/Day  | Free/Month | Setup Difficulty | Best For      |
| ----------------- | --------- | ---------- | ---------------- | ------------- |
| **Brevo**         | 300       | 9,000      | ⭐⭐ Easy        | Production    |
| **Gmail**         | 500       | ~15,000    | ⭐ Very Easy     | Development   |
| **SendGrid**      | 100       | 3,000      | ⭐⭐ Easy        | Enterprise    |
| **Mailgun**       | ~33       | 1,000      | ⭐⭐⭐ Medium    | API-first     |
| **Resend**        | 100       | 3,000      | ⭐⭐ Easy        | Modern dev    |
| **Elastic Email** | 100       | 3,000      | ⭐⭐ Easy        | Simple needs  |
| **Zoho Mail**     | Unlimited | Unlimited  | ⭐⭐⭐ Medium    | Custom domain |

---

## 1. Brevo (Sendinblue) ⭐ RECOMMENDED

### Configuration

```env
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-smtp-key
```

### Pros

✅ Best free tier (300/day, 9,000/month)
✅ Email analytics and tracking
✅ Template builder included
✅ Good deliverability
✅ Marketing tools included

### Cons

❌ Branding on emails (free tier)
❌ Requires account verification

### Setup Guide

See [BREVO_SETUP.md](./BREVO_SETUP.md)

---

## 2. Gmail

### Configuration

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Pros

✅ Highest free limit (500/day)
✅ Very easy setup
✅ Extremely reliable
✅ No verification needed

### Cons

❌ Requires App Password (2FA)
❌ Not recommended for production
❌ Risk of account restrictions

### Setup Steps

1. Enable 2-Factor Authentication
2. Visit: https://myaccount.google.com/apppasswords
3. Create app password for "Mail"
4. Use that password in SMTP_PASS

---

## 3. SendGrid

### Configuration

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Pros

✅ Industry standard
✅ Excellent documentation
✅ Advanced analytics
✅ Email validation tools
✅ High deliverability

### Cons

❌ Lower free tier (100/day)
❌ Requires phone verification

### Setup Steps

1. Sign up at https://sendgrid.com/
2. Verify email and phone
3. Create API Key (Settings → API Keys)
4. Give "Mail Send" permission
5. Username is literally "apikey"

---

## 4. Mailgun

### Configuration

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@sandboxXXX.mailgun.org
SMTP_PASS=your-password
```

### Pros

✅ 5,000 emails first 3 months
✅ Powerful API
✅ Detailed logs
✅ Email validation

### Cons

❌ Only 1,000/month after trial
❌ Requires domain verification
❌ Sandbox has limitations

### Setup Steps

1. Sign up at https://www.mailgun.com/
2. Use sandbox domain for testing
3. Get SMTP credentials from dashboard
4. Verify custom domain for production

---

## 5. Resend

### Configuration

```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=resend
SMTP_PASS=re_your_api_key
```

### Pros

✅ Modern developer experience
✅ React Email support
✅ Clean API
✅ Good documentation

### Cons

❌ Relatively new
❌ Requires domain verification
❌ 100 emails/day limit

### Setup Steps

1. Sign up at https://resend.com/
2. Get API key from dashboard
3. Username is "resend"
4. Password is API key

---

## 6. Elastic Email

### Configuration

```env
SMTP_HOST=smtp.elasticemail.com
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-smtp-password
```

### Pros

✅ Easy setup
✅ Good deliverability
✅ 100 emails/day free

### Cons

❌ Limited free tier
❌ Less known

### Setup Steps

1. Sign up at https://elasticemail.com/
2. Create SMTP credentials
3. Use alternate port 2525

---

## 7. Zoho Mail

### Configuration

```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
```

### Pros

✅ Free custom domain email
✅ Up to 5 users
✅ Professional email service
✅ Unlimited sending

### Cons

❌ Requires custom domain
❌ More complex setup
❌ Daily sending limits per account

### Setup Steps

1. Sign up at https://www.zoho.com/mail/
2. Add and verify your domain
3. Create email accounts
4. Use account credentials

---

## My Recommendations

### For Development/Testing

**Use: Gmail**

- Quick setup
- High daily limit
- Perfect for development

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yourdev@gmail.com
SMTP_PASS=app-password
```

### For Production (Startup/MVP)

**Use: Brevo**

- Best free tier
- Professional features
- Good deliverability

```env
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=smtp-key
```

### For Established Business

**Use: SendGrid (paid plan)**

- Industry standard
- Best deliverability
- Advanced features

### For API-Heavy Apps

**Use: Mailgun**

- Powerful API
- Great for automated emails
- Detailed analytics

---

## Switching Between Services

Your Nodemailer setup supports all these services. Just change your `.env`:

```env
# Service 1 (Active)
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=key1

# Service 2 (Backup - commented out)
# SMTP_HOST=smtp.sendgrid.net
# SMTP_PORT=587
# SMTP_USER=apikey
# SMTP_PASS=key2
```

## Testing Multiple Services

Create different env files:

```bash
# .env.brevo
SMTP_HOST=smtp-relay.brevo.com
...

# .env.sendgrid
SMTP_HOST=smtp.sendgrid.net
...

# Test with specific service
npm run test:email -- --env=brevo
```

---

## Cost Comparison (When You Need to Scale)

| Service  | Free | Paid Start | 50k emails/mo | 100k emails/mo |
| -------- | ---- | ---------- | ------------- | -------------- |
| Brevo    | 9k   | $25        | $59           | $99            |
| SendGrid | 3k   | $15        | $60           | $90            |
| Mailgun  | 1k   | $35        | $80           | $90            |
| Resend   | 3k   | $20        | $70           | $120           |
| AWS SES  | -    | Pay-as-go  | ~$5           | ~$10           |

---

## Need Help?

See detailed setup guides:

- [Brevo Setup Guide](./BREVO_SETUP.md)
- [General Email Documentation](<../../src/(payload)/email/README.md>)

---

**Quick Start:** For most users, I recommend starting with **Brevo** for production or **Gmail** for development.
