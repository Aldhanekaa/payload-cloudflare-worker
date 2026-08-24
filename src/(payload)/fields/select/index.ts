import type { CollectionConfig } from 'payload'

export const selectFields: CollectionConfig['fields'] = [
  {
    name: 'selectFieldServerComponent',
    type: 'select',
    admin: {
      components: {
        Field: '@/(payload)/fields/select/components/server/Field#CustomSelectFieldServer',
        Label: '@/(payload)/fields/select/components/server/Label#CustomSelectFieldLabelServer',
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
      {
        label: 'Option 3',
        value: 'option-3',
      },
    ],
  },
  {
    name: 'selectFieldClientComponent',
    type: 'select',
    admin: {
      components: {
        Field: '@/(payload)/fields/select/components/client/Field#CustomSelectFieldClient',
        Label: '@/(payload)/fields/select/components/client/Label#CustomSelectFieldLabelClient',
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
      {
        label: 'Option 3',
        value: 'option-3',
      },
    ],
  },
]
