import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const LeadershipAwards: CollectionConfig = {
  slug: 'leadership-awards',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  // admin: {
  //   useAsTitle: 'name',
  // },
  fields: [
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      label: 'Event',
      admin: {
        description: 'Where was this award given?',
      },
      required: true,
    },
    {
      name: 'team',
      type: 'relationship',
      relationTo: 'teams',
      label: 'Team',
      admin: {
        description: "Student's team",
      },
      required: true,
    },

    // ── Schedule / Agenda ──────────────────────────────────────
    {
      name: 'students',
      type: 'array',
      label: 'Awardees',
      required: false,
      admin: {
        description: 'Select winners',
      },
      fields: [
        {
          name: 'student',
          type: 'relationship',
          relationTo: 'students',
          label: 'Awarded to',
          admin: {
            description: 'Who received this award?',
          },
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
}
