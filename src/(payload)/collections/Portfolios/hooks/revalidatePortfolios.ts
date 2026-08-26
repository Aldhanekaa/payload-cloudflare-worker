import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '@/payload-types'
import localization from '@/i18n/localization'

export const revalidatePortfolios: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/portfolios/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path, 'page')
      revalidateTag('portfolios-sitemap', {})
      for (const locale of localization.locales) {
        revalidateTag(`collection_portfolios_${locale.code}`, {})
      }
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/portfolios/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath, 'page')
      for (const locale of localization.locales) {
        revalidateTag(`collection_portfolios_${locale.code}`, {})
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/portfolios/${doc?.slug}`

    revalidatePath(path, 'page')
    for (const locale of localization.locales) {
      revalidateTag(`collection_portfolios_${locale.code}`, {})
    }
  }

  return doc
}
