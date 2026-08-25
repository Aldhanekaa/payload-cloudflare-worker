// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from '@opennextjs/cloudflare/config'

const baseConfig = defineCloudflareConfig({})

export default {
  ...baseConfig,
  build: {
    externals: [
      'drizzle-kit*',
      'jose',
      'pg-cloudflare',
      'jsdom',
      'undici',
      'cssstyle',
      'css-tree',
      'sharp',
      '@img/sharp-darwin-arm64',
      '@img/sharp-wasm32',
      '*.node',
    ],
  },
  edgeExternals: [
    ...(baseConfig.edgeExternals || []),
    'drizzle-kit*',
    'jose',
    'pg-cloudflare',
    'jsdom',
    'undici',
    'cssstyle',
    'css-tree',
    'sharp',
    '@img/sharp-darwin-arm64',
    '@img/sharp-wasm32',
    '*.node',
  ],
}
