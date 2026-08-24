import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

import JoinUrl from './joinUrl'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl =
      image && typeof image === 'object' && 'sizes' in image && image.sizes && typeof image.sizes === 'object' && 'og' in image.sizes && image.sizes.og && typeof image.sizes.og === 'object' && 'url' in image.sizes.og
        ? image.sizes.og.url
        : undefined

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  locale?: string
  urlOverride?: string
}): Promise<Metadata> => {
  const { doc, locale = 'en', urlOverride } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Indonesia FIRST Robotik Foundation'
    : 'Indonesia FIRST Robotik Foundation'

  const docUrl = urlOverride || (Array.isArray(doc?.slug) ? doc?.slug.join('/') : (doc?.slug || '/'))
  const finalUrl = docUrl.startsWith('/') ? docUrl : `/${docUrl}`

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: JoinUrl(`/${locale}${finalUrl === '/' ? '' : finalUrl}`),
    }),
    title,
    alternates: {
      canonical: JoinUrl(`/${locale}${finalUrl === '/' ? '' : finalUrl}`),
      languages: {
        en: JoinUrl(`/en${finalUrl === '/' ? '' : finalUrl}`),
        id: JoinUrl(`/id${finalUrl === '/' ? '' : finalUrl}`),
      },
    },
  }
}
