import type { CollectionConfig } from 'payload'

export const jsonFields: CollectionConfig['fields'] = [
  {
    name: 'jsonFieldServerComponent',
    type: 'json',
    admin: {
      components: {
        Field: '@/(payload)/collections/Fields/json/components/server/Field#CustomJSONFieldServer',
        Label:
          '@/(payload)/collections/Fields/json/components/server/Label#CustomJSONFieldLabelServer',
      },
    },
  },
  {
    name: 'jsonFieldClientComponent',
    type: 'json',
    admin: {
      components: {
        Field: '@/(payload)/collections/Fields/json/components/client/Field#CustomJSONFieldClient',
        Label:
          '@/(payload)/collections/Fields/json/components/client/Label#CustomJSONFieldLabelClient',
      },
    },
  },
]
