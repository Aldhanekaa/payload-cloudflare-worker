/**
 * Configuration for dummy data fallback behavior
 *
 * When enabled, pages will fall back to dummy data if no data is found in the CMS.
 * This is useful during development or migration phases.
 *
 * Set to false in production once all data is migrated to CMS.
 */
export const ENABLE_DUMMY_FALLBACK = {
  portfolios: true,
  properties: true,
  posts: true,
} as const

export type FallbackConfig = typeof ENABLE_DUMMY_FALLBACK
