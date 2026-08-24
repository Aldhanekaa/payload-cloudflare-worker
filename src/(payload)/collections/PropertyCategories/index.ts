import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const PropertyCategories: CollectionConfig = {
  slug: 'property-categories',
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
      label: 'Category Name',
      required: true,
      admin: {
        description: 'e.g. Luxury, Budget, Beachfront, Investment',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: false,
    },
  ],
  timestamps: true,
}
