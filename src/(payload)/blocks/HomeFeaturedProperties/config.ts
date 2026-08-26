import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const HomeFeaturedProperties: Block = {
  slug: 'homeFeaturedProperties',
  interfaceName: 'HomeFeaturedPropertiesBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Active Listings',
    },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Featured Properties',
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      defaultValue: 'View All Properties',
    },
    {
      name: 'viewAllHref',
      type: 'text',
      defaultValue: '/active-listings',
    },
    {
      name: 'viewPropertyLabel',
      type: 'text',
      defaultValue: 'View Property',
    },
    {
      name: 'bedLabel',
      type: 'text',
      defaultValue: 'Bed',
    },
    {
      name: 'noPropertiesMessage',
      type: 'text',
      defaultValue: 'No properties available at the moment.',
    },
    {
      name: 'filters',
      type: 'group',
      fields: [
        {
          name: 'allLabel',
          type: 'text',
          defaultValue: 'All',
        },
        {
          name: 'housesLabel',
          type: 'text',
          defaultValue: 'Houses',
        },
        {
          name: 'villasLabel',
          type: 'text',
          defaultValue: 'Villas',
        },
        {
          name: 'apartmentsLabel',
          type: 'text',
          defaultValue: 'Apartments',
        },
        {
          name: 'landLabel',
          type: 'text',
          defaultValue: 'Land',
        },
      ],
    },
    {
      name: 'dataSource',
      type: 'select',
      required: true,
      defaultValue: 'auto',
      options: [
        {
          label: 'Auto Query (Latest 5 Active)',
          value: 'auto',
        },
        {
          label: 'Manual Selection',
          value: 'manual',
        },
      ],
    },
    {
      name: 'properties',
      type: 'relationship',
      relationTo: 'properties',
      hasMany: true,
      max: 5,
      admin: {
        condition: (data) => data.dataSource === 'manual',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 10,
      admin: {
        condition: (data) => data.dataSource === 'auto',
      },
    },
    colorPickerField({
      name: 'backgroundColor',
      label: 'Background Color',
      defaultValue: '#ffffff',
    }),
    colorPickerField({
      name: 'eyebrowColor',
      label: 'Eyebrow Color',
      defaultValue: '#D7F205',
    }),
    colorPickerField({
      name: 'titleColor',
      label: 'Title Color',
      defaultValue: '#0a0a0a',
    }),
    colorPickerField({
      name: 'propertyNameColor',
      label: 'Property Name Color',
      defaultValue: '#0a0a0a',
    }),
    colorPickerField({
      name: 'propertyLocationColor',
      label: 'Property Location Color',
      defaultValue: '#a5a19a',
    }),
    colorPickerField({
      name: 'propertyStatsColor',
      label: 'Property Stats Color',
      defaultValue: '#a5a19a',
    }),
    colorPickerField({
      name: 'propertyPriceColor',
      label: 'Property Price Color',
      defaultValue: '#242424',
    }),
    colorPickerField({
      name: 'filterActiveColor',
      label: 'Active Filter Color',
      defaultValue: '#b89a5b',
    }),
    colorPickerField({
      name: 'filterInactiveColor',
      label: 'Inactive Filter Color',
      defaultValue: '#a5a19a',
    }),
    colorPickerField({
      name: 'filterBorderColor',
      label: 'Filter Border Color',
      defaultValue: '#e5e0d7',
    }),
    colorPickerField({
      name: 'viewAllColor',
      label: 'View All Link Color',
      defaultValue: '#0a0a0a',
    }),
    colorPickerField({
      name: 'viewAllBorderColor',
      label: 'View All Border Color',
      defaultValue: '#e5e0d7',
    }),
  ],
}
