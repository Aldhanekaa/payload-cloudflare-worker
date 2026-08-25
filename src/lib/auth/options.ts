import type { BetterAuthOptions, PayloadAuthOptions } from 'payload-auth/better-auth'
import { admin, twoFactor } from 'better-auth/plugins'
import { nextCookies } from 'better-auth/next-js'

export const betterAuthOptions = {
  appName: 'my-app',
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  trustedOrigins: [process.env.NEXT_PUBLIC_BETTER_AUTH_URL!],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword({ user, url }) {
      console.log('Reset password for', user.email, url)
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      console.log('Verify email for', user.email, url)
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [admin(), twoFactor(), nextCookies()],
} satisfies BetterAuthOptions

export const payloadAuthOptions = {
  users: {
    slug: 'users',
    roles: ['user', 'admin'],
    adminRoles: ['admin'],
    defaultRole: 'user',
    allowedFields: ['name'],
  },
  betterAuthOptions,
} satisfies PayloadAuthOptions

export type PayloadAuthConfig = typeof payloadAuthOptions
