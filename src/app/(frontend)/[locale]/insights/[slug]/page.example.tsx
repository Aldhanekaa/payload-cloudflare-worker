import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import PageContainer from '@/components/PageContainer'

import SmHeroBg1 from '@/components/Home/svg-assets/sm-hero-bg-1'
import HeroBg from '@/components/Home/svg-assets/hero-bg-1'
import { LocaleCodes } from '@/i18n/localization'
import { RelatedPostsSlider } from '@/components/Posts/RelatedPostsSlider'
import { getCachedCollection } from '@/utilities/getCollection'

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise })
//   const posts = await payload.find({
//     collection: 'posts',
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,

//     pagination: false,
//     select: {
//       slug: true,
//     },
//   })

//   const params = posts.docs.map(({ slug }) => {
//     return { slug }
//   })

//   return params
// }

type Args = {
  params: Promise<{
    slug?: string
    locale?: LocaleCodes
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()

  const { slug = '', locale = 'en' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug, locale, draft })

  // console.log('post', post)

  if (!post) return <PayloadRedirects url={url} />

  return (
    <React.Fragment>
      <div className="w-full h-full absolute overflow-y-hidden">
        <HeroBg
          height="2000"
          bottomLocation="1250"
          topLocation="300"
          className=" -z-30 absolute hidden md:block top-[0%] md:top-[3%] lg:top-[0%] xl:top-[-6%] lg:scale-100 scale-150 "
        />
        <SmHeroBg1 className=" md:hidden -z-20 absolute top-[0%] sm:top-[0%] " />
      </div>
      <main className="pb-16 relative ">
        <PageClient />

        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}
        <PageContainer>
          <div className="px-3 lg:px-10">
            <div className=" shadow-xl bg-white shadow-secondaryForeground">
              <PostHero post={post} />

              <div className="flex flex-col items-center gap-4 pt-8">
                <div className="container">
                  <RichText
                    className="max-w-[48rem] mx-auto post text-secondary"
                    data={post.content}
                    enableGutter={false}
                  />
                  {post.relatedPosts && post.relatedPosts.length > 0 && (
                    <RelatedPostsSlider
                      className="mt-16 max-w-[52rem] mx-auto w-full"
                      docs={post.relatedPosts as Post[]}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </main>
    </React.Fragment>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale = 'en' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const { isEnabled: draft } = await draftMode()
  const post = await queryPostBySlug({ slug: decodedSlug, locale, draft })

  return generateMeta({ doc: post })
}

const queryPostBySlug = async ({
  slug,
  locale,
  draft,
}: {
  slug: string
  locale: LocaleCodes
  draft: boolean
}) => {
  const result = await getCachedCollection(
    {
      collection: 'posts',
      draft,
      limit: 1,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
    },
    locale,
  )()

  return result.docs?.[0] || null
}
