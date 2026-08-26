import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/i18n/request.ts',
})

import redirectsImport from './redirects.js'

const redirects = redirectsImport as () => Promise<any>

const stubPath = path.resolve('./stubs/drizzle-kit.js')
const sharpStubPath = path.resolve('./stubs/sharp.js')

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      'drizzle-kit': './stubs/drizzle-kit.js',
      'drizzle-kit/api': './stubs/drizzle-kit.js',
      sharp: './stubs/sharp.js',
    },
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'drizzle-kit': stubPath,
      'drizzle-kit/api': stubPath,
      sharp: sharpStubPath,
    }

    // Mark Node.js-only modules as external for client bundles
    if (!isServer) {
      config.externals = config.externals || []
      config.externals.push({
        'fs/promises': 'commonjs fs/promises',
        fs: 'commonjs fs',
        net: 'commonjs net',
        tls: 'commonjs tls',
        dns: 'commonjs dns',
        readline: 'commonjs readline',
        module: 'commonjs module',
        worker_threads: 'commonjs worker_threads',
        // Server-only packages
        nodemailer: 'commonjs nodemailer',
        payload: 'commonjs payload',
        '@payloadcms/db-d1-sqlite': 'commonjs @payloadcms/db-d1-sqlite',
        '@payloadcms/drizzle': 'commonjs @payloadcms/drizzle',
      })
    }

    return config
  },
  images: {
    qualities: [100, 75],
    dangerouslyAllowLocalIP: true,

    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],

    remotePatterns: [
      // Dynamic patterns from environment
      ...[
        process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
        'http://localhost:3000',
        'http://192.168.18.26:3000',
        'http://127.0.0.1',
      ]
        .filter(Boolean)
        .map((item) => {
          const url = new URL(item)

          console.log('DATA', {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', ''),
          })

          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', '') as 'http' | 'https',
          }
        }),
      // Static patterns
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http' as const,
        hostname: 'localhost',
      },
      {
        protocol: 'https' as const,
        hostname: 'andersen.feroworks.com',
      },
    ],
  },
  experimental: {
    workerThreads: false,
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 1,
  },
  // Packages with Cloudflare Workers (workerd) specific code
  // Read more: https://opennext.js.org/cloudflare/howtos/workerd
  serverExternalPackages: [
    'sharp',
    // 'nodemailer',
    // '@payloadcms/db-d1-sqlite',
    // '@payloadcms/drizzle',
    // 'payload',
    // 'drizzle-orm',
    // 'drizzle-kit',
    // 'jose',
    // 'pg-cloudflare',
    // 'jsdom',
    // 'undici',
    // 'cssstyle',
    // 'csstools',
    // 'css-tree',
    // 'pino',
    // 'pino-pretty',
    // 'graphql', // If disabling GraphQL
  ],
  redirects,
}

const payloadConfig = withPayload(nextConfig, { devBundleServerPackages: false })
if (payloadConfig.serverExternalPackages) {
  payloadConfig.serverExternalPackages = payloadConfig.serverExternalPackages.filter(
    (pkg: string) => !pkg.includes('drizzle-kit'),
  )
}

export default withNextIntl(payloadConfig)
