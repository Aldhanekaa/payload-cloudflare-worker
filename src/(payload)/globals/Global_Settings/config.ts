import type { GlobalConfig } from 'payload'
import { link } from '@/(payload)/fields/link'

export const GlobalSettings: GlobalConfig = {
  slug: 'global-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact Information',
          fields: [
            {
              type: 'group',
              name: 'whatsapp',
              label: 'WhatsApp Contact',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'countryCode',
                      type: 'text',
                      label: 'Country Code',
                      required: true,
                      defaultValue: '+1',
                      admin: {
                        width: '30%',
                        placeholder: '+1',
                        description: 'Include the + symbol (e.g., +1, +44, +971)',
                      },
                    },
                    {
                      name: 'number',
                      type: 'text',
                      label: 'WhatsApp Number',
                      required: true,
                      admin: {
                        width: '70%',
                        placeholder: '1234567890',
                        description: 'Enter number without spaces or special characters',
                      },
                      validate: (value: string) => {
                        if (!value) return true
                        const phoneRegex = /^[0-9]+$/
                        if (!phoneRegex.test(value)) {
                          return 'Please enter only numbers without spaces or special characters'
                        }
                        return true
                      },
                    },
                  ],
                },
                {
                  name: 'displayText',
                  type: 'text',
                  label: 'Display Text (Optional)',
                  admin: {
                    placeholder: 'Contact us on WhatsApp',
                    description: 'Text to display alongside WhatsApp number',
                  },
                },
              ],
            },
            {
              name: 'scheduleConsultationLink',
              type: 'text',
              label: 'Schedule Consultation Link',
              admin: {
                placeholder: 'https://calendly.com/your-link',
                description: 'External link for scheduling consultations (e.g., Calendly, Cal.com)',
              },
              validate: (value: string) => {
                if (!value) return true
                try {
                  new URL(value)
                  return true
                } catch {
                  return 'Please enter a valid URL'
                }
              },
            },
          ],
        },
        {
          label: 'Announcements',
          fields: [
            {
              name: 'announcements',
              type: 'array',
              label: 'Site Announcements',
              admin: {
                description: 'Manage important announcements displayed across the site',
                initCollapsed: true,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'isActive',
                      type: 'checkbox',
                      label: 'Active',
                      defaultValue: true,
                      admin: {
                        width: '15%',
                      },
                    },
                    {
                      name: 'priority',
                      type: 'select',
                      label: 'Priority',
                      defaultValue: 'normal',
                      options: [
                        {
                          label: 'High',
                          value: 'high',
                        },
                        {
                          label: 'Normal',
                          value: 'normal',
                        },
                        {
                          label: 'Low',
                          value: 'low',
                        },
                      ],
                      admin: {
                        width: '25%',
                      },
                    },
                  ],
                },
                {
                  name: 'announcement',
                  type: 'textarea',
                  label: 'Announcement Text',
                  required: true,
                  admin: {
                    placeholder: 'Enter your announcement here...',
                    rows: 3,
                  },
                },
                link({
                  appearances: ['default', 'outline'],
                  required: false,
                  name: 'announcementLink',
                  label: 'Announcement Link (Optional)',
                  overrides: {
                    admin: {
                      description: 'Optional link for users to learn more or take action',
                    },
                  },
                }),
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'startDate',
                      type: 'date',
                      label: 'Start Date (Optional)',
                      admin: {
                        width: '50%',
                        date: {
                          pickerAppearance: 'dayAndTime',
                        },
                        description: 'When to start displaying this announcement',
                      },
                    },
                    {
                      name: 'endDate',
                      type: 'date',
                      label: 'End Date (Optional)',
                      admin: {
                        width: '50%',
                        date: {
                          pickerAppearance: 'dayAndTime',
                        },
                        description: 'When to stop displaying this announcement',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Promotions',
          fields: [
            link({
              appearances: ['default', 'outline'],
              required: false,
              name: 'currentSeasonPromotionLink',
              label: 'Current Season Promotion Link',
              overrides: {
                admin: {
                  description:
                    'Link label for seasonal promotions (e.g., Learn More & Get Involved)',
                },
              },
            }),
          ],
        },
      ],
    },
  ],
  // hooks: {
  //   afterChange: [revalidateHeader],
  // },
}
