import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/(payload)/blocks/RenderBlocks'
import { RenderHero } from '@/(payload)/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise })
//   const pages = await payload.find({
//     collection: 'pages',
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   })

//   const params = pages.docs
//     ?.filter((doc) => {
//       return doc.slug !== 'home'
//     })
//     .map(({ slug }) => {
//       return { slug }
//     })

//   return params
// }

type Args = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = ['home'] } = await paramsPromise
  // Decode to support slugs with special characters

  // console.log('PAGE SLUG', slug)
  const decodedSlug = `${slug.join('/')}`
  // decodedSlug = decodedSlug.replace(/%2F/gi, '/')
  const url = '/' + decodedSlug

  // console.log('decodedSlug', decodedSlug)

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: decodedSlug,
  })

  // console.log('PAGE DATA', page)

  // // Remove this code once your website is seeded
  // if (!page && slug === 'home') {
  //   page = homeStatic
  // }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  // Fetch the header global for navigation
  // const payload = await getPayload({ config: configPromise })

  const { hero, layout } = page

  const bodyBackgroundColor = getSafeHexColor(page.backgroundColor)

  return (
    <>
      {bodyBackgroundColor && <style>{`body { background-color: ${bodyBackgroundColor}; }`}</style>}

      <main className="pb-24 relative">
        <PageClient />
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} />
      </main>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = ['home'] } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = slug.join('/')
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  return result.docs?.[0] || null
})

const HEX_COLOR_REGEX = /^#(?:[0-9a-fA-F]{3}){1,2}(?:[0-9a-fA-F]{2})?$/

const getSafeHexColor = (value: unknown): string | null => {
  if (typeof value !== 'string') return null

  const trimmedValue = value.trim()
  return HEX_COLOR_REGEX.test(trimmedValue) ? trimmedValue : null
}
