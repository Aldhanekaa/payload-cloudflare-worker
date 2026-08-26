'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import PageContainer from '@/components/PageContainer'
import DefaultImg from '@/assets/ANDERSEN_PROPERTIES_DEFAULT_IMG.avif'
import { ENABLE_DUMMY_FALLBACK } from '@/config/fallback'
import type { Post, Media, Category } from '@/payload-types'

// ── Types ──────────────────────────────────────────────────────────────────────

type JournalPost = {
  category: string
  date: string
  title: string
  readTime: string
  href: string
  image: {
    src: Parameters<typeof Image>[0]['src']
    alt: string
  }
}

type Props = {
  posts: Post[]
  eyebrow?: string
  title?: string
  viewAllLabel?: string
  viewAllHref?: string
  readTimeLabel?: string
  noPostsMessage?: string
}

// ── Transform CMS data to component format ─────────────────────────────────

function transformPostData(posts: Post[], readTimeLabel: string): JournalPost[] {
  return posts.map((post) => {
    const heroImageData = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null
    const categoryValue =
      typeof post.category === 'object' ? (post.category as Category).title : 'Article'

    // Format date
    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return 'Recent'
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    }

    // Format read time
    const readTime = post.readTime ? `${post.readTime} ${readTimeLabel}` : `5 ${readTimeLabel}`

    return {
      category: categoryValue,
      date: formatDate(post.publishedAt),
      title: post.title,
      readTime,
      href: `/insights/${post.slug}`,
      image: {
        src: heroImageData?.url || DefaultImg,
        alt: post.imageAlt || post.title,
      },
    }
  })
}

// ── Placeholder data (replace with Payload fetch) ─────────────────────────────

const POSTS: JournalPost[] = [
  {
    category: 'Architecture',
    date: 'July 2025',
    title: 'The New Language of Tropical Modernism',
    readTime: '6 min read',
    href: '/journal/tropical-modernism',
    image: { src: DefaultImg, alt: 'Tropical modernist architecture' },
  },
  {
    category: 'Market Insight',
    date: 'June 2025',
    title: 'Where Luxury Property Is Moving in Indonesia',
    readTime: '8 min read',
    href: '/journal/luxury-property-indonesia',
    image: { src: DefaultImg, alt: 'Indonesia skyline at dusk' },
  },
  {
    category: "Buyer's Guide",
    date: 'May 2025',
    title: 'A Considered Guide to Buying Property in Bali',
    readTime: '10 min read',
    href: '/journal/buying-guide-bali',
    image: { src: DefaultImg, alt: 'Bali villa interior' },
  },
]

// ── Component ──────────────────────────────────────────────────────────────────

export function HomeJournalSectionClient({
  posts: cmsPosts,
  eyebrow = 'The Journal',
  title = 'Insights & Ideas',
  viewAllLabel = 'View All Articles',
  viewAllHref = '/insights',
  readTimeLabel = 'min read',
  noPostsMessage = 'No articles available at the moment.',
}: Props) {
  // Use CMS data or fallback to dummy data
  const journalPosts = useMemo(() => {
    if (cmsPosts.length > 0 || !ENABLE_DUMMY_FALLBACK.posts) {
      return transformPostData(cmsPosts, readTimeLabel)
    }
    return POSTS
  }, [cmsPosts, readTimeLabel])

  return (
    <section className="bg-white py-20 md:py-28">
      <PageContainer>
        {/* Header row */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="text-[#c8b97a] text-[10px] tracking-[0.25em] uppercase mb-3">{eyebrow}</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-[#1a1a1a] m-0 whitespace-pre-line">
              {title}
            </h2>
          </div>

          <Link
            href={viewAllHref}
            className="hidden md:inline-flex items-center gap-2 text-[#1a1a1a] text-[10px] tracking-[0.2em] uppercase font-medium no-underline hover:opacity-60 transition-opacity duration-200 shrink-0 mb-2"
          >
            {viewAllLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Cards grid */}
        {journalPosts.length === 0 ? (
          <p className="text-[#a5a19a] text-sm py-24 text-center">{noPostsMessage}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-12">
            {journalPosts.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group flex flex-col gap-0 no-underline"
              >
                {/* Image */}
                <div className="relative w-full aspect-4/3 overflow-hidden mb-6">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#c8b97a] text-xs tracking-[0.2em] uppercase">
                    {post.category}
                  </span>
                  <span className="text-[#d6d0c4] text-xs">/</span>
                  <span className="text-[#aaa] text-xs tracking-wide">{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-[#1a1a1a] text-xl md:text-2xl font-light leading-snug m-0 mb-4 group-hover:text-[#a8894a] transition-colors duration-200">
                  {post.title}
                </h3>

                {/* Read time */}
                <p className="text-[#aaa] text-xs tracking-widest m-0">{post.readTime}</p>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile — view all link */}
        <div className="mt-10 md:hidden">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 text-[#1a1a1a] text-[10px] tracking-[0.2em] uppercase font-medium no-underline hover:opacity-60 transition-opacity duration-200"
          >
            {viewAllLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </PageContainer>
    </section>
  )
}
