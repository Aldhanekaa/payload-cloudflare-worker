import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/i18n/request.ts',
})

import redirectsImport from './redirects.js'

const redirects = redirectsImport as () => Promise<any>

const nextConfig: NextConfig = {
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
  // Packages with Cloudflare Workers (workerd) specific code
  // Read more: https://opennext.js.org/cloudflare/howtos/workerd
  serverExternalPackages: [
    'jose',
    'pg-cloudflare',
    'drizzle-kit',
    'drizzle-kit-e722632bd56cd1a1/api',
    'drizzle-kit-*/api',
  ],

  // Your Next.js config here
  webpack: (webpackConfig: any, { isServer }: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Ignore drizzle-kit in production builds (it's a dev-only tool)
    if (isServer) {
      // Alias drizzle-kit and all its subpaths to an empty stub
      webpackConfig.resolve.alias = webpackConfig.resolve.alias || {}
      webpackConfig.resolve.alias['drizzle-kit'] = path.resolve('./stubs/drizzle-kit.js')
      webpackConfig.resolve.alias['drizzle-kit/api'] = path.resolve('./stubs/drizzle-kit.js')

      webpackConfig.externals = webpackConfig.externals || []
      // Mark drizzle-kit as external - it should never be bundled
      webpackConfig.externals.push(
        'drizzle-kit',
        'drizzle-kit/api',
        /^drizzle-kit\/.*/,
        /^drizzle-kit-.*\/api$/,
      )
    }

    return webpackConfig
  },
  redirects,
}

export default withNextIntl(withPayload(nextConfig, { devBundleServerPackages: false }))
