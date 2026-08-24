import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

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
  serverExternalPackages: ['jose', 'pg-cloudflare'],

  // Your Next.js config here
  webpack: (webpackConfig: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  redirects,
}

export default withNextIntl(withPayload(nextConfig, { devBundleServerPackages: false }))
