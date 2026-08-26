'use client'

import React, { useEffect, useState } from 'react'
import { useDocumentInfo, useField } from '@payloadcms/ui'
import { Globe } from 'lucide-react'
import { createPortal } from 'react-dom'
import { LocalizationModal } from './LocalizationModal'
import './styles.css'

export type LocalizeFieldButtonProps = {
  /** Internal field name (from collection config) */
  fieldName: string
  /** Human-readable field label for modal header */
  fieldLabel: string
  /** Dot-notation path for nested fields (e.g. 'meta.title') */
  fieldPath: string
  /** Field type from collection config */
  fieldType?: string
  /** Whether autotranslation is available (passed via clientProps from plugin) */
  hasAutotranslate?: boolean
}

/**
 * LocalizeFieldButton — rendered below fields with `localized: true`.
 *
 * - Only string/text fields (`text`, `textarea`, `code`, `email`, `richText`) display the "Change localization" button.
 * - Non-string fields (groups, arrays, blocks, json, relationships, uploads) return `null` (no button rendered).
 */
export function LocalizeFieldButton({
  fieldName,
  fieldLabel,
  fieldPath,
  fieldType,
  hasAutotranslate = false,
}: LocalizeFieldButtonProps) {
  const { id, collectionSlug } = useDocumentInfo()
  const fieldState = useField<string>({ path: fieldPath || fieldName })
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Gate portal rendering until after client-side hydration
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only display button for string/text fields
  const isStringField =
    fieldType === 'text' ||
    fieldType === 'textarea' ||
    fieldType === 'code' ||
    fieldType === 'email' ||
    fieldType === 'richText' ||
    typeof fieldState?.value === 'string'

  if (!isStringField) {
    return null
  }

  const isSaved = Boolean(id)

  const handleOpen = () => {
    if (!isSaved) return
    setIsModalOpen(true)
  }

  const handleClose = () => setIsModalOpen(false)

  const currentFieldValue =
    typeof fieldState?.value === 'string'
      ? fieldState.value
      : fieldState?.value != null
      ? String(fieldState.value)
      : undefined

  // ── Unsaved state: disabled button with tooltip ──────────────────────────
  if (!isSaved) {
    return (
      <div className="loc-field-tooltip">
        <button
          type="button"
          className="loc-field-btn loc-field-btn--disabled"
          disabled
          aria-label="Save document to enable localizations"
        >
          <span className="loc-field-btn__icon">
            <Globe size={13} />
          </span>
          Change localization
        </button>
        <span className="loc-field-tooltip__text" role="tooltip">
          Save document to enable localizations
        </span>
      </div>
    )
  }

  // ── Saved state: trigger button + portal modal ───────────────────────────
  return (
    <div className="loc-field-wrapper">
      <button
        type="button"
        className="loc-field-btn"
        onClick={handleOpen}
        aria-label={`Open localization editor for ${fieldLabel}`}
      >
        <span className="loc-field-btn__icon">
          <Globe size={13} />
        </span>
        Change localization
      </button>

      {/* Portal: only mounts after client-side hydration to avoid SSR mismatch */}
      {mounted &&
        isModalOpen &&
        createPortal(
          <LocalizationModal
            fieldLabel={fieldLabel || fieldName}
            fieldPath={fieldPath || fieldName}
            collectionSlug={collectionSlug as string}
            docId={id as string | number}
            initialReferenceValue={currentFieldValue}
            hasAutotranslate={hasAutotranslate}
            onClose={handleClose}
          />,
          document.body,
        )}
    </div>
  )
}

export default LocalizeFieldButton
