import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const Feature1: Block = {
  slug: 'feature1',
  interfaceName: 'Feature1Block',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Blocks built with Shadcn & Tailwind',
    },
    colorPickerField({
      name: 'secondaryColor',
      label: 'Secondary Color',
      required: true,
      defaultValue: '#0000',
    }),

    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'buttonPrimary',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Get Started',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          defaultValue: '#',
        },
      ],
    },
    {
      name: 'buttonSecondary',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Learn More',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          defaultValue: '#',
        },
      ],
    },
  ],
}
