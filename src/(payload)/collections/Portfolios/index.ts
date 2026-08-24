import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { slugField } from 'payload'

const PORTFOLIO_STATUSES = [
  { label: 'Active', value: 'active' },
  { label: 'Sold Out', value: 'sold-out' },
  { label: 'Coming Soon', value: 'coming-soon' },
] as const

export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'category', 'city', 'status', 'completion', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    // ── Primary Information ───────────────────────────────────────
    {
      name: 'name',
      type: 'text',
      label: 'Portfolio Name',
      required: true,
      admin: {
        description: 'e.g. Andersen Residences No. 01, The Dago Collection',
      },
    },
    slugField({
      useAsSlug: 'name',
    }),

    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      required: true,
      admin: {
        description:
          'A short, compelling tagline (e.g. "Contemporary tropical living, distilled.")',
      },
    },

    // ── Classification (Sidebar) ───────────────────────────────────────
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      defaultValue: 'active',
      options: PORTFOLIO_STATUSES,
      admin: {
        position: 'sidebar',
        description: 'Current status of the portfolio project.',
      },
    },

    {
      name: 'category',
      type: 'text',
      label: 'Category',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'e.g. Villa Collection, Residential Houses, Boutique Apartments',
      },
    },

    // ── Location (Sidebar) ───────────────────────────────────────
    {
      name: 'city',
      type: 'relationship',
      label: 'City',
      relationTo: 'cities',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
        description: 'Select the city where the portfolio is located.',
      },
    },

    {
      name: 'location',
      type: 'text',
      label: 'Specific Location',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Specific area within the city (e.g. Seminyak, Dago, South Jakarta)',
      },
    },

    // ── Project Details (Sidebar) ───────────────────────────────────────
    {
      name: 'units',
      type: 'number',
      label: 'Number of Units',
      required: true,
      min: 1,
      admin: {
        position: 'sidebar',
        description: 'Total number of units in this development.',
      },
    },

    {
      name: 'completion',
      type: 'text',
      label: 'Completion',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'e.g. Q3 2026, Q1 2025',
      },
    },

    {
      name: 'from',
      type: 'text',
      label: 'Starting Price',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'e.g. IDR 35 Billion, USD 2.2 Million',
      },
    },

    // ── Hero Image ───────────────────────────────────────
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
      required: true,
      admin: {
        description: 'Main image for portfolio card and hero section.',
      },
    },

    {
      name: 'imageAlt',
      type: 'text',
      label: 'Hero Image Alt Text',
      required: true,
      admin: {
        description: 'Descriptive alt text for the hero image for accessibility.',
      },
    },

    // ── Tabs ───────────────────────────────────────────────────
    {
      type: 'tabs',
      tabs: [
        // ── Tab: Details ───────────────────────────────────────
        {
          label: 'Details',
          fields: [
            {
              name: 'architect',
              type: 'text',
              label: 'Architect',
              required: true,
              admin: {
                description: 'Name of the architecture firm or architect.',
              },
            },

            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              required: true,
              admin: {
                description: 'Detailed description of the portfolio project.',
              },
            },

            {
              name: 'detailImages',
              type: 'array',
              label: 'Detail Page Images',
              required: true,
              minRows: 1,
              admin: {
                description: 'Upload images for the portfolio detail page gallery.',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: 'Image',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'alt',
                  type: 'text',
                  label: 'Alt Text',
                  required: true,
                },
              ],
            },

            {
              name: 'highlights',
              type: 'array',
              label: 'Highlights',
              required: true,
              minRows: 1,
              admin: {
                description: 'Key highlights and features of the project.',
              },
              fields: [
                {
                  name: 'highlight',
                  type: 'text',
                  label: 'Highlight',
                  required: true,
                  admin: {
                    description:
                      'e.g. Natural stone and reclaimed timber, Freehold title available',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
