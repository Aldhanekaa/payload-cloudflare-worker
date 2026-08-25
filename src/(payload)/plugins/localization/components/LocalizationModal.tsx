'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useConfig, useLocale, useAuth } from '@payloadcms/ui'
import { X, Globe, Wand2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useLocaleData } from '../hooks/useLocaleData'
import './styles.css'

export type LocalizationModalProps = {
  /** Field's display name shown in the modal header */
  fieldLabel: string
  /** Dot-notation path to the field (e.g. 'title' or 'meta.title') */
  fieldPath: string
  /** The Payload collection slug (e.g. 'posts') */
  collectionSlug: string
  /** The document ID */
  docId: string | number
  /** Whether autotranslation is available */
  hasAutotranslate?: boolean
  /** Callback to close the modal */
  onClose: () => void
}

type SaveStatus = 'idle' | 'saving' | 'success' | 'error'

/**
 * LocalizationModal — side-by-side editor for managing field translations.
 *
 * Left panel: reference locale value (read-only)
 * Right panel: editable value for the selected target locale
 * Footer: "Save drafts" | "Publish changes" | optional "Autotranslate"
 */
export function LocalizationModal({
  fieldLabel,
  fieldPath,
  collectionSlug,
  docId,
  hasAutotranslate = false,
  onClose,
}: LocalizationModalProps) {
  const { config } = useConfig()
  const currentLocale = useLocale()
  const { token } = useAuth()

  // ── Locale list ──────────────────────────────────────────────────────────
  const localeList: { code: string; label: string }[] = (
    (config.localization as any)?.locales ?? []
  ).map((l: any) => ({
    code: typeof l === 'string' ? l : l.code,
    label: typeof l === 'string' ? l.toUpperCase() : (l.label ?? l.code).toUpperCase(),
  }))

  const referenceCode = currentLocale?.code ?? localeList[0]?.code ?? 'en'
  const otherLocales = localeList.filter((l) => l.code !== referenceCode)

  // Active target locale (not the reference)
  const [activeTargetCode, setActiveTargetCode] = useState(
    () => otherLocales[0]?.code ?? referenceCode,
  )

  // ── Fetch all locale values for this field ───────────────────────────────
  const allCodes = localeList.map((l) => l.code)
  const { data: localeData, isFetching, refetch } = useLocaleData(
    collectionSlug,
    docId,
    fieldPath,
    allCodes,
  )

  // ── Local edits per locale ───────────────────────────────────────────────
  const [edits, setEdits] = useState<Record<string, string>>({})

  // Pre-populate edits when data loads
  useEffect(() => {
    if (isFetching) return
    setEdits((prev) => {
      const next = { ...prev }
      for (const code of allCodes) {
        if (!(code in next)) {
          next[code] = localeData[code]?.value ?? ''
        }
      }
      return next
    })
  }, [isFetching, localeData, allCodes])

  // ── Save / Publish ───────────────────────────────────────────────────────
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [saveMessage, setSaveMessage] = useState('')

  const getEditedLocales = useCallback(() => {
    return allCodes.filter(
      (code) =>
        code !== referenceCode &&
        (edits[code] ?? '') !== (localeData[code]?.value ?? ''),
    )
  }, [allCodes, edits, localeData, referenceCode])

  const saveAll = useCallback(
    async (publish: boolean) => {
      const edited = getEditedLocales()
      if (!edited.length) {
        setSaveMessage('No changes to save.')
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 2500)
        return
      }

      setSaveStatus('saving')
      setSaveMessage('')

      try {
        await Promise.all(
          edited.map(async (code) => {
            const body = buildNestedBody(fieldPath, edits[code] ?? '')

            const params = new URLSearchParams({ locale: code })
            if (!publish) params.set('draft', 'true')

            const res = await fetch(
              `/api/${collectionSlug}/${docId}?${params.toString()}`,
              {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `JWT ${token}`,
                },
                body: JSON.stringify(body),
              },
            )

            if (!res.ok) {
              const msg = await res.text()
              throw new Error(`${code}: ${msg}`)
            }
          }),
        )

        setSaveStatus('success')
        setSaveMessage(publish ? 'Published!' : 'Saved as draft!')
        await refetch()
        setTimeout(() => setSaveStatus('idle'), 3000)
      } catch (err) {
        setSaveStatus('error')
        setSaveMessage(String(err))
        setTimeout(() => setSaveStatus('idle'), 4000)
      }
    },
    [collectionSlug, docId, edits, fieldPath, getEditedLocales, refetch, token],
  )

  // ── Autotranslate ────────────────────────────────────────────────────────
  const [isTranslating, setIsTranslating] = useState(false)

  const handleAutotranslate = useCallback(async () => {
    const referenceText = edits[referenceCode] ?? localeData[referenceCode]?.value ?? ''
    if (!referenceText) return

    setIsTranslating(true)
    try {
      const res = await fetch('/api/localization/autotranslate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({
          text: referenceText,
          fromLocale: referenceCode,
          toLocale: activeTargetCode,
        }),
      })

      if (res.ok) {
        const data = await res.json() as { translated?: string }
        if (data.translated) {
          setEdits((prev) => ({ ...prev, [activeTargetCode]: data.translated! }))
        }
      }
    } catch {
      // silently fail — user can retry
    } finally {
      setIsTranslating(false)
    }
  }, [activeTargetCode, edits, localeData, referenceCode, token])

  // ── Close on Escape ───────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // ── Values ────────────────────────────────────────────────────────────────
  const referenceValue = edits[referenceCode] ?? localeData[referenceCode]?.value ?? ''
  const targetValue = edits[activeTargetCode] ?? localeData[activeTargetCode]?.value ?? ''
  const activeLocale = localeList.find((l) => l.code === activeTargetCode)

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="loc-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Localization editor for ${fieldLabel}`}
    >
      <div className="loc-modal">
        {/* Header */}
        <div className="loc-modal__header">
          <div className="loc-modal__title">
            <Globe size={16} className="loc-modal__title-icon" />
            <span>{fieldLabel}</span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.07em',
                opacity: 0.4,
                marginLeft: 2,
              }}
            >
              {currentLocale?.code?.toUpperCase()}
            </span>
          </div>
          <button
            type="button"
            className="loc-modal__close"
            onClick={onClose}
            aria-label="Close localization modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Locale tabs */}
        {otherLocales.length > 0 && (
          <div className="loc-modal__tabs" role="tablist">
            {/* Reference locale — always visible, non-clickable */}
            <button
              type="button"
              className="loc-modal__tab"
              style={{ opacity: 0.3, cursor: 'default' }}
              disabled
            >
              {localeList.find((l) => l.code === referenceCode)?.label ?? referenceCode}
              &nbsp;(ref)
            </button>

            {otherLocales.map((locale) => {
              const hasValue = Boolean(
                edits[locale.code] ?? localeData[locale.code]?.value,
              )
              return (
                <button
                  key={locale.code}
                  type="button"
                  role="tab"
                  aria-selected={activeTargetCode === locale.code}
                  className={[
                    'loc-modal__tab',
                    activeTargetCode === locale.code ? 'loc-modal__tab--active' : '',
                    hasValue ? 'loc-modal__tab--has-value' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setActiveTargetCode(locale.code)}
                >
                  <span className="loc-modal__tab-dot" aria-hidden="true" />
                  {locale.label}
                </button>
              )
            })}
          </div>
        )}

        {/* Body */}
        <div className="loc-modal__body">
          {/* Reference locale panel */}
          <div className="loc-modal__pane loc-modal__pane--reference">
            <div className="loc-modal__pane-label">
              Reference language&nbsp;
              {(localeList.find((l) => l.code === referenceCode)?.label ?? referenceCode).toUpperCase()}
            </div>
            {isFetching ? (
              <div className="loc-modal__reference-value loc-modal__reference-value--empty">
                <span className="loc-spinner" style={{ marginRight: 6 }} />
                Loading…
              </div>
            ) : (
              <div
                className={`loc-modal__reference-value${!referenceValue ? ' loc-modal__reference-value--empty' : ''}`}
              >
                {referenceValue || 'No content in reference locale'}
              </div>
            )}
          </div>

          {/* Target locale panel */}
          <div className="loc-modal__pane">
            <div className="loc-modal__pane-label">
              {activeLocale?.label ?? activeTargetCode}
            </div>
            <textarea
              className="loc-modal__textarea"
              placeholder={`Enter ${activeLocale?.label ?? activeTargetCode} translation…`}
              value={isFetching ? '' : (edits[activeTargetCode] ?? '')}
              disabled={isFetching}
              onChange={(e) =>
                setEdits((prev) => ({ ...prev, [activeTargetCode]: e.target.value }))
              }
              rows={6}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="loc-modal__footer">
          <div className="loc-modal__footer-left">
            {/* Autotranslate button */}
            {hasAutotranslate && (
              <button
                type="button"
                className="loc-btn loc-btn--auto"
                onClick={handleAutotranslate}
                disabled={isTranslating || isFetching || !referenceValue}
                title="Generate translation automatically"
              >
                {isTranslating ? (
                  <span className="loc-spinner" />
                ) : (
                  <Wand2 size={13} />
                )}
                Autotranslate
              </button>
            )}

            {/* Status message */}
            {saveStatus === 'success' && (
              <span className="loc-status loc-status--success">
                <CheckCircle size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                {saveMessage}
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="loc-status loc-status--error">
                <AlertCircle size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                {saveMessage}
              </span>
            )}
          </div>

          <div className="loc-modal__footer-right">
            <button
              type="button"
              className="loc-btn loc-btn--ghost"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="loc-btn loc-btn--outline"
              onClick={() => saveAll(false)}
              disabled={saveStatus === 'saving'}
            >
              {saveStatus === 'saving' ? <span className="loc-spinner" /> : null}
              Save drafts
            </button>
            <button
              type="button"
              className="loc-btn loc-btn--primary"
              onClick={() => saveAll(true)}
              disabled={saveStatus === 'saving'}
            >
              {saveStatus === 'saving' ? <span className="loc-spinner" /> : null}
              Publish changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocalizationModal

/** Turn a dot-notation path into a nested object for the PATCH body */
function buildNestedBody(path: string, value: string): Record<string, any> {
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
