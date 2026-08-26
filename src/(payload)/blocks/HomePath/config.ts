import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const HomePath: Block = {
  slug: 'homePath',
  interfaceName: 'HomePathBlock',
  fields: [
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Our Path to Your\nPerfect Property',
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
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
      ],
      defaultValue: [
        {
          number: '01',
          title: 'Understand',
          description:
            'We begin by understanding your vision, priorities, and long-term goals — no generic questionnaires.',
        },
        {
          number: '02',
          title: 'Curate',
          description:
            'Using our network and market intelligence, we assemble a shortlist tailored to your criteria.',
        },
        {
          number: '03',
          title: 'Experience',
          description:
            "Private viewings coordinated around your schedule, with full context on each property's story and potential.",
        },
        {
          number: '04',
          title: 'Complete',
          description:
            'End-to-end transaction support: legal review, negotiation, and post-close coordination.',
        },
      ],
    },
    colorPickerField({
      name: 'backgroundColor',
      label: 'Background Color',
      defaultValue: '#f7f5f0',
    }),
    colorPickerField({
      name: 'titleColor',
      label: 'Title Color',
      defaultValue: '#0a0a0a',
    }),
    colorPickerField({
      name: 'stepNumberColor',
      label: 'Step Number Color',
      defaultValue: '#b89a5b',
    }),
    colorPickerField({
      name: 'stepNumberBorderColor',
      label: 'Step Number Border Color',
      defaultValue: '#b89a5b',
    }),
    colorPickerField({
      name: 'stepTitleColor',
      label: 'Step Title Color',
      defaultValue: '#0a0a0a',
    }),
    colorPickerField({
      name: 'stepDescriptionColor',
      label: 'Step Description Color',
      defaultValue: '#a5a19a',
    }),
    colorPickerField({
      name: 'connectorColor',
      label: 'Connector Line Color',
      defaultValue: '#b89a5b',
    }),
  ],
}
