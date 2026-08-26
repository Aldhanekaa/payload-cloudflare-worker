import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const HomeConsiderationSteps: Block = {
  slug: 'homeConsiderationSteps',
  interfaceName: 'HomeConsiderationStepsBlock',
  fields: [
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Why choose\nAndersen Properties?',
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
          title: 'Curated Selection',
          description:
            'We represent only properties that meet our standards for design, craftsmanship, and location — no filler, no volume.',
        },
        {
          number: '02',
          title: 'Market Intelligence',
          description:
            'Deep knowledge of local development patterns, investment potential, and architectural context across all our markets.',
        },
        {
          number: '03',
          title: 'White-Glove Service',
          description:
            'From first viewing to final handover, we manage every detail — legal, logistical, and personal.',
        },
        {
          number: '04',
          title: 'Enduring Value',
          description:
            'Properties chosen for long-term appreciation, architectural merit, and quality of life — not short-term trends.',
        },
      ],
    },
    colorPickerField({
      name: 'backgroundColor',
      label: 'Background Color',
      defaultValue: '#111110',
    }),
    colorPickerField({
      name: 'titleColor',
      label: 'Title Color',
      defaultValue: '#ffffff',
    }),
    colorPickerField({
      name: 'stepNumberColor',
      label: 'Step Number Color',
      defaultValue: '#c8b97a',
    }),
    colorPickerField({
      name: 'stepTitleColor',
      label: 'Step Title Color',
      defaultValue: '#ffffff',
    }),
    colorPickerField({
      name: 'stepDescriptionColor',
      label: 'Step Description Color',
      defaultValue: 'rgba(255,255,255,0.4)',
    }),
    colorPickerField({
      name: 'dividerColor',
      label: 'Divider Color',
      defaultValue: 'rgba(255,255,255,0.1)',
    }),
  ],
}
