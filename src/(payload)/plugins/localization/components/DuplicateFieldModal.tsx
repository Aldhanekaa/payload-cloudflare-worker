'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useConfig, useLocale, useAuth } from '@payloadcms/ui'
import { X, Copy, CheckCircle, AlertCircle } from 'lucide-react'
import './styles.css'

export type DuplicateFieldModalProps = {
  /** Field's display label shown in modal header */
  fieldLabel: string
  /** Dot-notation path to the field (e.g. 'title' or 'meta.title') */
  fieldPath: string
  /** The Payload collection slug (e.g. 'posts') */
  collectionSlug: string
  /** The document ID */
  docId: string | number
  /** The current field value from form state */
  fieldValue: any
  /** Callback to close the modal */
  onClose: () => void
}

type SaveStatus = 'idle' | 'duplicating' | 'success' | 'error'

/**
 * DuplicateFieldModal — Modal for copying non-string (object/array/blocks)
 * field data from the current reference locale to other locales.
 */
export function DuplicateFieldModal({
  fieldLabel,
  fieldPath,
  collectionSlug,
  docId,
  fieldValue,
  onClose,
}: DuplicateFieldModalProps) {
  const { config } = useConfig()
  const currentLocale = useLocale()
  const { token } = useAuth()

  // Locales list
  const localeList: { code: string; label: string }[] = (
    (config.localization as any)?.locales ?? []
  ).map((l: any) => ({
    code: typeof l === 'string' ? l : l.code,
    label: typeof l === 'string' ? l.toUpperCase() : (l.label ?? l.code).toUpperCase(),
  }))

  const referenceCode = currentLocale?.code ?? localeList[0]?.code ?? 'en'
  const otherLocales = localeList.filter((l) => l.code !== referenceCode)

  // Selected target locales (default: all other locales checked)
  const [selectedLocales, setSelectedLocales] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    otherLocales.forEach((l) => {
      initial[l.code] = true
    })
    return initial
  })

  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleToggleLocale = (code: string) => {
    setSelectedLocales((prev) => ({
      ...prev,
      [code]: !prev[code],
    }))
  }

  const handleDuplicate = useCallback(async () => {
    const targets = otherLocales.filter((l) => selectedLocales[l.code]).map((l) => l.code)

    if (!targets.length) {
      setStatusMessage('Please select at least one target locale.')
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
      return
    }

    setSaveStatus('duplicating')
    setStatusMessage('')

    try {
      await Promise.all(
        targets.map(async (code) => {
          const body = buildNestedBody(fieldPath, fieldValue)
          const params = new URLSearchParams({ locale: code, draft: 'true' })

          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
          }
          if (token && typeof token === 'string' && token !== 'null' && token !== 'undefined') {
            headers.Authorization = `JWT ${token}`
          }

          const res = await fetch(`/api/${collectionSlug}/${docId}?${params.toString()}`, {
            method: 'PATCH',
            headers,
            credentials: 'include',
            body: JSON.stringify(body),
          })

          if (!res.ok) {
            const msg = await res.text()
            throw new Error(`${code}: ${msg}`)
          }
        }),
      )

      setSaveStatus('success')
      setStatusMessage(`Duplicated "${fieldLabel}" to ${targets.join(', ').toUpperCase()}!`)
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (err) {
      setSaveStatus('error')
      setStatusMessage(String(err))
      setTimeout(() => setSaveStatus('idle'), 4000)
    }
  }, [
    collectionSlug,
    docId,
    fieldLabel,
    fieldPath,
    fieldValue,
    onClose,
    otherLocales,
    selectedLocales,
    token,
  ])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="loc-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Duplicate ${fieldLabel} to other locale`}
    >
      <div className="loc-modal" style={{ maxWidth: 460 }}>
        {/* Header */}
        <div className="loc-modal__header">
          <div className="loc-modal__title">
            <Copy size={16} className="loc-modal__title-icon" />
            <span>Duplicate Field Data — {fieldLabel}</span>
          </div>
          <button
            type="button"
            className="loc-modal__close"
            onClick={onClose}
            aria-label="Close duplicate modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div
          className="loc-modal__body"
          style={{ flexDirection: 'column', gap: '1rem', padding: '1.25rem' }}
        >
          <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0 }}>
            Copy field content from source locale <strong>({referenceCode.toUpperCase()})</strong>{' '}
            to the selected target locales below:
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              background: 'var(--theme-elevation-100)',
              padding: '0.75rem',
              borderRadius: 6,
              border: '1px solid var(--theme-elevation-200)',
            }}
          >
            {otherLocales.map((locale) => (
              <label
                key={locale.code}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                <input
                  type="checkbox"
                  checked={Boolean(selectedLocales[locale.code])}
                  onChange={() => handleToggleLocale(locale.code)}
                  style={{ cursor: 'pointer', width: 16, height: 16 }}
                />
                <span>
                  Target Locale: <strong>{locale.label}</strong>
                </span>
              </label>
            ))}
          </div>

          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--theme-text-body)',
              opacity: 0.5,
              margin: 0,
            }}
          >
            ⚠️ Note: This action will replace existing field data for this field in the target
            locale(s).
          </p>
        </div>

        {/* Footer */}
        <div className="loc-modal__footer">
          <div className="loc-modal__footer-left">
            {saveStatus === 'success' && (
              <span className="loc-status loc-status--success">
                <CheckCircle size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                {statusMessage}
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="loc-status loc-status--error">
                <AlertCircle size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                {statusMessage}
              </span>
            )}
          </div>

          <div className="loc-modal__footer-right">
            <button
              type="button"
              className="loc-btn loc-btn--ghost"
              onClick={onClose}
              disabled={saveStatus === 'duplicating'}
            >
              Cancel
            </button>
            <button
              type="button"
              className="loc-btn loc-btn--primary"
              onClick={handleDuplicate}
              disabled={saveStatus === 'duplicating'}
            >
              {saveStatus === 'duplicating' ? <span className="loc-spinner" /> : <Copy size={13} />}
              Duplicate Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DuplicateFieldModal

/** Turn a dot-notation path into a nested object for the PATCH body */
function buildNestedBody(path: string, value: any): Record<string, any> {
  const keys = path.split('.')
  const result: Record<string, any> = {}
  let cur = result
  for (let i = 0; i < keys.length - 1; i++) {
    cur[keys[i]] = {}
    cur = cur[keys[i]]
  }
  cur[keys[keys.length - 1]] = value
  return result
}
