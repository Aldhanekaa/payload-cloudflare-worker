import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { FIRST_PROGRAM_OPTIONS } from '../Seasons'

export const Students: CollectionConfig = {
  slug: 'students',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'school', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'unique_name',
      type: 'text',
      label: 'Full Name',
      unique: true,
      admin: {
        description: 'Generated automatically',
      },
      hooks: {
        afterRead: [
          ({ siblingData }) => {
            return siblingData.name.split(' ').join('-')
          },
        ],
      },
    },
    {
      name: 'school',
      type: 'relationship',
      label: 'School of Origin',
      relationTo: 'schools',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'School this student belongs to',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      label: 'User Account',
      relationTo: 'users',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Linked user account for this student',
      },
    },
    {
      type: 'join',
      name: 'registered-events',
      collection: 'student-registrations',
      on: 'student',
    },
    {
      type: 'join',
      name: 'awards',
      collection: 'leadership-awards',
      on: 'students.student',
    },
  ],
  timestamps: true,
}
