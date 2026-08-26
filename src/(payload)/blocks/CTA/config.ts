import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const CTA: Block = {
  slug: 'andersen_cta',
  interfaceName: 'CTABlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Get Started',
    },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Ready to find your\nnext property?',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue:
        'Schedule a private consultation to discuss your vision, explore our portfolio, and begin your property journey with Andersen.',
    },
    {
      name: 'ctaPrimary',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Schedule a Consultation',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          defaultValue: '/contact',
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
          defaultValue: 'Chat on WhatsApp',
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
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    colorPickerField({
      name: 'backgroundColor',
      label: 'Background Color',
      defaultValue: '#0a0a0a',
    }),
    {
      name: 'imageOpacity',
      type: 'text',
      defaultValue: '0.25',
      admin: {
        description: 'Image opacity between 0 and 1 (e.g., 0.25)',
      },
    },
    colorPickerField({
      name: 'eyebrowColor',
      label: 'Eyebrow Color',
      defaultValue: '#b89a5b',
    }),
    colorPickerField({
      name: 'titleColor',
      label: 'Title Color',
      defaultValue: '#ffffff',
    }),
    colorPickerField({
      name: 'subtitleColor',
      label: 'Subtitle Color',
      defaultValue: 'rgba(255,255,255,0.55)',
    }),
    colorPickerField({
      name: 'ctaPrimaryBgColor',
      label: 'Primary CTA Background Color',
      defaultValue: '#b89a5b',
    }),
    colorPickerField({
      name: 'ctaPrimaryHoverBgColor',
      label: 'Primary CTA Hover Background Color',
      defaultValue: '#a5894f',
    }),
    colorPickerField({
      name: 'ctaPrimaryTextColor',
      label: 'Primary CTA Text Color',
      defaultValue: '#0a0a0a',
    }),
    colorPickerField({
      name: 'ctaSecondaryBorderColor',
      label: 'Secondary CTA Border Color',
      defaultValue: 'rgba(255,255,255,0.25)',
    }),
    colorPickerField({
      name: 'ctaSecondaryHoverBorderColor',
      label: 'Secondary CTA Hover Border Color',
      defaultValue: 'rgba(255,255,255,0.5)',
    }),
    colorPickerField({
      name: 'ctaSecondaryTextColor',
      label: 'Secondary CTA Text Color',
      defaultValue: 'rgba(255,255,255,0.8)',
    }),
    colorPickerField({
      name: 'ctaSecondaryHoverTextColor',
      label: 'Secondary CTA Hover Text Color',
      defaultValue: '#ffffff',
    }),
  ],
}
