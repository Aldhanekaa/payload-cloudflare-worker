import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const HomeJournalSection: Block = {
  slug: 'homeJournalSection',
  interfaceName: 'HomeJournalSectionBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'The Journal',
    },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Insights & Ideas',
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      defaultValue: 'View All Articles',
    },
    {
      name: 'viewAllHref',
      type: 'text',
      defaultValue: '/insights',
    },
    {
      name: 'readTimeLabel',
      type: 'text',
      defaultValue: 'min read',
    },
    {
      name: 'noPostsMessage',
      type: 'text',
      defaultValue: 'No articles available at the moment.',
    },
    {
      name: 'dataSource',
      type: 'select',
      required: true,
      defaultValue: 'auto',
      options: [
        {
          label: 'Auto Query (Latest 3 Published)',
          value: 'auto',
        },
        {
          label: 'Manual Selection',
          value: 'manual',
        },
      ],
    },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      max: 6,
      admin: {
        condition: (data) => data.dataSource === 'manual',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 6,
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
      defaultValue: '#c8b97a',
    }),
    colorPickerField({
      name: 'titleColor',
      label: 'Title Color',
      defaultValue: '#1a1a1a',
    }),
    colorPickerField({
      name: 'categoryColor',
      label: 'Category Color',
      defaultValue: '#c8b97a',
    }),
    colorPickerField({
      name: 'dateColor',
      label: 'Date Color',
      defaultValue: '#aaa',
    }),
    colorPickerField({
      name: 'postTitleColor',
      label: 'Post Title Color',
      defaultValue: '#1a1a1a',
    }),
    colorPickerField({
      name: 'postTitleHoverColor',
      label: 'Post Title Hover Color',
      defaultValue: '#a8894a',
    }),
    colorPickerField({
      name: 'readTimeColor',
      label: 'Read Time Color',
      defaultValue: '#aaa',
    }),
    colorPickerField({
      name: 'viewAllColor',
      label: 'View All Link Color',
      defaultValue: '#1a1a1a',
    }),
  ],
}
