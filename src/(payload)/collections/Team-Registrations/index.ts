import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const TeamRegistrations: CollectionConfig = {
  slug: 'team-registrations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  // admin: {
  //   defaultColumns: ['name', 'season', 'startDate', 'location', 'updatedAt'],
  //   useAsTitle: 'name',
  // },
  fields: [
    {
      name: 'team',
      type: 'relationship',
      relationTo: 'teams',
      label: 'Team',

      required: true,
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      label: 'Event',

      required: true,
    },
  ],
}
