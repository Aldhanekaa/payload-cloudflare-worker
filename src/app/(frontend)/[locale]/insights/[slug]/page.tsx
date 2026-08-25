import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import PageContainer from '@/components/PageContainer'
import { getCachedCollection } from '@/utilities/getCollection'
import { ENABLE_DUMMY_FALLBACK } from '@/config/fallback'
import type { LocaleCodes } from '@/i18n/localization'
import type { Media, Category, Post } from '@/payload-types'
import { POSTS } from '@/components/Insights/insights.data'
import RichText from '@/components/RichText'
import { RelatedPosts } from '@/(payload)/blocks/RelatedPosts/Component'
import { generateLocalizedMeta } from '@/utilities/generateLocalizedMeta'
import { JsonLd } from '@/components/JsonLd'
import { getServerSideURL } from '@/utilities/getURL'

interface PageProps {
  params: Promise<{
    locale: LocaleCodes
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params

  const result = await getCachedCollection(
    {
      collection: 'posts',
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    },
    locale,
  )()

  const cmsPost = result.docs[0] as any

  let title = cmsPost?.meta?.title || cmsPost?.title
  let description = cmsPost?.meta?.description || cmsPost?.short_overview || cmsPost?.subTitle
  let image: string | Media | null = cmsPost?.meta?.image || cmsPost?.heroImage || null
  let publishedTime = cmsPost?.publishedAt || undefined

  if (!title && ENABLE_DUMMY_FALLBACK.posts) {
    const dummyPost = POSTS.find((p) => p.slug === slug)
    if (dummyPost) {
      title = dummyPost.title
      description = dummyPost.excerpt
      image = dummyPost.imageUrl
    }
  }

  return generateLocalizedMeta({
    title: title ? `${title} — Insights` : 'Insight',
    description: description || 'Perspectives on property and place from Andersen Properties.',
    path: `/insights/${slug}`,
    locale,
    image,
    type: 'article',
    publishedTime,
  })
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug, locale } = await params

  // Try to fetch from CMS
  const result = await getCachedCollection(
    {
      collection: 'posts',
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    },
    locale,
  )()

  const cmsPost = result.docs[0] as any

  // Use CMS data or fallback to dummy data
  let post: any = null

  if (cmsPost) {
    // Transform CMS data
    const heroImageData =
      typeof cmsPost.heroImage === 'object' ? (cmsPost.heroImage as Media) : null
    const firstCategory = cmsPost.categories?.[0]
    const categoryData = typeof firstCategory === 'object' ? (firstCategory as Category) : null

    post = {
      slug: cmsPost.slug || String(cmsPost.id),
      title: cmsPost.title || '',
      subTitle: cmsPost.subTitle || '',
      subTitleItalic: cmsPost.subTitleItalic || '',
      category: categoryData?.title || 'Insights',
      date: cmsPost.publishedAt
        ? new Date(cmsPost.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '',
      readTime: '5 min read',
      short_overview: cmsPost.short_overview || '',
      heroImage: {
        url: heroImageData?.url || '',
        alt: heroImageData?.alt || cmsPost.title || '',
      },
      content: cmsPost.content,
      relatedPosts: cmsPost.relatedPosts || [],
    }
  } else if (ENABLE_DUMMY_FALLBACK.posts) {
    // Fallback to dummy data
    const dummyPost = POSTS.find((p) => p.slug === slug)
    if (dummyPost) {
      post = {
        slug: dummyPost.slug,
        title: dummyPost.title,
        subTitle: '',
        subTitleItalic: '',
        category: dummyPost.category,
        date: dummyPost.date,
        readTime: dummyPost.readTime,
        short_overview: dummyPost.excerpt,
        heroImage: {
          url: dummyPost.imageUrl,
          alt: dummyPost.imageAlt,
        },
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: dummyPost.excerpt || 'Content coming soon...',
                  },
                ],
              },
            ],
          },
        },
        relatedPosts: [],
      }
    }
  }

  if (!post) {
    notFound()
  }

  const serverUrl = getServerSideURL()
  const pageUrl = `${serverUrl}/${locale}/insights/${slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.short_overview || post.subTitle,
    url: pageUrl,
    image: post.heroImage?.url ? [post.heroImage.url] : undefined,
    datePublished: cmsPost?.publishedAt || undefined,
    author: {
      '@type': 'Organization',
      name: 'Andersen Properties',
      url: serverUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Andersen Properties',
      url: serverUrl,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${serverUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Insights',
        item: `${serverUrl}/${locale}/insights`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: pageUrl,
      },
    ],
  }

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd]} />
      {/* Hero Section */}
      <div className="bg-[#0a0a0a] pt-[clamp(80px,10vw,120px)] pb-[clamp(60px,8vw,100px)]">
        <PageContainer>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-[11px] text-white/40">
            <a href="/insights" className="hover:text-white/60 transition-colors">
              Insights
            </a>
            <span>/</span>
            <span className="text-white/60">{post.title}</span>
          </div>

          {/* Category & Meta */}
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <span className="text-[10px] tracking-[0.14em] uppercase text-[#b89a5b] font-medium">
              {post.category}
            </span>
            <span className="text-[#e5e0d7] text-sm">—</span>
            <span className="text-[11px] text-white/50">{post.date}</span>
            <span className="text-[#e5e0d7] text-sm">—</span>
            <span className="text-[11px] text-white/50">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1
            className="text-white font-normal leading-[1.08] tracking-[-0.01em] mb-4 max-w-4xl"
            style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: 'clamp(32px, 5vw, 56px)',
            }}
          >
            {post.title}
          </h1>

          {/* Subtitle */}
          {post.subTitle && (
            <p className="text-white/70 text-[18px] leading-[1.6] font-light max-w-3xl">
              {post.subTitle}
              {post.subTitleItalic && <em className="italic ml-1">{post.subTitleItalic}</em>}
            </p>
          )}

          {/* Short Overview */}
          {post.short_overview && (
            <p className="text-white/60 text-[15px] leading-[1.7] font-light max-w-2xl mt-6">
              {post.short_overview}
            </p>
          )}
        </PageContainer>
      </div>

      {/* Hero Image */}
      {post.heroImage?.url && (
        <div className="relative w-full min-h-[700px] ">
          <Image
            src={post.heroImage.url}
            alt={post.heroImage.alt}
            fill
            className=" object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <PageContainer className="py-[clamp(60px,8vw,100px)]">
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          {post.content && (
            <RichText
              className="prose prose-lg prose-stone max-w-none text-[#242424]"
              data={post.content}
              enableGutter={false}
              enableProse={true}
            />
          )}

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-16">
              <RelatedPosts
                className="max-w-none"
                docs={post.relatedPosts.filter(
                  (p: Post | string): p is Post => typeof p === 'object',
                )}
              />
            </div>
          )}

          {/* Back to Insights */}
          <div className="mt-16 pt-8 border-t border-[#e5e0d7]">
            <a
              href="/insights"
              className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#0a0a0a] hover:text-[#b89a5b] transition-colors font-medium"
            >
              <span>←</span>
              <span>Back to Insights</span>
            </a>
          </div>
        </div>
      </PageContainer>
    </main>
  )
}
