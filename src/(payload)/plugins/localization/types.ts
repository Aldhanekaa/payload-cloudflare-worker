export type AutoTranslateAdapter = (params: {
  text: string
  fromLocale: string
  toLocale: string
}) => Promise<string>

export type LocalizationPluginOptions = {
  /** Enable or disable the plugin. Defaults to true. */
  enabled?: boolean
  /** Optional adapter for auto-translation. When provided, an "Autotranslate" button appears in the modal. */
  autotranslateAdapter?: AutoTranslateAdapter
  /**
   * Collection slugs to exclude from locale selector injection.
   * The locale bar is added to all collections by default.
   */
  excludedCollections?: string[]
}

export type LocalizationModalField = {
  name: string
  label: string
  type: string
  path: string
}
