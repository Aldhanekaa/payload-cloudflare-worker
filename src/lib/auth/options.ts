import type { BetterAuthOptions, PayloadAuthOptions } from 'payload-auth/better-auth'
import { admin } from 'better-auth/plugins'
import { nextCookies } from 'better-auth/next-js'

export const betterAuthOptions = {
  appName: 'my-app',
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  trustedOrigins: [process.env.NEXT_PUBLIC_BETTER_AUTH_URL!],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    async sendResetPassword({ user, url }) {
      console.log('Reset password for', user.email, url)
    },
  },
  // emailVerification: {
  //   sendOnSignUp: true,
  //   autoSignInAfterVerification: true,
  //   async sendVerificationEmail({ user, url }) {
  //     console.log('Verify email for', user.email, url)
  //   },
  // },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [admin() as any, nextCookies() as any],
} satisfies BetterAuthOptions

export const payloadAuthOptions = {
  users: {
    slug: 'users',
    roles: ['user', 'admin'],
    adminRoles: ['admin'],
    defaultRole: 'user',
    allowedFields: ['name'],
  },
  adminInvitations: {
    async sendInviteEmail({ payload, email, url }) {
      try {
        await payload.sendEmail({
          to: email,
          subject: 'You have been invited to the admin panel',
          html: `<a href="${url}">Accept your invitation</a>`,
        })
        return { success: true }
      } catch (error) {
        return { success: false, message: 'Could not send invitation email' }
      }
    },
  },

  betterAuthOptions,
} satisfies PayloadAuthOptions

export type PayloadAuthConfig = typeof payloadAuthOptions
