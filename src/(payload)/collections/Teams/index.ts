import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

const FIRST_PROGRAM_OPTIONS: { label: string; value: string }[] = [
  { label: 'FIRST Global', value: 'first-global' },
  { label: 'FIRST® LEGO® League', value: 'first-lego-league' },
  { label: 'FIRST Tech Challenge', value: 'first-tech-challenge' },
  { label: 'FIRST Robotics Competition', value: 'first-robotics-competition' },
]

export const Teams: CollectionConfig = {
  slug: 'teams',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['teamName', 'teamNumber', 'program', 'updatedAt'],
    useAsTitle: 'teamName',
  },
  fields: [
    {
      name: 'program',
      type: 'select',
      label: 'FIRST Inspires Program',
      required: true,
      hasMany: false,
      options: FIRST_PROGRAM_OPTIONS,
    },
    {
      name: 'teamNumber',
      type: 'text',
      label: 'Team Number',
      required: true,
      unique: true,
    },
    {
      name: 'teamName',
      type: 'text',
      label: 'Team Name',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Team Logo',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'school',
      type: 'relationship',
      label: 'School',
      relationTo: 'schools',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'School associated with this team',
      },
    },
    {
      name: 'isIndonesianTeam',
      type: 'checkbox',
      label: 'Is It Indonesian TEam?',
      required: true,
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'It It Indonesian Team?',
      },
    },
    {
      name: 'province',
      type: 'text',
      label: 'Province',
      required: true,
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.isIndonesianTeam),

        position: 'sidebar',
        description: 'Province, write it in Bahasa Indonesia',
      },
    },
    {
      name: 'city',
      type: 'text',
      label: 'Province',
      required: true,
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.isIndonesianTeam),

        position: 'sidebar',
        description: 'City, write it in Bahasa Indonesia',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'City or region where the team is based',
      },
    },

    {
      name: 'mentors',
      type: 'relationship',
      label: 'Mentors',
      relationTo: 'users',
      hasMany: true,
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Users assigned as mentors for this team',
      },
    },
    {
      type: 'join',
      name: 'registered-events',
      collection: 'team-registrations',
      on: 'team',
    },
    {
      type: 'join',
      name: 'team-awards',
      collection: 'awards',
      on: 'awards.team',
    },
  ],
  timestamps: true,
}
