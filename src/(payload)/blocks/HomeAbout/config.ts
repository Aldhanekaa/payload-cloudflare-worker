import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const HomeAbout: Block = {
  slug: 'homeAbout',
  interfaceName: 'HomeAboutBlock',
  fields: [
    {
      name: 'headline',
      type: 'textarea',
      required: true,
      defaultValue: 'About Andersen\nProperties',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        "We represent a new standard in Indonesian luxury real estate — one built on curation, intelligence, and integrity. Our portfolio focuses exclusively on contemporary architecture and design-forward properties across the country's most compelling markets.",
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Learn More About Us',
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '/about',
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { value: '12+', label: 'Years of Experience' },
        { value: '150+', label: 'Properties Sold' },
        { value: '8', label: 'Key Markets' },
      ],
    },
    colorPickerField({
      name: 'backgroundColor',
      label: 'Background Color',
      defaultValue: '#f5f2eb',
    }),
    colorPickerField({
      name: 'headlineColor',
      label: 'Headline Color',
      defaultValue: '#1a1a1a',
    }),
    colorPickerField({
      name: 'descriptionColor',
      label: 'Description Color',
      defaultValue: '#555',
    }),
    colorPickerField({
      name: 'ctaColor',
      label: 'CTA Color',
      defaultValue: '#a8894a',
    }),
    colorPickerField({
      name: 'dividerColor',
      label: 'Divider Color',
      defaultValue: '#d6d0c4',
    }),
    colorPickerField({
      name: 'statValueColor',
      label: 'Stat Value Color',
      defaultValue: '#1a1a1a',
    }),
    colorPickerField({
      name: 'statLabelColor',
      label: 'Stat Label Color',
      defaultValue: '#888',
    }),
  ],
}
