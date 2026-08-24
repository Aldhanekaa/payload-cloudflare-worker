import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const Schools: CollectionConfig = {
  slug: 'schools',
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      admin: {
        description: 'City or region where the school is located',
      },
      required: false,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
        ],
      }),
      required: false,
    },
    {
      name: 'link',
      type: 'text',
      label: 'Related Link',
      admin: {
        description: 'URL to the school website or relevant page',
      },
      required: false,
    },
    {
      name: 'users',
      type: 'relationship',
      label: 'Users',
      relationTo: 'users',
      hasMany: true,
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Users associated with this school',
      },
    },
  ],
  timestamps: true,
}
