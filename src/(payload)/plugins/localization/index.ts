import type { Config, Plugin } from 'payload'
import { addLocalizationToFields } from './utils/fieldUtils'
import type { LocalizationPluginOptions } from './types'

/**
 * Custom Localization Plugin for Payload CMS v3
 *
 * Adds a sticky locale selector bar to every collection edit view,
 * a "Change localization" button below each localized field,
 * and a modal that lets editors manage translations side-by-side.
 *
 * Optionally supports autotranslation via an adapter.
 */
export const localizationPlugin = (
  options: LocalizationPluginOptions = {},
): Plugin => {
  return (incomingConfig: Config): Config => {
    const {
      enabled = true,
      autotranslateAdapter,
      excludedCollections = [],
    } = options

    if (!enabled) return incomingConfig

    const hasAutotranslate = Boolean(autotranslateAdapter)

    // ── Modify each collection ──────────────────────────────────────────
    const modifiedCollections = (incomingConfig.collections ?? []).map(
      (collection) => {
        const isExcluded = excludedCollections.includes(collection.slug)

        return {
          ...collection,
          admin: {
            ...collection.admin,
            components: {
              ...collection.admin?.components,
              edit: {
                ...collection.admin?.components?.edit,
                // Inject the sticky locale bar at the top of every document edit view
                ...(!isExcluded && {
                  beforeDocumentControls: [
                    ...(collection.admin?.components?.edit?.beforeDocumentControls ?? []),
                    {
                      path: '@/(payload)/plugins/localization/components/LocaleSelectorBar#LocaleSelectorBar',
                      clientProps: { hasAutotranslate },
                    },
                  ],
                }),
              },
            },
          },
          // Inject the LocalizeFieldButton into every localized field
          fields: addLocalizationToFields(collection.fields),
        }
      },
    )

    // ── Register autotranslate endpoint ─────────────────────────────────
    const autotranslateEndpoints = hasAutotranslate
      ? [
          {
            path: '/localization/autotranslate',
            method: 'post' as const,
            handler: async (req: any) => {
              const { text, fromLocale, toLocale } = await req.json?.() ?? {}

              if (!text || !fromLocale || !toLocale) {
                return Response.json(
                  { error: 'Missing required fields: text, fromLocale, toLocale' },
                  { status: 400 },
                )
              }

              try {
                const translated = await autotranslateAdapter!({ text, fromLocale, toLocale })
                return Response.json({ translated })
              } catch (err) {
                return Response.json(
                  { error: 'Translation failed', detail: String(err) },
                  { status: 500 },
                )
              }
            },
          },
        ]
      : []

    return {
      ...incomingConfig,
      collections: modifiedCollections,
      endpoints: [
        ...(incomingConfig.endpoints ?? []),
        ...autotranslateEndpoints,
      ],
    }
  }
}
