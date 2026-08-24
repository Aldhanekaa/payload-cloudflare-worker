import type { CollectionConfig } from 'payload'

export const radioFields: CollectionConfig['fields'] = [
  {
    name: 'radioFieldServerComponent',
    type: 'radio',
    admin: {
      components: {
        Field:
          '@/(payload)/collections/Fields/radio/components/server/Field#CustomRadioFieldServer',
        Label:
          '@/(payload)/collections/Fields/radio/components/server/Label#CustomRadioFieldLabelServer',
      },
    },
    options: [
      {
        label: 'Option 1',
        value: 'option-1',
      },
      {
        label: 'Option 2',
        value: 'option-2',
      },
    ],
  },
  {
    name: 'radioFieldClientComponent',
    type: 'radio',
    admin: {
      components: {
        Field:
          '@/(payload)/collections/Fields/radio/components/client/Field#CustomRadioFieldClient',
        Label:
          '@/(payload)/collections/Fields/radio/components/client/Label#CustomRadioFieldLabelClient',
      },
    },
    options: [
      {
        label: 'Option 1',
        value: 'option-1',
      },
      {
        label: 'Option 2',
        value: 'option-2',
      },
    ],
  },
]
