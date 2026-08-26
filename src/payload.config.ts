import fs from 'fs'
import path from 'path'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
// import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'

import { Categories } from './(payload)/collections/Categories'
import { Pages } from './(payload)/collections/Pages'
import { Posts } from './(payload)/collections/Posts'
import { Users } from './(payload)/collections/Users'
import { Media } from './(payload)/collections/Media'
import { Properties } from './(payload)/collections/Properties'
import { PropertyTypes } from './(payload)/collections/PropertyTypes'
import { PropertyCategories } from './(payload)/collections/PropertyCategories'
import { PortfolioCategories } from './(payload)/collections/PortfolioCategories'
import { Cities } from './(payload)/collections/Cities'
import { Portfolios } from './(payload)/collections/Portfolios'
import { Testimonials } from './(payload)/collections/Testimonials'

// import sharp from 'sharp' // NOT SUPPORTED ON CF WORKER

import { plugins } from '@/(payload)/plugins'
import { nodemailerAdapter } from '@/(payload)/email/adapter'
import { GlobalSettings } from '@/(payload)/globals/Global_Settings'
// import { migrations } from './migrations'

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

const isBuild =
  process.env.NEXT_PHASE === 'phase-production-build' ||
  process.argv.some((value) => value.includes('build'))

const hasGlobalCloudflareContext =
  typeof (globalThis as any)[Symbol.for('__cloudflare-context__')] !== 'undefined'

const cloudflare =
  isCLI || !isProduction || isBuild || !hasGlobalCloudflareContext
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

// console.log('cloudflare', cloudflare)
// console.log('isCLI || !isProduction', isCLI || !isProduction)

export default buildConfig({
  // sharp,
  graphQL: {
    disable: false,
  },
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
      // settingsMenu: [
      //   '@/components/(payload)/SettingsMenu#SettingsMenu',
      //   '@/components/(payload)/SettingsMenu#SystemActions',
      // ],
      // Logout
      // logout: {
      //   Button: '@/components/(payload)/LogoutButton',
      // },
    },
    meta: {
      titleSuffix: '- Andersen Properties',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.ico',
        },
      ],
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
    PortfolioCategories,
    Cities,
    Portfolios,
    Testimonials,
  ],
  globals: [GlobalSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,
    // prodMigrations: migrations as any,
  }),
  logger: isProduction ? cloudflareLogger : undefined,
  email: nodemailerAdapter,
  plugins: [
    ...plugins,
    // s3Storage({
    //   collections: {
    //     media: true,
    //   },
    //   bucket: 'payloadcms-cf-worker-template',
    //   config: {
    //     credentials: {
    //       accessKeyId: process.env.S3_ACCESS_KEY_ID,
    //       secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    //     },
    //     endpoint: process.env.S3_ENDPOINT,
    //     region: process.env.S3_REGION, // asia pacific
    //     // region: process.env.S3_REGION,

    //     // ... Other S3 configuration
    //   },
    // }),
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(retries = 5, delay = 300): Promise<CloudflareContext> {
  const global = globalThis as any
  if (global.__cloudflareContextPromise) {
    return global.__cloudflareContextPromise
  }
  global.__cloudflareContextPromise = (async () => {
    const isBuild =
      process.env.NEXT_PHASE === 'phase-production-build' ||
      process.argv.some((value) => value.includes('build'))
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const { getPlatformProxy } = await import(
          /* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`
        )
        const isRemote =
          process.env.CLOUDFLARE_REMOTE === 'true' || process.env.REMOTE_BINDINGS === 'true'
        return await getPlatformProxy({
          environment: process.env.CLOUDFLARE_ENV,
          remoteBindings: isRemote,
          ...(isBuild ? { persist: false } : {}),
        })
      } catch (err: any) {
        const isSqliteBusy =
          err?.message?.includes('SQLITE_BUSY') ||
          err?.stack?.includes('SQLITE_BUSY') ||
          String(err).includes('database is locked')
        if (isSqliteBusy && attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delay * attempt))
          continue
        }
        global.__cloudflareContextPromise = undefined
        throw err
      }
    }
    throw new Error('Failed to acquire Cloudflare context from Wrangler after retries')
  })()
  return global.__cloudflareContextPromise
}
