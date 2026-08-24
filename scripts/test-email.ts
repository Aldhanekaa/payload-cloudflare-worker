/**
 * Email Configuration Test Script
 *
 * This script helps you test your email configuration.
 * Run with: npx tsx scripts/test-email.ts
 */

import { verifyEmailConnection, sendTestEmail } from '../src/(payload)/email'

async function testEmailConfiguration() {
  console.log('🔧 Testing Email Configuration...\n')

  // Check if required environment variables are set
  console.log('1. Checking environment variables...')
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS']
  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    console.error('Missing environment variables:', missingVars.join(', '))
    console.error('\nPlease set these variables in your .env file')
    console.error('See .env.example for reference')
    process.exit(1)
  }
  console.log('All required environment variables are set\n')

  // Display current configuration (without sensitive data)
  console.log('2. Current SMTP Configuration:')
  console.log('   Host:', process.env.SMTP_HOST)
  console.log('   Port:', process.env.SMTP_PORT)
  console.log('   Secure:', process.env.SMTP_SECURE)
  console.log('   User:', process.env.SMTP_USER)
  console.log('   From Email:', process.env.SMTP_FROM_EMAIL)
  console.log('   From Name:', process.env.SMTP_FROM_NAME)
  console.log()

  // Verify connection
  console.log('3. Verifying SMTP connection...')
  const isConnected = await verifyEmailConnection()

  if (!isConnected) {
    console.error('Failed to connect to SMTP server')
    console.error('\nTroubleshooting tips:')
    console.error('  - Check your SMTP credentials')
    console.error('  - Verify firewall/network settings')
    console.error("  - For Gmail, ensure you're using an App Password")
    console.error('  - Try different ports (587, 465, 25)')
    process.exit(1)
  }
  console.log('Successfully connected to SMTP server\n')

  // Ask if user wants to send a test email
  const args = process.argv.slice(2)
  const testEmailAddress = args[0] || process.env.SMTP_USER

  if (!testEmailAddress) {
    console.log(' No test email address provided')
    console.log('Usage: npx tsx scripts/test-email.ts your-email@example.com')
    process.exit(0)
  }

  console.log(`4. Sending test email to ${testEmailAddress}...`)
  try {
    await sendTestEmail(testEmailAddress)
    console.log(' Test email sent successfully!\n')
    console.log('Check your inbox (and spam folder) for the test email')
    console.log('Email configuration is working correctly!')
  } catch (error) {
    console.error(' Failed to send test email')
    console.error('Error:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// Run the test
testEmailConfiguration().catch((error) => {
  console.error('Unexpected error:', error)
  process.exit(1)
})
