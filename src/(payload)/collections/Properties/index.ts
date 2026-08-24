import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { slugField } from 'payload'

const LISTING_TYPES = [
  { label: 'For Sale', value: 'sale' },
  { label: 'For Rent', value: 'rent' },
  { label: 'For Sale & Rent', value: 'both' },
]

export const Properties: CollectionConfig = {
  slug: 'properties',

  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'location', 'city', 'listingType', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    // ── Primary Information ───────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      label: 'Property Name',
      required: true,
      localized: true,
      admin: {
        description: 'e.g. The Aruna Residence, Senopati Courtyard House',
      },
    },
    slugField({
      useAsSlug: 'title',
    }),

    // ── Classification (Sidebar) ───────────────────────────────────────
    {
      name: 'listingType',
      type: 'select',
      label: 'Listing Type',
      required: true,
      options: LISTING_TYPES,
      admin: {
        position: 'sidebar',
        description: 'Is this property for sale, rent, or both?',
      },
    },

    {
      name: 'propertyType',
      type: 'relationship',
      label: 'Property Type',
      relationTo: 'property-types',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
        description: 'e.g. Villa, House, Apartment',
      },
    },

    {
      name: 'category',
      type: 'relationship',
      label: 'Property Category',
      relationTo: 'property-categories',
      required: false,
      hasMany: false,
      admin: {
        position: 'sidebar',
        description: 'e.g. Luxury, Beachfront',
      },
    },

    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Active properties are visible to the public.',
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
      },
    },

    {
      name: 'location',
      type: 'text',
      label: 'Specific Location',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Specific area within the city (e.g. Uluwatu, South Jakarta)',
      },
    },

    // ── Property Specs (Inline Row) ───────────────────────────────────────
    {
      type: 'row',
      fields: [
        {
          name: 'bedrooms',
          type: 'number',
          label: 'Bedrooms',
          required: false,
          min: 0,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'bathrooms',
          type: 'number',
          label: 'Bathrooms',
          required: false,
          min: 0,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'buildArea',
          type: 'number',
          label: 'Build Area (m²)',
          required: false,
          admin: {
            width: '34%',
            description: 'Total built-up area in square metres',
          },
        },
      ],
    },

    {
      name: 'landArea',
      type: 'number',
      label: 'Land Area (m²)',
      required: false,
      admin: {
        description: 'Total land/plot area in square metres',
      },
    },

    // ── Pricing (Conditional) ───────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Sale Pricing',
      admin: {
        condition: (data) => data.listingType === 'sale' || data.listingType === 'both',
      },
      fields: [
        {
          name: 'purchasePrice',
          type: 'text',
          label: 'Purchase Price Display',
          required: false,
          admin: {
            description: 'e.g. IDR 28.5 Billion, Price on request',
          },
        },
      ],
    },

    {
      type: 'collapsible',
      label: 'Rental Pricing',
      admin: {
        condition: (data) => data.listingType === 'rent' || data.listingType === 'both',
      },
      fields: [
        {
          name: 'rentalPrice',
          type: 'text',
          label: 'Rental Price Display',
          required: false,
          admin: {
            description: 'e.g. IDR 85 Juta / month',
          },
        },
      ],
    },

    // ── Images ───────────────────────────────────────
    {
      name: 'images',
      type: 'array',
      label: 'Property Images',
      required: true,
      minRows: 1,
      admin: {
        description: 'Upload images for this property. First image will be used as the hero image.',
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
          name: 'caption',
          type: 'text',
          label: 'Caption',
          required: false,
          localized: true,
        },
      ],
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
              name: 'description',
              type: 'textarea',
              label: 'Description',
              required: false,
              localized: true,
              admin: {
                description: 'Detailed description of the property.',
              },
            },

            {
              name: 'yearBuilt',
              type: 'number',
              label: 'Year Built',
              required: false,
              min: 1900,
              admin: {
                description: 'Year the property was built.',
              },
            },

            {
              name: 'dataPoints',
              type: 'array',
              label: 'Additional Data Points',
              required: false,
              admin: {
                description:
                  'Add custom property details, e.g. "Build Area" → "620 m²", "Garage" → "2 cars".',
              },
              fields: [
                {
                  name: 'dataName',
                  type: 'text',
                  label: 'Data Name',
                  required: true,
                  localized: true,
                  admin: {
                    description: 'e.g. Build Area, Garage, Pool Size',
                  },
                },
                {
                  name: 'dataDetail',
                  type: 'text',
                  label: 'Data Detail',
                  required: true,
                  admin: {
                    description: 'e.g. 620 m², 2 cars, 12 m × 6 m',
                  },
                },
              ],
            },

            {
              name: 'features',
              type: 'array',
              label: 'Features',
              required: false,
              admin: {
                description: 'List all features and amenities this property offers.',
              },
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  label: 'Feature',
                  required: true,
                  localized: true,
                  admin: {
                    description: 'e.g. Ocean Views, Infinity Pool, Smart Home System',
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
