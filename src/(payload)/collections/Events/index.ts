import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { revalidateEvent, revalidateDeleteEvent } from './hooks/revalidateEvent'
import crypto from 'crypto'

const richTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HorizontalRuleFeature(),
    LinkFeature({
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'link_appearance',
          label: 'Link Apperance',
          type: 'select',
          hasMany: false,
          defaultValue: 'default',
          required: true,
          options: ['default', 'button-filled', 'button-outline'],
        },
      ],
    }),
  ],
})

const postEventRichTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HorizontalRuleFeature(),
  ],
})

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'season', 'startDate', 'location', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    // ── Top-level fields (always visible, outside tabs) ────────
    {
      name: 'name',
      type: 'text',
      label: 'Event Name',
      required: true,
      localized: true,
    },

    {
      name: 'isEventChampionship',
      type: 'checkbox',
      label: 'Is It Championship?',
      required: true,
      defaultValue: true,
    },

    // ── Sidebar fields ─────────────────────────────────────────
    {
      name: 'season',
      type: 'relationship',
      label: 'Season Game',
      relationTo: 'season-games',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Select the season game this event belongs to',
      },
    },
    {
      name: 'firstProgram',
      type: 'text',
      virtual: 'season.program',
      admin: {
        description: 'Generated automatically',
      },
    },
    {
      name: 'year',
      type: 'number',
      virtual: 'season.year',
      admin: {
        description: 'Generated automatically',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'mapsLink',
      type: 'text',
      label: 'Google Maps Link',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Google Maps URL for the event venue. Make sure to paste the embed link.',
      },
    },

    {
      name: 'eventInformationDetails',
      type: 'richText',
      label: 'Event Information Details',
      required: false,
      localized: true,
      editor: richTextEditor,

      admin: {
        position: 'sidebar',
        description: 'Information about the event itself (not the competition)',
      },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      label: 'Posts Related to This Event',
      admin: {
        position: 'sidebar',
        description: 'Blog posts related to this event',
      },

      hasMany: true,
      relationTo: 'posts',
    },

    // ── Tabs ───────────────────────────────────────────────────
    {
      type: 'tabs',
      tabs: [
        // ── Tab: General ───────────────────────────────────────
        {
          label: 'General',
          fields: [
            {
              name: 'first_event_id',
              type: 'text',
              label: "FIRST's Event Id (e.g. IDCMP)",
              required: false,
              admin: {
                description:
                  'This can be acquired once the event is officially registered on FIRST.',
              },
            },
            {
              name: 'event_slug',
              type: 'text',
              label: 'Event Slug',
              required: true,
              admin: {
                description: 'Event Slug',
                readOnly: true,
              },
              hooks: {
                beforeChange: [
                  async ({ value, siblingData, operation }) => {
                    // console.log('VALUE ', value)
                    // 1. Check your sibling data condition
                    // For example, only generate if a sibling field named 'status' is 'active'
                    if (siblingData && !siblingData.first_event_id) {
                      // 2. Prevent overwriting if a value already exists (e.g., during updates)
                      if (
                        (operation === 'update' || operation == 'create') &&
                        !String(value).endsWith('_')
                      ) {
                        // Generate a secure random string (or use Math.random() for simple cases)
                        return `${crypto.randomBytes(8).toString('hex')}_`
                      }
                    }

                    if (siblingData.first_event_id) {
                      // 3. Return the existing value if conditions aren't met
                      return siblingData.first_event_id
                    }
                  },
                ],
              },
            },

            {
              name: 'description',
              type: 'text',
              label: 'Event Description',
              required: true,
              localized: true,
            },
            {
              name: 'guidebook_link',
              type: 'text',
              label: 'Event Guidebook Link',
              required: false,
            },
            {
              name: 'broadcast_link',
              type: 'text',
              label: 'Event Broadcast Link',
              required: false,
            },
            {
              name: 'thumbnail',
              type: 'upload',
              label: 'Event Thumbnail',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'overrideNav',
              type: 'relationship',
              label: 'Override Navigation',
              relationTo: 'navigations',
              hasMany: false,
              required: false,
              admin: {
                description: 'Pick a navigation type to override the default.',
              },
            },
            // ── Registration ───────────────────────────────────
            {
              name: 'registrationForVolunteer',
              type: 'checkbox',
              label: 'Is Volunteer Registration Open?',
              defaultValue: false,
            },
            {
              name: 'volunteerRegistrationLink',
              type: 'text',
              label: 'Volunteer Registration Link (Optional)',
              admin: {
                description:
                  'Registering for volunteer takes place via FIRST dashboard, but if there is a case to register via google form, input the link here.',
              },
            },
          ],
        },

        // ── Tab: Details ───────────────────────────────────────
        {
          label: 'Details',
          fields: [
            {
              name: 'informations',
              type: 'array',
              label: 'Informations',
              required: false,
              admin: {
                description:
                  'Here you may write like "Accomodation" in the title, then write the content about hotels, etc.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  required: true,
                  localized: true,
                  admin: {
                    description: 'Headline title that will be placed on the image.',
                  },
                },
                {
                  name: 'content',
                  type: 'richText',
                  label: 'Content',
                  required: true,
                  localized: true,
                  editor: richTextEditor,
                },
              ],
            },
            {
              name: 'guestStars',
              type: 'array',
              label: 'Guest Stars',
              required: false,
              admin: {
                description: 'Notable guests and speakers at the event',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Name',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title / Role',
                  required: false,
                  localized: true,
                  admin: {
                    description: 'e.g. "Depok\'s Mayor", "Commercial Attaché of the US Embassy"',
                  },
                },
                {
                  name: 'photo',
                  type: 'upload',
                  label: 'Photo',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },

        // ── Tab: Media & Sponsors ──────────────────────────────
        {
          label: 'Media & Sponsors',
          fields: [
            {
              name: 'sponsors',
              type: 'array',
              label: 'Sponsors',
              required: false,
              admin: {
                description: 'Sponsor logos or media',
              },
              fields: [
                {
                  name: 'photo',
                  type: 'upload',
                  label: 'Sponsor Logo',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'name',
                  type: 'text',
                  label: 'Sponsor Name',
                  required: true,
                },
              ],
            },
            {
              name: 'featuredIn',
              type: 'array',
              label: 'Featured In',
              required: false,
              admin: {
                description: 'Media outlets or publications that covered this event',
              },
              fields: [
                {
                  name: 'media',
                  type: 'upload',
                  label: 'Media / Logo',
                  relationTo: 'media',
                  required: false,
                },
                {
                  name: 'link',
                  type: 'text',
                  label: 'Coverage Link',
                  required: false,
                  admin: {
                    description: 'URL to the article or coverage',
                  },
                },
              ],
            },
          ],
        },

        // ── Tab: Post-Event ────────────────────────────────────
        {
          label: 'Post-Event',
          fields: [
            {
              name: 'isTheEventEnded',
              type: 'checkbox',
              label: 'Is Event Ended?',
              defaultValue: false,
            },

            // ── Stats (sidebar) ──────────────────────────────
            {
              name: 'countriesCount',
              type: 'number',
              label: 'Number of Countries Participated',
              required: false,
              min: 1,
              admin: {
                position: 'sidebar',
                condition: (_data, siblingData) => Boolean(siblingData?.isTheEventEnded),
              },
            },
            {
              name: 'teamsCount',
              type: 'number',
              label: 'Number of Teams Participated',
              required: false,
              min: 0,
              admin: {
                position: 'sidebar',
                condition: (_data, siblingData) => Boolean(siblingData?.isTheEventEnded),
              },
            },
            {
              name: 'studentsCount',
              type: 'number',
              label: 'Number of Students Participated',
              required: false,
              min: 0,
              admin: {
                position: 'sidebar',
                condition: (_data, siblingData) => Boolean(siblingData?.isTheEventEnded),
              },
            },

            // ── Recap ────────────────────────────────────────
            {
              name: 'recapDescription',
              type: 'richText',
              label: 'Event Recap Description',
              localized: true,
              editor: postEventRichTextEditor,
              required: true,
              admin: {
                condition: (_data, siblingData) => Boolean(siblingData?.isTheEventEnded),
              },
            },
            {
              name: 'specialThanks',
              type: 'richText',
              label: 'Special Thanks',
              localized: true,
              editor: postEventRichTextEditor,
              required: false,
              admin: {
                condition: (_data, siblingData) => Boolean(siblingData?.isTheEventEnded),
              },
            },

            // ── Media ────────────────────────────────────────
            {
              name: 'videoRecap',
              type: 'text',
              label: 'Video Recap URL',
              required: false,
              admin: {
                description: 'URL to the event recap video (YouTube, Vimeo, etc.)',
                condition: (_data, siblingData) => Boolean(siblingData?.isTheEventEnded),
              },
            },
            {
              name: 'highlights',
              type: 'array',
              label: 'Event Highlights',
              required: true,
              minRows: 3,
              maxRows: 3,
              admin: {
                description: 'Pick 3 best photos in the event',
                condition: (_data, siblingData) => Boolean(siblingData?.isTheEventEnded),
              },
              fields: [
                {
                  name: 'photo',
                  type: 'upload',
                  label: 'Activity Photo',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'photos',
              type: 'array',
              label: 'Event Photos',
              required: true,
              admin: {
                description: 'Photo gallery from the event',
                condition: (_data, siblingData) => Boolean(siblingData?.isTheEventEnded),
              },
              fields: [
                {
                  name: 'photo',
                  type: 'upload',
                  label: 'Activity Photo',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },

            // ── Schedule / Agenda ────────────────────────────
            {
              name: 'schedule',
              type: 'array',
              label: 'Event Schedule',
              required: true,
              admin: {
                description: 'Day-by-day agenda entries for the event',
                condition: (_data, siblingData) => Boolean(siblingData?.isTheEventEnded),
              },
              fields: [
                {
                  name: 'day',
                  type: 'number',
                  label: 'Day Number',
                  required: true,
                  min: 1,
                },
                {
                  name: 'date',
                  type: 'date',
                  label: 'Date',
                  required: true,
                  admin: {
                    date: { pickerAppearance: 'dayOnly' },
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Activity Title',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Activity Description',
                  required: true,
                  localized: true,
                },
                {
                  name: 'photo',
                  type: 'upload',
                  label: 'Activity Photo',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },

            // ── Awards & Posts ───────────────────────────────
            {
              name: 'team_first_winners',
              type: 'array',
              label: 'Team 1st Winners (Championship Winner)',
              required: false,
              admin: {
                condition: (_data, siblingData) => Boolean(siblingData?.isTheEventEnded),
              },
              fields: [
                {
                  name: 'team',
                  type: 'relationship',
                  label: 'Team',
                  relationTo: 'teams',
                },
              ],
            },

            {
              name: 'team_second_winners',
              type: 'array',
              label: 'Team 2nd Winners (Championship Finalists)',
              required: false,
              admin: {
                condition: (_data, siblingData) => Boolean(siblingData?.isTheEventEnded),
              },
              fields: [
                {
                  name: 'team',
                  type: 'relationship',
                  label: 'Team',
                  relationTo: 'teams',
                },
              ],
            },

            {
              type: 'join',
              name: 'team-awards',
              collection: 'awards',
              on: 'event',
            },
            {
              type: 'join',
              name: 'leadership-awards',
              collection: 'leadership-awards',
              on: 'event',
            },
          ],
        },

        // ── Tab: SEO ───────────────────────────────────────────
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateEvent],
    afterDelete: [revalidateDeleteEvent],
  },
  timestamps: true,
}
