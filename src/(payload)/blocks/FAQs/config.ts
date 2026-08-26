import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const FAQs: Block = {
  slug: 'faqs',
  interfaceName: 'FAQsBlock',
  fields: [
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Frequently Asked\nQuestions',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue: 'Answers to common questions about working with Andersen Properties.',
    },
    {
      name: 'faqs',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
      defaultValue: [
        {
          question: 'How do you select the listings you represent?',
          answer:
            'We apply rigorous criteria: architectural merit, location quality, build standards, and long-term value. Only properties that meet our standards are accepted into our portfolio.',
        },
        {
          question: 'Do you offer access to off-market properties?',
          answer:
            'Yes. Through our network of architects, developers, and private sellers, we regularly source properties not publicly listed.',
        },
        {
          question: 'Which locations do you cover?',
          answer:
            'Our primary markets are Bali, Jakarta, Bandung, Surabaya, and Lombok — with selective representation in other Indonesian cities.',
        },
        {
          question: 'Do you work with international buyers?',
          answer:
            'Absolutely. We assist international clients with local regulations, legal structures, financing options, and on-ground logistics.',
        },
        {
          question: 'What post-purchase support do you provide?',
          answer:
            'We coordinate property handover, recommend trusted service providers (management, design, contractors), and remain available for ongoing consultation.',
        },
      ],
    },
    colorPickerField({
      name: 'backgroundColor',
      label: 'Background Color',
      defaultValue: '#f5f2eb',
    }),
    colorPickerField({
      name: 'titleColor',
      label: 'Title Color',
      defaultValue: '#1a1a1a',
    }),
    colorPickerField({
      name: 'subtitleColor',
      label: 'Subtitle Color',
      defaultValue: '#888',
    }),
    colorPickerField({
      name: 'questionColor',
      label: 'Question Color',
      defaultValue: '#1a1a1a',
    }),
    colorPickerField({
      name: 'questionHoverColor',
      label: 'Question Hover Color',
      defaultValue: '#a8894a',
    }),
    colorPickerField({
      name: 'answerColor',
      label: 'Answer Color',
      defaultValue: '#555',
    }),
    colorPickerField({
      name: 'dividerColor',
      label: 'Divider Color',
      defaultValue: '#d6d0c4',
    }),
    colorPickerField({
      name: 'toggleIconColor',
      label: 'Toggle Icon Color',
      defaultValue: '#888',
    }),
  ],
}
