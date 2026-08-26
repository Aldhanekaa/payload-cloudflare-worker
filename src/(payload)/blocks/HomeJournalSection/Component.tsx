import { getCachedCollection } from '@/utilities/getCollection'
import type { Post } from '@/payload-types'
import { HomeJournalSectionClient } from './Client'

interface HomeJournalSectionProps {
  eyebrow?: string
  title?: string
  viewAllLabel?: string
  viewAllHref?: string
  readTimeLabel?: string
  noPostsMessage?: string
  dataSource?: 'auto' | 'manual'
  posts?: (string | Post)[]
  limit?: number
}

export const HomeJournalSection = async ({
  dataSource = 'auto',
  posts: manualPosts,
  limit = 3,
  ...rest
}: HomeJournalSectionProps) => {
  let posts: Post[] = []

  if (dataSource === 'auto') {
    // Auto-query the latest published posts
    const result = await getCachedCollection(
      {
        collection: 'posts',
        depth: 1,
        limit,
        where: {
          _status: {
            equals: 'published',
          },
        },
        sort: '-publishedAt',
      },
      'en', // Default locale
    )()
    posts = result.docs as Post[]
  } else if (manualPosts && manualPosts.length > 0) {
    // Use manually selected posts
    posts = manualPosts.filter((p): p is Post => typeof p === 'object') as Post[]
  }

  return <HomeJournalSectionClient posts={posts} {...rest} />
}
