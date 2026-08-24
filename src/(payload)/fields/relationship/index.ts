import type { CollectionConfig } from 'payload'

export const relationshipFields: CollectionConfig['fields'] = [
  {
    name: 'relationshipFieldServerComponent',
    type: 'relationship',
    admin: {
      components: {
        Field:
          '@/(payload)/collections/Fields/relationship/components/server/Field#CustomRelationshipFieldServer',
        Label:
          '@/(payload)/collections/Fields/relationship/components/server/Label#CustomRelationshipFieldLabelServer',
      },
    },
    relationTo: 'custom-fields' as any, // Collection may not exist yet
  },
  {
    name: 'relationshipFieldClientComponent',
    type: 'relationship',
    admin: {
      components: {
        Field:
          '@/(payload)/collections/Fields/relationship/components/client/Field#CustomRelationshipFieldClient',
        Label:
          '@/(payload)/collections/Fields/relationship/components/client/Label#CustomRelationshipFieldLabelClient',
      },
    },
    relationTo: 'custom-fields' as any, // Collection may not exist yet
  },
]
