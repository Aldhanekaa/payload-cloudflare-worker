'use client'

import React, { useEffect, useState } from 'react'
import { useDocumentInfo, useField } from '@payloadcms/ui'
import { Globe, Copy } from 'lucide-react'
import { createPortal } from 'react-dom'
import { LocalizationModal } from './LocalizationModal'
import { DuplicateFieldModal } from './DuplicateFieldModal'
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
 * LocalizeFieldButton — rendered below every field with `localized: true`.
 *
 * - For string fields (text, textarea, code, email): shows "Change localization" button (opens translation modal).
 * - For object/non-string fields (group, array, blocks, json, relationship, upload): shows "Duplicate to another locale" button (opens duplication confirmation modal).
 */
export function LocalizeFieldButton({
  fieldName,
  fieldLabel,
  fieldPath,
  fieldType,
  hasAutotranslate = false,
}: LocalizeFieldButtonProps) {
  const { id, collectionSlug } = useDocumentInfo()
  const fieldState = useField<any>({ path: fieldPath || fieldName })
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Gate portal rendering until after client-side hydration
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isSaved = Boolean(id)

  const handleOpen = () => {
    if (!isSaved) return
    setIsModalOpen(true)
  }

  const handleClose = () => setIsModalOpen(false)

  // Determine if the field is a primitive string field vs complex object/array/blocks field
  const isStringField =
    (fieldType === 'text' ||
      fieldType === 'textarea' ||
      fieldType === 'code' ||
      fieldType === 'email') &&
    (typeof fieldState?.value === 'string' || fieldState?.value == null)

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
            {isStringField ? <Globe size={13} /> : <Copy size={13} />}
          </span>
          {isStringField ? 'Change localization' : 'Duplicate to another locale'}
        </button>
        <span className="loc-field-tooltip__text" role="tooltip">
          Save document to enable localizations
        </span>
      </div>
    )
  }

  // ── Saved state: trigger button + portal modal ───────────────────────────
  return (
    <>
      <button
        type="button"
        className="loc-field-btn"
        onClick={handleOpen}
        aria-label={
          isStringField
            ? `Open localization editor for ${fieldLabel}`
            : `Duplicate field data for ${fieldLabel} to another locale`
        }
      >
        <span className="loc-field-btn__icon">
          {isStringField ? <Globe size={13} /> : <Copy size={13} />}
        </span>
        {isStringField ? 'Change localization' : 'Duplicate to another locale'}
      </button>

      {/* Portal: only mounts after client-side hydration to avoid SSR mismatch */}
      {mounted &&
        isModalOpen &&
        createPortal(
          isStringField ? (
            <LocalizationModal
              fieldLabel={fieldLabel || fieldName}
              fieldPath={fieldPath || fieldName}
              collectionSlug={collectionSlug as string}
              docId={id as string | number}
              initialReferenceValue={currentFieldValue}
              hasAutotranslate={hasAutotranslate}
              onClose={handleClose}
            />
          ) : (
            <DuplicateFieldModal
              fieldLabel={fieldLabel || fieldName}
              fieldPath={fieldPath || fieldName}
              collectionSlug={collectionSlug as string}
              docId={id as string | number}
              fieldValue={fieldState?.value}
              onClose={handleClose}
            />
          ),
          document.body,
        )}
    </>
  )
}

export default LocalizeFieldButton
