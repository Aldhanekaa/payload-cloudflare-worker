import type { CollectionConfig } from 'payload'

export const emailFields: CollectionConfig['fields'] = [
  {
    name: 'emailFieldServerComponent',
    type: 'email',
    admin: {
      components: {
        Field:
          '@/(payload)/collections/Fields/email/components/server/Field#CustomEmailFieldServer',
        Label:
          '@/(payload)/collections/Fields/email/components/server/Label#CustomEmailFieldLabelServer',
      },
    },
  },
  {
    name: 'emailFieldClientComponent',
    type: 'email',
    admin: {
      components: {
        Field:
          '@/(payload)/collections/Fields/email/components/client/Field#CustomEmailFieldClient',
        Label:
          '@/(payload)/collections/Fields/email/components/client/Label#CustomEmailFieldLabelClient',
      },
    },
  },
]
