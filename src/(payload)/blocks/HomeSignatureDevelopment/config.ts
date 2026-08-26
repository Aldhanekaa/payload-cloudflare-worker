import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const HomeSignatureDevelopment: Block = {
  slug: 'homeSignatureDevelopment',
  interfaceName: 'HomeSignatureDevelopmentBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Signature Development',
    },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Andersen Residences\nNo. 01',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Our first proprietary development: a collection of six architect-designed villas in Seminyak, redefining modern tropical living with considered materials and refined spatial planning.',
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { label: 'Location', value: 'Seminyak, Bali' },
        { label: 'Property Type', value: 'Private Villas' },
        { label: 'Residences', value: '6 Units' },
        { label: 'Completion', value: 'Q2 2026' },
        { label: 'Starting Price', value: 'IDR 18.5 Billion' },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Explore the Development',
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '/properties/andersen-residences-01',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    colorPickerField({
      name: 'backgroundColor',
      label: 'Background Color',
      defaultValue: '#0e0e0e',
    }),
    colorPickerField({
      name: 'eyebrowColor',
      label: 'Eyebrow Color',
      defaultValue: '#D7F205',
    }),
    colorPickerField({
      name: 'titleColor',
      label: 'Title Color',
      defaultValue: '#ffffff',
    }),
    colorPickerField({
      name: 'descriptionColor',
      label: 'Description Color',
      defaultValue: 'rgba(255,255,255,0.6)',
    }),
    colorPickerField({
      name: 'statLabelColor',
      label: 'Stat Label Color',
      defaultValue: 'rgba(255,255,255,0.4)',
    }),
    colorPickerField({
      name: 'statValueColor',
      label: 'Stat Value Color',
      defaultValue: 'rgba(255,255,255,0.9)',
    }),
    colorPickerField({
      name: 'dividerColor',
      label: 'Divider Color',
      defaultValue: 'rgba(255,255,255,0.1)',
    }),
    colorPickerField({
      name: 'ctaBorderColor',
      label: 'CTA Border Color',
      defaultValue: 'rgba(208,186,122,0.7)',
    }),
    colorPickerField({
      name: 'ctaTextColor',
      label: 'CTA Text Color',
      defaultValue: '#D7F205',
    }),
    colorPickerField({
      name: 'ctaHoverBgColor',
      label: 'CTA Hover Background Color',
      defaultValue: '#D7F205',
    }),
    colorPickerField({
      name: 'ctaHoverTextColor',
      label: 'CTA Hover Text Color',
      defaultValue: '#ffffff',
    }),
  ],
}
