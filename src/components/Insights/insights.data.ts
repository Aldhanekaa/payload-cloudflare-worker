export type InsightCategory =
  'All' | 'Architecture' | 'Market Insight' | "Buyer's Guide" | 'Design' | 'Lifestyle'

export type InsightPost = {
  slug: string
  category: Exclude<InsightCategory, 'All'>
  date: string
  readTime: string
  title: string
  excerpt: string
  imageUrl: string
  imageAlt: string
  featured?: boolean
}

export const CATEGORIES: InsightCategory[] = [
  'All',
  'Architecture',
  'Market Insight',
  "Buyer's Guide",
  'Design',
  'Lifestyle',
]

export const POSTS: InsightPost[] = [
  {
    slug: 'tropical-modernism',
    category: 'Architecture',
    date: 'July 12, 2025',
    readTime: '6 min read',
    title: 'The New Language of Tropical Modernism',
    excerpt:
      'Contemporary architects across Bali and Lombok are developing a new architectural grammar — one that draws deeply from local materials and climate while speaking an unmistakably global design language.',
    imageUrl:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=700&h=480&fit=crop&auto=format',
    imageAlt: 'The New Language of Tropical Modernism',
    featured: true,
  },
  {
    slug: 'luxury-property-indonesia',
    category: 'Market Insight',
    date: 'June 28, 2025',
    readTime: '8 min read',
    title: 'Where Luxury Property Is Moving in Indonesia',
    excerpt: '',
    imageUrl:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&h=480&fit=crop&auto=format',
    imageAlt: 'Where Luxury Property Is Moving in Indonesia',
  },
  {
    slug: 'buying-guide-bali',
    category: "Buyer's Guide",
    date: 'May 15, 2025',
    readTime: '10 min read',
    title: 'A Considered Guide to Buying Property in Bali',
    excerpt: '',
    imageUrl:
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=700&h=480&fit=crop&auto=format',
    imageAlt: 'A Considered Guide to Buying Property in Bali',
  },
  {
    slug: 'natural-stone-indonesian-homes',
    category: 'Design',
    date: 'April 8, 2025',
    readTime: '5 min read',
    title: 'Natural Stone in Contemporary Indonesian Homes',
    excerpt: '',
    imageUrl:
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=700&h=480&fit=crop&auto=format',
    imageAlt: 'Natural Stone in Contemporary Indonesian Homes',
  },
  {
    slug: 'bandung-weekend-home',
    category: 'Lifestyle',
    date: 'March 20, 2025',
    readTime: '7 min read',
    title: 'The Rise of the Bandung Weekend Home',
    excerpt: '',
    imageUrl:
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=700&h=480&fit=crop&auto=format',
    imageAlt: 'The Rise of the Bandung Weekend Home',
  },
  {
    slug: 'leasehold-vs-freehold',
    category: 'Market Insight',
    date: 'February 5, 2025',
    readTime: '9 min read',
    title: 'Understanding Leasehold vs Freehold in Indonesia',
    excerpt: '',
    imageUrl:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&h=480&fit=crop&auto=format',
    imageAlt: 'Understanding Leasehold vs Freehold in Indonesia',
  },
]
