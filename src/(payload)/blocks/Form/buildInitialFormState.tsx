import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'

export const buildInitialFormState = (fields?: FormFieldBlock[]) => {
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

      // All other supported field types get empty string default
      if (
        field.blockType === 'country' ||
        field.blockType === 'email' ||
        field.blockType === 'text' ||
        field.blockType === 'select' ||
        field.blockType === 'state' ||
        field.blockType === 'textarea'
      ) {
        return {
          ...initialSchema,
          [field.name]: '',
        }
      }

      // Handle other field types that have name property
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
