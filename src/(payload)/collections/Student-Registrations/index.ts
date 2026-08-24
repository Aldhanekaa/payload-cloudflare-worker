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

const richTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HorizontalRuleFeature(),
  ],
})

export const StudentRegistrations: CollectionConfig = {
  slug: 'student-registrations',
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
      name: 'student',
      type: 'relationship',
      relationTo: 'students',
      label: 'Student',

      required: true,
    },
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
