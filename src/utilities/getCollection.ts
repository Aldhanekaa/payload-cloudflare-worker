import type { Config } from '@/payload-types'
import type { PaginatedDocs, TypeWithID, Where } from 'payload'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { LocaleCodes } from '@/i18n/localization'

type Collection = keyof Config['collections']

export interface FindCollectionOptions {
  collection: Collection
  depth?: number
  limit?: number
  page?: number
  sort?: string
  where?: Where
  select?: Record<string, boolean>
}

/**
 * Generates a stable, deterministic cache key from the query options.
 * Sorts object keys so that `{ a: 1, b: 2 }` and `{ b: 2, a: 1 }` produce
 * the same string.
 */
function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`
  }
  if (value !== null && typeof value === 'object') {
    const sorted = Object.keys(value as object)
      .sort()
      .map((k) => `${k}:${stableStringify((value as Record<string, unknown>)[k])}`)
    return `{${sorted.join(',')}}`
  }
  return String(value)
}

async function findCollection<C extends Collection>(
  options: FindCollectionOptions & { collection: C; draft?: boolean; overrideAccess?: boolean },
  locale: LocaleCodes,
): Promise<PaginatedDocs<Config['collections'][C] & TypeWithID>> {
  const payload = await getPayload({ config: configPromise })

  // We cast through `any` here solely to break the union-too-complex error.
  // TypeScript can't distribute payload.find()'s overloads across all collection
  // slugs at once; pinning to a concrete slug type restores safety at the call site
  // via the explicit return type annotation above.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (payload.find as any)({
    collection: options.collection,
    depth: options.depth ?? 0,
    limit: options.limit,
    page: options.page,
    sort: options.sort,
    where: options.where,
    overrideAccess: options.overrideAccess,
    draft: options.draft,
    locale: locale,
    select: options.select,
  }) as Promise<PaginatedDocs<Config['collections'][C] & TypeWithID>>
}

/**
 * Returns an `unstable_cache`-wrapped function that fetches a collection
 * with the supplied options.
 *
 * Cache tag: `collection_<slug>` — use this tag in collection hooks to
 * revalidate all cached queries for a given collection at once.
 *
 * The cache key also encodes the full query, so different queries are
 * cached independently.
 *
 * @example
 * const events = await getCachedCollection({
 *   collection: 'events',
 *   depth: 4,
 *   limit: 1,
 *   where: { event_slug: { equals: 'abc' } },
 * })()
 */
export const getCachedCollection = <C extends Collection>(
  options: FindCollectionOptions & { collection: C; draft?: boolean; overrideAccess?: boolean },
  locale: LocaleCodes,
) => {
  const { collection } = options
  const queryKey = stableStringify(options)

  // Skip cache in local development so changes are always reflected immediately
  if (process.env.NODE_ENV === 'development') {
    return () => findCollection(options, locale)
  }

  return unstable_cache(
    async () => findCollection(options, locale),
    // Cache key array — collection slug + stable query fingerprint
    [`collection_${collection}`, queryKey],
    {
      tags: [`collection_${collection}_${locale}`],
      revalidate: 60,
    },
  )
}
