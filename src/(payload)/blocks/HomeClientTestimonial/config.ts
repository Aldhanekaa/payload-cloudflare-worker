import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const HomeClientTestimonial: Block = {
  slug: 'homeClientTestimonial',
  interfaceName: 'HomeClientTestimonialBlock',
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      defaultValue:
        'Working with Andersen Properties was a revelation. They understood exactly what we were looking for and introduced us to properties we would never have found on our own. The entire process — from viewing to closing — was handled with exceptional care and professionalism.',
    },
    {
      name: 'attribution',
      type: 'text',
      required: true,
      defaultValue: 'Michael Chen, Jakarta',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Read More Client Stories',
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '/client-stories',
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
      defaultValue: '#ffffff',
    }),
    colorPickerField({
      name: 'quoteColor',
      label: 'Quote Text Color',
      defaultValue: '#0a0a0a',
    }),
    colorPickerField({
      name: 'attributionColor',
      label: 'Attribution Color',
      defaultValue: '#a5a19a',
    }),
    colorPickerField({
      name: 'ctaColor',
      label: 'CTA Color',
      defaultValue: '#b89a5b',
    }),
    colorPickerField({
      name: 'ruleColor',
      label: 'Rule Color',
      defaultValue: '#b89a5b',
    }),
  ],
}
