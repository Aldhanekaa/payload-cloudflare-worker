'use client'

import { useTranslation } from '@payloadcms/ui'
import type { BetterEditorTranslations } from './types'
import { en } from './en'

export const useBetterEditorT = (): BetterEditorTranslations => {
  return en
}
