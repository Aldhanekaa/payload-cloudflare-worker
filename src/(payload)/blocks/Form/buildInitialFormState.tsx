import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { TelephoneFieldType } from './Telephone'

// Extend the union to include our custom telephone block
type AnyFormField = FormFieldBlock | TelephoneFieldType

export const buildInitialFormState = (fields?: AnyFormField[]) => {
  if (!fields) return {}

  return fields.reduce(
    (initialSchema, field) => {
      // Checkbox gets boolean default
      if (field.blockType === 'checkbox') {
        return {
          ...initialSchema,
          [field.name]: false,
        }
      }

      // Skip message fields (display only)
      if (field.blockType === 'message') {
        return initialSchema
      }

      // Telephone stores two sub-fields: dialCode + number
      if (field.blockType === 'telephone') {
        return {
          ...initialSchema,
          [`${field.name}_dialCode`]: field.defaultDialCode ?? '',
          [`${field.name}_number`]: '',
        }
      }

      // All other supported field types get empty string default
      if ('name' in field) {
        return {
          ...initialSchema,
          [field.name]: '',
        }
      }

      return initialSchema
    },
    {} as Record<string, any>,
  )
}
