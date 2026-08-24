import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const Cities: CollectionConfig = {
  slug: 'cities',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'province', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'City Name',
      required: true,
      admin: {
        description: 'e.g. Bali, Jakarta, Bandung, Lombok, Surabaya',
      },
    },
    {
      name: 'province',
      type: 'text',
      label: 'Province / State',
      required: false,
      admin: {
        description: 'e.g. Bali, DKI Jakarta, West Java',
      },
    },
    {
      name: 'country',
      type: 'text',
      label: 'Country',
      required: false,
      defaultValue: 'Indonesia',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: false,
      localized: true,
      admin: {
        description: 'Detailed description of the city.',
      },
    },

    {
      name: 'media',
      type: 'upload',
      label: 'City Image',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Representative image for this city.',
      },
    },
    {
      type: 'join',
      name: 'portfolios',
      collection: 'portfolios',
      on: 'city',
    },
    {
      type: 'join',
      name: 'properties',
      collection: 'properties',
      on: 'city',
    },
  ],
  timestamps: true,
}
