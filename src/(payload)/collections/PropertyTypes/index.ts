import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const PropertyTypes: CollectionConfig = {
  slug: 'property-types',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Type Name',
      required: true,
      admin: {
        description: 'e.g. Villa, House, Penthouse',
      },
    },
  ],
  timestamps: true,
}
