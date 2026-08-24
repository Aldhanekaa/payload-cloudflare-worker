import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

const FIRST_PROGRAM_OPTIONS: { label: string; value: string }[] = [
  { label: 'FIRST Global', value: 'first-global' },
  { label: 'FIRST® LEGO® League', value: 'first-lego-league' },
  { label: 'FIRST Tech Challenge', value: 'first-tech-challenge' },
  { label: 'FIRST Robotics Competition', value: 'first-robotics-competition' },
]
export const SeasonGames: CollectionConfig = {
  slug: 'season-games',
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
      label: 'Game Season Name (e.g. CENTERSTAGE)',
      required: true,
    },

    {
      name: 'program',
      type: 'select',
      label: 'FIRST Inspires Program',
      required: true,
      hasMany: false,
      options: FIRST_PROGRAM_OPTIONS,
    },
    {
      name: 'season',
      type: 'relationship',
      relationTo: 'seasons',
      label: 'FIRST Season',

      required: true,
    },
    {
      name: 'year',
      type: 'number',
      // virtual: 'season.year', // Resolves to the 'name' field of the 'author' relationship
      min: 2000,
      max: 2200,
      required: true,
      admin: {
        description: 'Starting year of the season (e.g. 2023 means the 2023/2024 season)',
      },
    },

    {
      name: 'logo',
      type: 'upload',
      label: 'Season Game Logo',
      relationTo: 'media',
      admin: {
        description:
          "Make sure it's transparent (whether SVG or png). Visit https://ftc-resources.firstinspires.org/ftc/archive",
      },
      required: true,
    },
    {
      name: 'videoLink',
      type: 'text',
      label: 'Video Link',
      required: true,
      admin: {
        description: 'URL to the season reveal or promotional video',
      },
    },
  ],
  timestamps: true,
}
