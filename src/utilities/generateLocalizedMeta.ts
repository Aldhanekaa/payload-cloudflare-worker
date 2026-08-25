import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import { getServerSideURL } from './getURL'
import JoinUrl from './joinUrl'
import localization from '@/i18n/localization'

export type GenerateLocalizedMetaOptions = {
  title?: string
  description?: string
  keywords?: string[] | string
  path?: string // Route path, e.g. '', '/about', '/services', '/active-listings/villa-seminyak'
  locale?: string
  image?: number | string | Media | null
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  noIndex?: boolean
}

const DEFAULT_BRAND = 'Andersen Properties'

const getImageURL = (image?: number | string | Media | null): string => {
  const serverUrl = getServerSideURL()
  const fallbackUrl = `${serverUrl}/website-template-OG.webp`

  if (!image) return fallbackUrl

  if (typeof image === 'string') {
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image
    }
    return `${serverUrl}${image.startsWith('/') ? '' : '/'}${image}`
  }

  if (typeof image === 'object' && 'url' in image && image.url) {
    // Prefer og size if available
    const ogUrl =
      'sizes' in image &&
      image.sizes &&
      typeof image.sizes === 'object' &&
      'og' in image.sizes &&
      image.sizes.og &&
      typeof image.sizes.og === 'object' &&
      'url' in image.sizes.og &&
      image.sizes.og.url
        ? image.sizes.og.url
        : undefined

    const relativeUrl = ogUrl || image.url
    if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
      return relativeUrl
    }
    return `${serverUrl}${relativeUrl.startsWith('/') ? '' : '/'}${relativeUrl}`
  }

  return fallbackUrl
}

export function generateLocalizedMeta(options: GenerateLocalizedMetaOptions): Metadata {
  const {
    title,
    description,
    keywords,
    path = '',
    locale = localization.defaultLocale,
    image,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    noIndex = false,
  } = options

  const serverUrl = getServerSideURL()
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`

  // Format canonical & localized URLs
  const canonicalUrl = JoinUrl(`/${locale}${cleanPath}`)
  const enUrl = JoinUrl(`/en${cleanPath}`)
  const idUrl = JoinUrl(`/id${cleanPath}`)

  const formattedTitle = title
    ? title.includes(DEFAULT_BRAND)
      ? title
      : `${title} | ${DEFAULT_BRAND}`
    : `${DEFAULT_BRAND} | Exceptional Indonesian Real Estate`

  const ogImageUrl = getImageURL(image)

  const ogLocale = locale === 'id' ? 'id_ID' : 'en_US'
  const alternateOgLocale = locale === 'id' ? ['en_US'] : ['id_ID']

  const parsedKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords

  return {
    metadataBase: new URL(serverUrl),
    title: formattedTitle,
    description,
    keywords: parsedKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: enUrl,
        id: idUrl,
        'x-default': idUrl,
      },
    },
    openGraph: {
      title: formattedTitle,
      description: description || undefined,
      url: canonicalUrl,
      siteName: DEFAULT_BRAND,
      locale: ogLocale,
      alternateLocale: alternateOgLocale,
      type,
      publishedTime,
      modifiedTime,
      authors,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title || DEFAULT_BRAND,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description: description || undefined,
      images: [ogImageUrl],
      creator: '@andersenprop',
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  }
}
