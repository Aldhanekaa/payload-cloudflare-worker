import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'location', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Client Name',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      required: false,
      admin: {
        description: 'e.g. Jakarta, Indonesia',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'Quote',
      required: true,
      admin: {
        description: 'The testimonial quote from the client.',
      },
    },
  ],
  timestamps: true,
}
