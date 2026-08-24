export type PortfolioStatus = 'active' | 'sold-out' | 'coming-soon'

export type Portfolio = {
  id: string
  slug: string
  status: PortfolioStatus
  category: string
  name: string
  location: string
  city: string
  tagline: string
  units: number
  completion: string
  from: string
  image: { src: string; alt: string }
}

export const PORTFOLIOS: Portfolio[] = [
  {
    id: '1',
    slug: 'andersen-residences-no-01',
    status: 'active',
    category: 'Villa Collection',
    name: 'Andersen Residences No. 01',
    location: 'Seminyak, Bali',
    city: 'Bali',
    tagline: 'Contemporary tropical living, distilled.',
    units: 12,
    completion: 'Q3 2026',
    from: 'IDR 35 Billion',
    image: {
      src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&auto=format',
      alt: 'Andersen Residences No. 01',
    },
  },
  {
    id: '2',
    slug: 'the-dago-collection',
    status: 'sold-out',
    category: 'Residential Houses',
    name: 'The Dago Collection',
    location: 'Dago, Bandung',
    city: 'Bandung',
    tagline: 'Highland living, re-imagined.',
    units: 24,
    completion: 'Q1 2025',
    from: 'IDR 8.5 Billion',
    image: {
      src: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&h=800&fit=crop&auto=format',
      alt: 'The Dago Collection',
    },
  },
  {
    id: '3',
    slug: 'senopati-urban-residences',
    status: 'sold-out',
    category: 'Boutique Apartments',
    name: 'Senopati Urban Residences',
    location: 'South Jakarta',
    city: 'Jakarta',
    tagline: "Considered density in the city's heart.",
    units: 18,
    completion: 'Q4 2024',
    from: 'IDR 5.2 Billion',
    image: {
      src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop&auto=format',
      alt: 'Senopati Urban Residences',
    },
  },
  {
    id: '4',
    slug: 'lombok-coastal-villas',
    status: 'active',
    category: 'Beachfront Villas',
    name: 'Lombok Coastal Villas',
    location: 'Kuta, Lombok',
    city: 'Lombok',
    tagline: 'Where Lombok meets the sea.',
    units: 8,
    completion: 'Q2 2026',
    from: 'IDR 22 Billion',
    image: {
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop&auto=format',
      alt: 'Lombok Coastal Villas',
    },
  },
  {
    id: '5',
    slug: 'ubud-forest-villas',
    status: 'sold-out',
    category: 'Eco Villas',
    name: 'Ubud Forest Villas',
    location: 'Ubud, Bali',
    city: 'Bali',
    tagline: 'Jungle living, elevated.',
    units: 6,
    completion: 'Q4 2023',
    from: 'IDR 9.5 Billion',
    image: {
      src: 'https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=1200&h=800&fit=crop&auto=format',
      alt: 'Ubud Forest Villas',
    },
  },
  {
    id: '6',
    slug: 'kemang-creative-quarter',
    status: 'coming-soon',
    category: 'Design Residences',
    name: 'Kemang Creative Quarter',
    location: 'Kemang, Jakarta',
    city: 'Jakarta',
    tagline: 'Designed for how you actually live.',
    units: 10,
    completion: 'Q3 2027',
    from: 'IDR 11 Billion',
    image: {
      src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&fit=crop&auto=format',
      alt: 'Kemang Creative Quarter',
    },
  },
]

export const CITIES = ['All Cities', 'Bali', 'Bandung', 'Jakarta', 'Lombok'] as const
export type CityFilter = (typeof CITIES)[number]

export type StatusFilter = 'all' | PortfolioStatus
