import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const PortfolioCategories: CollectionConfig = {
  slug: 'portfolio-categories',
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
        description: 'e.g. Villa Collection, Residential Houses, Boutique Apartments',
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
