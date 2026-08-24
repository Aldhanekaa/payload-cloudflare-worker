import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { colorPickerField } from '@/(payload)/plugins/colorPicker'

export const Steps: Block = {
  slug: 'steps',
  interfaceName: 'StepsBlock',
  fields: [
    colorPickerField({
      name: 'badgeColor',
      label: 'Badge Color',
      defaultValue: '#D7F205',
    }),
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          required: true,
        },
      ],
      required: true,
      minRows: 1,
    },
  ],
}
