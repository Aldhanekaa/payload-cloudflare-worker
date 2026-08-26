import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const HomeExpertise: Block = {
  slug: 'homeExpertise',
  interfaceName: 'HomeExpertiseBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Our Expertise',
    },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Comprehensive service across every stage of your property journey',
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        {
          title: 'Property Acquisition',
          description:
            'End-to-end buyer representation: from market mapping and due diligence to negotiation and transaction close.',
          href: '#acquisition',
        },
        {
          title: 'Sales & Marketing',
          description:
            'Tailored campaigns for exceptional properties — strategic positioning, bespoke assets, and targeted outreach.',
          href: '#sales',
        },
        {
          title: 'Development Consulting',
          description:
            'Advisory for land assembly, concept development, and go-to-market strategy for residential projects.',
          href: '#development',
        },
        {
          title: 'Private Property Search',
          description:
            'Confidential, off-market sourcing for clients seeking properties not publicly listed.',
          href: '#private-search',
        },
      ],
    },
    {
      name: 'learnMoreLabel',
      type: 'text',
      defaultValue: 'Learn More',
    },
    colorPickerField({
      name: 'backgroundColor',
      label: 'Background Color',
      defaultValue: '#f7f5f0',
    }),
    colorPickerField({
      name: 'eyebrowColor',
      label: 'Eyebrow Color',
      defaultValue: '#b89a5b',
    }),
    colorPickerField({
      name: 'titleColor',
      label: 'Title Color',
      defaultValue: '#0a0a0a',
    }),
    colorPickerField({
      name: 'serviceTitleColor',
      label: 'Service Title Color',
      defaultValue: '#0a0a0a',
    }),
    colorPickerField({
      name: 'serviceDescriptionColor',
      label: 'Service Description Color',
      defaultValue: '#a5a19a',
    }),
    colorPickerField({
      name: 'learnMoreColor',
      label: 'Learn More Link Color',
      defaultValue: '#b89a5b',
    }),
    colorPickerField({
      name: 'iconColor',
      label: 'Icon Color',
      defaultValue: '#a5a19a',
    }),
    colorPickerField({
      name: 'cardBorderColor',
      label: 'Card Border Color',
      defaultValue: '#e5e0d7',
    }),
    colorPickerField({
      name: 'cardBorderHoverColor',
      label: 'Card Border Hover Color',
      defaultValue: '#b89a5b',
    }),
  ],
}
