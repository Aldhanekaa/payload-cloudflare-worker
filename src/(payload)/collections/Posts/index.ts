import type { CollectionConfig } from 'payload'

import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import { MediaBlock } from '@/(payload)/blocks/MediaBlock/config'
import { Banner } from '@/(payload)/blocks/Banner/config'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'
import { authenticated } from '@/(payload)/access/authenticated'
import { authenticatedOrPublished } from '@/(payload)/access/authenticatedOrPublished'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

const INSIGHT_CATEGORIES: { label: string; value: string }[] = [
  { label: 'Architecture', value: 'architecture' },
  { label: 'Market Insight', value: 'market-insight' },
  { label: "Buyer's Guide", value: 'buyers-guide' },
  { label: 'Design', value: 'design' },
  { label: 'Lifestyle', value: 'lifestyle' },
]

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    slug: true,
    heroImage: true,
    publishedAt: true,
  },
  admin: {
    custom: {
      rightPanel: true,
      comments: true,
      drafts: true,
    },
    defaultColumns: ['title', 'slug', 'category', 'featured', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'posts',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'posts',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    // ── Primary Information ───────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'The main title of the insight article.',
      },
    },
    slugField({
      useAsSlug: 'title',
      localized: true,
    }),

    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt',
      localized: true,
      required: true,
      admin: {
        description:
          'Write a short excerpt that will be displayed on the insights grid. This should be a compelling summary of the article.',
      },
    },

    // ── Classification (Sidebar) ───────────────────────────────────────
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      required: true,
      hasMany: false,
      options: INSIGHT_CATEGORIES,
      admin: {
        position: 'sidebar',
        description: 'Select the primary category for this insight article.',
      },
    },

    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Article',
      admin: {
        position: 'sidebar',
        description:
          "If checked, this article will be displayed as the featured article on the insights page when 'All' category is selected.",
      },
    },

    // ── Metadata (Sidebar) ───────────────────────────────────────
    {
      name: 'readTime',
      type: 'text',
      label: 'Read Time',
      required: true,
      defaultValue: '5 min read',
      admin: {
        position: 'sidebar',
        description: 'Estimated reading time (e.g., "5 min read", "10 min read").',
      },
    },

    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },

    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },

    // ── Hero Image ───────────────────────────────────────
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
      required: true,
      admin: {
        description: 'Main image for the insight article.',
      },
    },

    {
      name: 'imageAlt',
      type: 'text',
      label: 'Hero Image Alt Text',
      localized: true,
      required: true,
      admin: {
        description: 'Descriptive alt text for the hero image for accessibility.',
      },
    },

    // ── Tabs ───────────────────────────────────────────────────
    {
      type: 'tabs',
      tabs: [
        // ── Tab: Content ───────────────────────────────────────
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                    IndentFeature(),
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
                    UnderlineFeature(),
                    SuperscriptFeature(),
                    SubscriptFeature(),
                    ParagraphFeature(),
                    AlignFeature(),
                    BlockquoteFeature(),
                    ChecklistFeature(),
                    OrderedListFeature(),
                    UnorderedListFeature(),
                    ItalicFeature(),
                    StrikethroughFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
        },
        // ── Tab: Related ───────────────────────────────────────
        {
          label: 'Related',
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: {
                description:
                  'Select related insight articles to display at the end of this article.',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'posts',
            },
          ],
        },
        // ── Tab: SEO ───────────────────────────────────────
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
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },

    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
