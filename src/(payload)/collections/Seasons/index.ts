import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const FIRST_PROGRAM_OPTIONS: { label: string; value: string }[] = [
  { label: 'FIRST Global', value: 'first-global' },
  { label: 'FIRST Regular (FRC, FTC, FLL)', value: 'first-regular' },
]

export const Seasons: CollectionConfig = {
  slug: 'seasons',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'year', 'program', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Season Name',
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      label: 'Season Year',
      required: true,
      min: 2000,
      max: 2200,
      admin: {
        description: 'Starting year of the season (e.g. 2023 means the 2023/2024 season)',
      },
    },
    {
      name: 'program_type',
      type: 'select',
      label: 'Program Type',
      required: true,
      hasMany: false,
      options: FIRST_PROGRAM_OPTIONS,
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Season Logo',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'banner',
      type: 'upload',
      label: 'Season Banner',
      relationTo: 'media',
      required: false,
      admin: {
        description:
          'You may get the season banner by downloading from https://www.firstinspires.org/resources/library/season-brand-downloads -- then pick profile cover to choose "LinkedIn Banner"',
      },
    },
    {
      name: 'videoLink',
      type: 'text',
      label: 'Video Link',
      required: false,
      admin: {
        description: 'URL to the season reveal or promotional video',
      },
    },
    {
      type: 'join',
      name: 'games',
      collection: 'season-games',
      on: 'season',
    },
  ],
  timestamps: true,
}
