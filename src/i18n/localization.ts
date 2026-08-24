export type LocaleCodes = 'id' | 'en'
const localization = {
  defaultLocale: 'id',
  locales: [
    {
      code: 'en',
      label: 'English (English)',
      rtl: false,
    },
    {
      code: 'id',
      label: 'Bahasa Indonesia',
      rtl: false,
    },
  ],
  fallback: true,
  defaultLocalePublishOption: 'active',
}

export default localization
