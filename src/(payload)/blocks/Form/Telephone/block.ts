import type { Block } from 'payload'
import { phoneDialCodes } from './phone-codes'

/**
 * Custom "telephone" block for @payloadcms/plugin-form-builder.
 *
 * The plugin's field registry checks:
 *   if (block === undefined && typeof fieldConfig === 'object') return fieldConfig
 *
 * So we export the Block definition itself to be passed as the fieldConfig value
 * in formBuilderPlugin({ fields: { telephone: telephoneBlock } }).
 */
export const telephoneBlock: Block = {
  slug: 'telephone',
  labels: {
    singular: 'Telephone Field',
    plural: 'Telephone Fields',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Field Name',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          localized: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'defaultDialCode',
          type: 'select',
          label: 'Default Dial Code',
          options: phoneDialCodes.map((c) => ({ label: c.label, value: c.value })),
          admin: { width: '50%' },
        },
        {
          name: 'width',
          type: 'number',
          label: 'Field Width (%)',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Required',
      defaultValue: false,
    },
  ],
}
