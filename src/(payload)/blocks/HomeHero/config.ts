import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const HomeHero: Block = {
  slug: 'homeHero',
  interfaceName: 'HomeHeroBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: "Indonesia's Premier Real Estate",
    },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Contemporary Living,\nRefined by Design',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue:
        "Curated properties across Indonesia's most desirable locations — from modernist villas in Bali to architectural residences in Jakarta.",
    },
    {
      name: 'ctaPrimary',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'View Active Listings',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          defaultValue: '/active-listings',
        },
      ],
    },
    {
      name: 'ctaSecondary',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Speak with an Advisor',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          defaultValue: 'https://wa.me/62812345678',
        },
      ],
    },
    {
      name: 'scrollIndicator',
      type: 'text',
      defaultValue: 'Scroll to explore',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    colorPickerField({
      name: 'backgroundColor',
      label: 'Background Color',
      defaultValue: '#000000',
    }),
    {
      name: 'overlayOpacity',
      type: 'text',
      defaultValue: '0.48',
      admin: {
        description: 'Opacity value between 0 and 1 (e.g., 0.48)',
      },
    },
    colorPickerField({
      name: 'textColor',
      label: 'Text Color',
      defaultValue: '#ffffff',
    }),
    colorPickerField({
      name: 'eyebrowColor',
      label: 'Eyebrow Color',
      defaultValue: '#D7F205',
    }),
    colorPickerField({
      name: 'ctaPrimaryBgColor',
      label: 'Primary CTA Background Color',
      defaultValue: '#D7F205',
    }),
    colorPickerField({
      name: 'ctaPrimaryTextColor',
      label: 'Primary CTA Text Color',
      defaultValue: '#0a0a0a',
    }),
    colorPickerField({
      name: 'ctaSecondaryBorderColor',
      label: 'Secondary CTA Border Color',
      defaultValue: 'rgba(255,255,255,0.4)',
    }),
    colorPickerField({
      name: 'ctaSecondaryTextColor',
      label: 'Secondary CTA Text Color',
      defaultValue: '#ffffff',
    }),
  ],
}
