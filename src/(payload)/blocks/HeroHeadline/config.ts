import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const HeroHeadline: Block = {
  slug: 'heroHeadline',
  interfaceName: 'HeroHeadlineBlock',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Welcome',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      defaultValue: '',
    },
    colorPickerField({
      name: 'backgroundColor',
      label: 'Background Color',
      defaultValue: '#D7F205',
    }),
    colorPickerField({
      name: 'textColor',
      label: 'Text Color',
      defaultValue: '#334155',
    }),
  ],
}
