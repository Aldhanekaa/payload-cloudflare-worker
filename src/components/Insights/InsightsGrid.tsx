'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import PageContainer from '@/components/PageContainer'
import { CATEGORIES, POSTS, type InsightCategory, type InsightPost } from './insights.data'
import { ENABLE_DUMMY_FALLBACK } from '@/config/fallback'
import type { Post, Media, Category } from '@/payload-types'

type Props = {
  posts: Post[]
}

// ── Transform CMS data to component format ─────────────────────────────────

function transformPostData(posts: Post[]): InsightPost[] {
  return posts.map((p: any) => {
    const heroImageData = typeof p.heroImage === 'object' ? (p.heroImage as Media) : null
    const firstCategory = p.categories?.[0]
    const categoryData = typeof firstCategory === 'object' ? (firstCategory as Category) : null

    return {
      slug: p.slug || String(p.id),
      category: (categoryData?.title || 'Market Insight') as Exclude<InsightCategory, 'All'>,
      date: p.publishedAt
        ? new Date(p.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '',
      readTime: '5 min read', // Could be calculated or stored in CMS
      title: p.title || '',
      excerpt: p.short_overview || '',
      imageUrl: heroImageData?.url || '',
      imageAlt: heroImageData?.alt || p.title || '',
      featured: p.isFeatured || false,
    }
  })
}

// ── Article meta row ───────────────────────────────────────────────────────────

function ArticleMeta({ post }: { post: InsightPost }) {
  return (
    <div className="flex items-center gap-3 flex-wrap mb-2.5">
      <span className="text-[10px] tracking-[0.14em] uppercase text-[#b89a5b] font-medium">
        {post.category}
      </span>
      <span className="text-[#e5e0d7] text-sm" aria-hidden="true">
        —
      </span>
      <span className="text-[11px] text-[#a5a19a]">{post.date}</span>
      <span className="text-[#e5e0d7] text-sm" aria-hidden="true">
        —
      </span>
      <span className="text-[11px] text-[#a5a19a]">{post.readTime}</span>
    </div>
  )
}

// ── Featured article (large, 16/9) ────────────────────────────────────────────

function FeaturedArticle({ post }: { post: InsightPost }) {
  return (
    <div className="mb-16 pb-16 border-b border-[#e5e0d7]">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-15 items-start">
        {/* Image + meta + title */}
        <Link href={`/insights/${post.slug}`} className="no-underline group cursor-pointer block">
          <div className="relative overflow-hidden rounded-sm bg-[#e5e0d7] aspect-video mb-5">
            <Image
              src={post.imageUrl}
              alt={post.imageAlt}
              fill
              className="object-cover transition-transform duration-600 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 58vw"
              priority
            />
          </div>
          <ArticleMeta post={post} />
          <h2
            className="font-medium text-[#0a0a0a] leading-tight m-0 group-hover:text-[#b89a5b] transition-colors duration-200"
            style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: '26px',
            }}
          >
            {post.title}
          </h2>
        </Link>

        {/* Right — label + excerpt */}
        <div className="pt-2">
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#a5a19a] font-medium mb-5">
            Featured Article
          </p>
          <p className="text-[#242424] text-[15px] leading-[1.75] font-light m-0">{post.excerpt}</p>
        </div>
      </div>
    </div>
  )
}

// ── Regular article card (16/11) ──────────────────────────────────────────────

function ArticleCard({ post }: { post: InsightPost }) {
  return (
    <Link href={`/insights/${post.slug}`} className="no-underline group block cursor-pointer">
      <div
        className="relative overflow-hidden rounded-sm bg-[#e5e0d7] mb-5"
        style={{ aspectRatio: '16 / 11' }}
      >
        <Image
          src={post.imageUrl}
          alt={post.imageAlt}
          fill
          className="object-cover transition-transform duration-600 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <ArticleMeta post={post} />
      <h3
        className="font-medium text-[#0a0a0a] leading-tight m-0 group-hover:text-[#b89a5b] transition-colors duration-200"
        style={{
          fontFamily: 'var(--font-cormorant, serif)',
          fontSize: '20px',
        }}
      >
        {post.title}
      </h3>
    </Link>
  )
}

// ── Filter bar ─────────────────────────────────────────────────────────────────

function FilterBar({
  active,
  onChange,
}: {
  active: InsightCategory
  onChange: (cat: InsightCategory) => void
}) {
  return (
    <div className="bg-white border-b border-[#e5e0d7] sticky top-25 z-10">
      <PageContainer>
        <div className="flex gap-1 flex-wrap py-4">
          {CATEGORIES.map((cat) => {
            const isActive = cat === active
            return (
              <button
                key={cat}
                onClick={() => onChange(cat)}
                className="text-[11px] tracking-widest uppercase px-4 py-2 border cursor-pointer font-medium transition-colors duration-200"
                style={{
                  borderColor: isActive ? 'rgb(184,154,91)' : 'rgb(229,224,215)',
                  backgroundColor: isActive ? 'rgb(184,154,91)' : 'transparent',
                  color: isActive ? 'rgb(10,10,10)' : 'rgb(165,161,154)',
                  fontFamily: 'var(--font-inter, sans-serif)',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </PageContainer>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function InsightsGrid({ posts: cmsPosts }: Props) {
  // Use CMS data or fallback to dummy data
  const posts = useMemo(() => {
    if (cmsPosts.length > 0 || !ENABLE_DUMMY_FALLBACK.posts) {
      return transformPostData(cmsPosts)
    }
    return POSTS
  }, [cmsPosts])

  const [activeCategory, setActiveCategory] = useState<InsightCategory>('All')

  // All posts matching the current filter
  const filtered =
    activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory)

  // In "All" view: pull the featured post out and show it large, rest go to grid
  // In category view: show every matching post as a regular card
  const isAllView = activeCategory === 'All'
  const featuredPost = isAllView ? (filtered.find((p) => p.featured) ?? null) : null
  const gridPosts = isAllView ? filtered.filter((p) => !p.featured) : filtered

  return (
    <>
      <FilterBar active={activeCategory} onChange={setActiveCategory} />

      <PageContainer className="pt-14" style={{ paddingBottom: 'clamp(80px, 10vw, 120px)' }}>
        {/* Featured article — only in "All" view */}
        {featuredPost && <FeaturedArticle post={featuredPost} />}

        {/* Articles grid */}
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-8 md:gap-y-12">
            {gridPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-[#a5a19a] text-sm py-20 text-center">
            No articles in this category yet.
          </p>
        )}
      </PageContainer>
    </>
  )
}
