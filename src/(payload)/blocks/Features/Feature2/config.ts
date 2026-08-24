import type { Block } from 'payload'

export const Feature2: Block = {
  slug: 'feature2',
  interfaceName: 'Feature2Block',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Blocks built with Shadcn & Tailwind',
    },
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
