import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import localization from '@/i18n/localization'

export const revalidateGlobal: GlobalAfterChangeHook = ({ req: { context } }) => {
  if (!context.disableRevalidate) {
    for (const locale of localization.locales) {
      revalidateTag(`global_global-settings_${locale.code}`, {})
    }
  }
}
