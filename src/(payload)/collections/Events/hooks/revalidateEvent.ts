import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Event } from '../../../payload-types'
import localization from '@/i18n/localization'

export const revalidateEvent: CollectionAfterChangeHook<Event> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating events collection cache`)
    for (const locale of localization.locales) {
      revalidateTag(`collection_events_${locale.code}`, {})
    }
  }
  return doc
}

export const revalidateDeleteEvent: CollectionAfterDeleteHook<Event> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    for (const locale of localization.locales) {
      revalidateTag(`collection_events_${locale.code}`, {})
    }
  }
  return doc
}
