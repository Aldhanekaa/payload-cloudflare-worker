import canUseDOM from './canUseDOM'

/**
 * Get the server-side URL for the application
 * Works with Cloudflare Workers by using NEXT_PUBLIC_SERVER_URL
 * or falling back to localhost for development
 */
export const getServerSideURL = () => {
  // Use explicit environment variable (set this in your Cloudflare Worker environment)
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }

  // Fallback to localhost for development
  return 'http://localhost:3000'
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}
