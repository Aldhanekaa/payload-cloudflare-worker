import type { Metadata } from 'next'
import type { Page, Post } from '../payload-types'
import { generateLocalizedMeta } from './generateLocalizedMeta'

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  locale?: string
  urlOverride?: string
}): Promise<Metadata> => {
  const { doc, locale = 'en', urlOverride } = args

  const title = doc?.meta?.title || doc?.title
  const description = doc?.meta?.description || undefined
  const image = doc?.meta?.image || null

  const docUrl = urlOverride || (Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug || '')
  const path = docUrl === 'home' || !docUrl ? '' : docUrl.startsWith('/') ? docUrl : `/${docUrl}`

  return generateLocalizedMeta({
    title,
    description,
    path,
    locale,
    image,
    type: doc && 'publishedAt' in doc ? 'article' : 'website',
    publishedTime: doc && 'publishedAt' in doc && doc.publishedAt ? doc.publishedAt : undefined,
  })
}
