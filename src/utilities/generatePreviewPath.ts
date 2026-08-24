import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  // Allow empty strings, e.g. for the homepage
  if (slug === undefined || slug === null) {
    return null
  }

  // Encode to support slugs with special characters
  let encodedSlug = encodeURIComponent(slug)
  encodedSlug = encodedSlug.replace(/%2F/gi, '/')

  // Resolve the active locale with the following priority:
  //   1. `?locale=xx` query param from the admin panel URL (most explicit)
  //   2. req.locale set by Payload's middleware
  //   3. The config's defaultLocale as a final fallback

  // console.log('req.locale', req.locale)

  // const configDefaultLocale = req.payload?.config?.localization
  //   ? (req.payload.config.localization as { defaultLocale: string }).defaultLocale
  //   : undefined

  // const localeFromSearchParams = req.searchParams?.get?.('locale') ?? null

  const localePrefix = `/${req.locale}`

  // console.log('localePrefix', localePrefix)
  // console.log('req.searchParams', req.searchParams)
  // console.log(
  //   '${collectionPrefixMap[collection]}/${encodedSlug}',
  //   `${collectionPrefixMap[collection]}/${encodedSlug}`,
  // )

  const path = `${localePrefix}${collectionPrefixMap[collection]}/${encodedSlug}`

  const encodedParams = new URLSearchParams({
    slug: encodedSlug,
    collection,
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
