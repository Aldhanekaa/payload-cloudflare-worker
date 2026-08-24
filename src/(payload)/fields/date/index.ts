import type { CollectionConfig } from 'payload'

export const dateFields: CollectionConfig['fields'] = [
  {
    name: 'dateFieldServerComponent',
    type: 'date',
    admin: {
      components: {
        Field: '@/(payload)/collections/Fields/date/components/server/Field#CustomDateFieldServer',
        Label:
          '@/(payload)/collections/Fields/date/components/server/Label#CustomDateFieldLabelServer',
      },
    },
  },
  {
    name: 'dateFieldClientComponent',
    type: 'date',
    admin: {
      components: {
        Field: '@/(payload)/collections/Fields/date/components/client/Field#CustomDateFieldClient',
        Label:
          '@/(payload)/collections/Fields/date/components/client/Label#CustomDateFieldLabelClient',
      },
    },
  },
]
