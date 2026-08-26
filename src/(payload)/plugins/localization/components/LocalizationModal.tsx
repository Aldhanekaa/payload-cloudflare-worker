'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  /** Initial field value in current locale (from live form state) */
  initialReferenceValue?: string
  /** Whether autotranslation is available */
  hasAutotranslate?: boolean
  /** Callback to close the modal */
  onClose: () => void
  /** Callback to update the form field value after successful save */
  onUpdate?: (newValue: string) => void
}

type SaveStatus = 'idle' | 'saving' | 'success' | 'error'

type LocaleItem = {
  code: string
  label: string
}

/**
 * LocalizationModal — side-by-side editor for managing field translations.
 *
 * Left panel: editable value for the selected left locale
 * Right panel: editable value for the selected right locale
 * Users can switch which locale appears on each side
 * Footer: "Save drafts" | "Publish changes" | optional "Autotranslate"
 */
export function LocalizationModal({
  fieldLabel,
  fieldPath,
  collectionSlug,
  docId,
  initialReferenceValue,
  hasAutotranslate = false,
  onClose,
  onUpdate,
}: LocalizationModalProps) {
  const { config } = useConfig()
  const currentLocale = useLocale()
  const { token } = useAuth()

  // ── Locale list (memoized to prevent re-creation on every render) ───────────
  const localeList: LocaleItem[] = useMemo(() => {
    const raw = (config.localization as any)?.locales ?? []
    return raw.map((l: any) => ({
      code: typeof l === 'string' ? l : l.code,
      label: typeof l === 'string' ? l.toUpperCase() : (l.label ?? l.code).toUpperCase(),
    }))
  }, [config.localization])

  // Two active locales for side-by-side editing (no reference/target distinction)
  const currentCode = currentLocale?.code ?? localeList[0]?.code ?? 'en'
  const otherCode = useMemo(
    () => localeList.find((l: LocaleItem) => l.code !== currentCode)?.code ?? currentCode,
    [localeList, currentCode],
  )

  const [leftLocaleCode, setLeftLocaleCode] = useState(currentCode)
  const [rightLocaleCode, setRightLocaleCode] = useState(otherCode)

  // ── Fetch all locale values for this field ───────────────────────────────
  const allCodes = useMemo(() => localeList.map((l: LocaleItem) => l.code), [localeList])
  const {
    data: localeData,
    isFetching,
    refetch,
  } = useLocaleData(collectionSlug, docId, fieldPath, allCodes)

  // Track if user has modified a locale's text manually
  const touchedRef = useRef<Record<string, boolean>>({})

  // ── Local edits per locale ───────────────────────────────────────────────
  const [edits, setEdits] = useState<Record<string, string>>(() => {
    if (initialReferenceValue !== undefined) {
      return { [currentCode]: initialReferenceValue }
    }
    return {}
  })

  // Pre-populate edits when data loads
  useEffect(() => {
    if (isFetching) return
    setEdits((prev) => {
      const next = { ...prev }
      for (const code of allCodes) {
        if (!touchedRef.current[code]) {
          const fetchedVal = localeData[code]?.value
          if (fetchedVal != null) {
            next[code] = fetchedVal
          } else if (code === currentCode && initialReferenceValue !== undefined) {
            next[code] = initialReferenceValue
          }
        }
      }
      return next
    })
  }, [isFetching, localeData, allCodes, currentCode, initialReferenceValue])

  // ── Save / Publish ───────────────────────────────────────────────────────
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [saveMessage, setSaveMessage] = useState('')

  const getEditedLocales = useCallback(() => {
    return allCodes.filter(
      (code: string) => (edits[code] ?? '') !== (localeData[code]?.value ?? ''),
    )
  }, [allCodes, edits, localeData])

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
          edited.map(async (code: string) => {
            const body = buildNestedBody(fieldPath, edits[code] ?? '')

            const params = new URLSearchParams({ locale: code })
            if (!publish) params.set('draft', 'true')

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
        setSaveMessage(publish ? 'Published!' : 'Saved as draft!')
        await refetch()

        // Update the form field if the current locale was edited
        if (onUpdate && edited.includes(currentCode)) {
          const updatedValue = edits[currentCode] ?? ''
          onUpdate(updatedValue)
        }

        setTimeout(() => setSaveStatus('idle'), 3000)
      } catch (err) {
        setSaveStatus('error')
        setSaveMessage(String(err))
        setTimeout(() => setSaveStatus('idle'), 4000)
      }
    },
    [
      collectionSlug,
      docId,
      edits,
      fieldPath,
      getEditedLocales,
      refetch,
      token,
      onUpdate,
      currentCode,
    ],
  )

  // ── Autotranslate ────────────────────────────────────────────────────────
  const [isTranslating, setIsTranslating] = useState(false)

  const handleAutotranslate = useCallback(async () => {
    const sourceText = edits[leftLocaleCode] ?? localeData[leftLocaleCode]?.value ?? ''
    if (!sourceText) return

    setIsTranslating(true)
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (token && typeof token === 'string' && token !== 'null' && token !== 'undefined') {
        headers.Authorization = `JWT ${token}`
      }

      const res = await fetch('/api/localization/autotranslate', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          text: sourceText,
          fromLocale: leftLocaleCode,
          toLocale: rightLocaleCode,
        }),
      })

      if (res.ok) {
        const data = (await res.json()) as { translated?: string }
        if (data.translated) {
          touchedRef.current[rightLocaleCode] = true
          setEdits((prev) => ({ ...prev, [rightLocaleCode]: data.translated! }))
        }
      }
    } catch {
      // silently fail — user can retry
    } finally {
      setIsTranslating(false)
    }
  }, [leftLocaleCode, rightLocaleCode, edits, localeData, token])

  // ── Close on Escape ───────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // ── Values ────────────────────────────────────────────────────────────────
  const leftValue =
    edits[leftLocaleCode] !== undefined
      ? edits[leftLocaleCode]
      : (localeData[leftLocaleCode]?.value ?? '')
  const rightValue =
    edits[rightLocaleCode] !== undefined
      ? edits[rightLocaleCode]
      : (localeData[rightLocaleCode]?.value ?? '')
  const leftLocale = localeList.find((l: LocaleItem) => l.code === leftLocaleCode)
  const rightLocale = localeList.find((l: LocaleItem) => l.code === rightLocaleCode)

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
        {/* <div className="loc-modal__tabs" role="tablist">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flex: 1 }}>
            <span style={{ fontSize: '0.75rem', opacity: 0.6, fontWeight: 500 }}>Left:</span>
            {localeList.map((locale: LocaleItem) => {
              const isActive = leftLocaleCode === locale.code
              const hasValue = Boolean(edits[locale.code] ?? localeData[locale.code]?.value)
              return (
                <button
                  key={locale.code}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={[
                    'loc-modal__tab',
                    isActive ? 'loc-modal__tab--active' : '',
                    hasValue ? 'loc-modal__tab--has-value' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => {
                    if (locale.code !== rightLocaleCode) {
                      setLeftLocaleCode(locale.code)
                    }
                  }}
                  disabled={locale.code === rightLocaleCode}
                >
                  <span className="loc-modal__tab-dot" aria-hidden="true" />
                  {locale.label}
                </button>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flex: 1 }}>
            <span style={{ fontSize: '0.75rem', opacity: 0.6, fontWeight: 500 }}>Right:</span>
            {localeList.map((locale: LocaleItem) => {
              const isActive = rightLocaleCode === locale.code
              const hasValue = Boolean(edits[locale.code] ?? localeData[locale.code]?.value)
              return (
                <button
                  key={locale.code}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={[
                    'loc-modal__tab',
                    isActive ? 'loc-modal__tab--active' : '',
                    hasValue ? 'loc-modal__tab--has-value' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => {
                    if (locale.code !== leftLocaleCode) {
                      setRightLocaleCode(locale.code)
                    }
                  }}
                  disabled={locale.code === leftLocaleCode}
                >
                  <span className="loc-modal__tab-dot" aria-hidden="true" />
                  {locale.label}
                </button>
              )
            })}
          </div>
        </div> */}

        {/* Body */}
        <div className="loc-modal__body">
          {/* Left locale panel */}
          <div className="loc-modal__pane">
            <div className="loc-modal__pane-label">{leftLocale?.label ?? leftLocaleCode}</div>
            {isFetching && !leftValue ? (
              <div
                className="loc-modal__textarea"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.5,
                }}
              >
                <span className="loc-spinner" style={{ marginRight: 6 }} />
                Loading…
              </div>
            ) : (
              <textarea
                className="loc-modal__textarea"
                placeholder={`Enter ${leftLocale?.label ?? leftLocaleCode} text…`}
                value={leftValue}
                onChange={(e) => {
                  const val = e.target.value
                  touchedRef.current[leftLocaleCode] = true
                  setEdits((prev) => ({ ...prev, [leftLocaleCode]: val }))
                }}
                rows={6}
              />
            )}
          </div>

          {/* Right locale panel */}
          <div className="loc-modal__pane">
            <div className="loc-modal__pane-label">{rightLocale?.label ?? rightLocaleCode}</div>
            {isFetching && !rightValue ? (
              <div
                className="loc-modal__textarea"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.5,
                }}
              >
                <span className="loc-spinner" style={{ marginRight: 6 }} />
                Loading…
              </div>
            ) : (
              <textarea
                className="loc-modal__textarea"
                placeholder={`Enter ${rightLocale?.label ?? rightLocaleCode} translation…`}
                value={rightValue}
                onChange={(e) => {
                  const val = e.target.value
                  touchedRef.current[rightLocaleCode] = true
                  setEdits((prev) => ({ ...prev, [rightLocaleCode]: val }))
                }}
                rows={6}
              />
            )}
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
                disabled={isTranslating || isFetching || !leftValue}
                title={`Translate from ${leftLocale?.label ?? leftLocaleCode} to ${rightLocale?.label ?? rightLocaleCode}`}
              >
                {isTranslating ? <span className="loc-spinner" /> : <Wand2 size={13} />}
                Translate {leftLocale?.label ?? leftLocaleCode} →{' '}
                {rightLocale?.label ?? rightLocaleCode}
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
            <button type="button" className="loc-btn loc-btn--ghost" onClick={onClose}>
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
