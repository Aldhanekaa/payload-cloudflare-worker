import fs from 'fs'
import path from 'path'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
// import { GetPlatformProxyOptions } from 'wrangler'
// import { r2Storage } from '@payloadcms/storage-r2'

import { Categories } from './(payload)/collections/Categories'

import { Pages } from './(payload)/collections/Pages'
import { Posts } from './(payload)/collections/Posts'

import { Users } from './(payload)/collections/Users'
import { Media } from './(payload)/collections/Media'
import { Properties } from './(payload)/collections/Properties'
import { PropertyTypes } from './(payload)/collections/PropertyTypes'
import { PropertyCategories } from './(payload)/collections/PropertyCategories'
import { Cities } from './(payload)/collections/Cities'
import { Portfolios } from './(payload)/collections/Portfolios'
import { Testimonials } from './(payload)/collections/Testimonials'
import { s3Storage } from '@payloadcms/storage-s3'

import { plugins } from '@/(payload)/plugins'
import { nodemailerAdapter } from '@/(payload)/email/adapter'
// import migrations from './db/migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)

const isCLI = process.argv.some((value) => realpath(value).endsWith(path.join('payload', 'bin.js')))
const isProduction = process.env.NODE_ENV === 'production'

const createLog =
  (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === 'string') {
      fn(JSON.stringify({ level, msg: objOrMsg }))
    } else {
      fn(JSON.stringify({ level, ...objOrMsg, msg: msg ?? (objOrMsg as { msg?: string }).msg }))
    }
  }

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || 'info',
  trace: createLog('trace', console.debug),
  debug: createLog('debug', console.debug),
  info: createLog('info', console.log),
  warn: createLog('warn', console.warn),
  error: createLog('error', console.error),
  fatal: createLog('fatal', console.error),
  silent: () => {},
} as any // Use PayloadLogger type when it's exported

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

// console.log('cloudflare', cloudflare)
// console.log('isCLI || !isProduction', isCLI || !isProduction)

export default buildConfig({
  // ...
  localization: {
    locales: ['en', 'id'], // required
    defaultLocale: 'id', // required
    fallback: true,
  },
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      // Graphics
      graphics: {
        Logo: '@/components/(payload)/Logo',
        Icon: '@/components/(payload)/Icon',
      },
      // Navigation
      beforeNavLinks: ['@/components/(payload)/BeforeNavLinks'],
      afterNavLinks: ['@/components/(payload)/AfterNavLinks'],
      // Dashboard
      beforeDashboard: ['@/components/(payload)/BeforeDashboard'],
      afterDashboard: ['@/components/(payload)/AfterDashboard'],
      // Login
      beforeLogin: ['@/components/(payload)/BeforeLogin'],
      afterLogin: ['@/components/(payload)/AfterLogin'],
      // Header
      header: ['@/components/(payload)/Header'],
      // Actions
      actions: ['@/components/(payload)/Actions'],
      // Settings Menu
      settingsMenu: [
        '@/components/(payload)/SettingsMenu#SettingsMenu',
        '@/components/(payload)/SettingsMenu#SystemActions',
      ],
      // Logout
      logout: {
        Button: '@/components/(payload)/LogoutButton',
      },
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Posts,
    Pages,
    Properties,
    PropertyTypes,
    PropertyCategories,
    Cities,
    Portfolios,
    Testimonials,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,
  }),
  logger: isProduction ? cloudflareLogger : undefined,
  email: nodemailerAdapter,
  plugins: [
    ...plugins,
    s3Storage({
      collections: {
        media: true,
      },
      bucket: 'payloadcms-cf-worker-template',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION, // asia pacific
        // region: process.env.S3_REGION,

        // ... Other S3 configuration
      },
    }),
    // r2Storage({
    //   bucket: cloudflare.env.R2,
    //   collections: { media: true },
    // }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: false,
        // remoteBindings: process.env.REMOTE_BINDINGS !== 'false',
      }),
  )
}
