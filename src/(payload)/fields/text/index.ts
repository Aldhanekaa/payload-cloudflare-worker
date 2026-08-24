import type { CollectionConfig } from 'payload'

export const textFields: CollectionConfig['fields'] = [
  {
    name: 'textFieldServerComponent',
    type: 'text',
    admin: {
      components: {
        Field: '@/(payload)/collections/Fields/text/components/server/Field#CustomTextFieldServer',
        Label:
          '@/(payload)/collections/Fields/text/components/server/Label#CustomTextFieldLabelServer',
      },
    },
  },
  {
    name: 'textFieldClientComponent',
    type: 'text',
    admin: {
      components: {
        Field: '@/(payload)/collections/Fields/text/components/client/Field#CustomTextFieldClient',
        Label:
          '@/(payload)/collections/Fields/text/components/client/Label#CustomTextFieldLabelClient',
      },
    },
  },
]
