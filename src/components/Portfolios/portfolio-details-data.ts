export interface PortfolioDetailData {
  images: {
    url: string
    alt: string
  }[]
  architect: string
  description: string
  highlights: string[]
}

export const PORTFOLIO_DETAILS: Record<string, PortfolioDetailData> = {
  '1': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&auto=format',
        alt: 'Andersen Residences No. 01 - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop&auto=format',
        alt: 'Andersen Residences No. 01 - view 2',
      },
      {
        url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&h=800&fit=crop&auto=format',
        alt: 'Andersen Residences No. 01 - view 3',
      },
      {
        url: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&h=800&fit=crop&auto=format',
        alt: 'Andersen Residences No. 01 - view 4',
      },
      {
        url: 'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=1200&h=800&fit=crop&auto=format',
        alt: 'Andersen Residences No. 01 - view 5',
      },
    ],
    architect: 'Studio Kali Architecture',
    description:
      'A limited collection of contemporary tropical homes shaped by natural materials, considered proportions, and seamless indoor-outdoor living. Each residence in Andersen Residences No. 01 is individually designed - no two floor plans are identical - responding to the specific orientation, views, and character of its plot within the estate. Crafted in collaboration with Studio Kali Architecture, the collection represents our most deliberate work to date.',
    highlights: [
      'Natural stone and reclaimed timber',
      'Individually designed floor plans',
      'Private pools and garden pavilions',
      'Freehold title available',
      'Completion Q3 2026',
    ],
  },
  '2': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&h=800&fit=crop&auto=format',
        alt: 'The Dago Collection - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&auto=format',
        alt: 'The Dago Collection - view 2',
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&auto=format',
        alt: 'The Dago Collection - view 3',
      },
    ],
    architect: 'Adi Purnomo Architects',
    description:
      "Set against the backdrop of Bandung's highland landscape, The Dago Collection reimagines residential living through a lens of contemporary colonial design. Each home features generous ceiling heights, natural ventilation systems, and carefully framed views of the surrounding mountains. The development sold out within six months of launch.",
    highlights: [
      'Contemporary colonial architecture',
      'Mountain and city views',
      'Private gardens and terraces',
      'Smart home integration',
      'Completed Q1 2025',
    ],
  },
  '3': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop&auto=format',
        alt: 'Senopati Urban Residences - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&auto=format',
        alt: 'Senopati Urban Residences - view 2',
      },
    ],
    architect: 'RDMA Architecture',
    description:
      "A boutique apartment development in South Jakarta's most dynamic neighborhood. Senopati Urban Residences demonstrates that high-density urban living can be both luxurious and livable. Floor-to-ceiling windows, private balconies, and curated amenities create a sanctuary in the city center.",
    highlights: [
      'Prime Senopati location',
      'Boutique scale - only 18 units',
      'Private lift access',
      'Rooftop terrace and pool',
      'Walking distance to dining and culture',
    ],
  },
  '4': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop&auto=format',
        alt: 'Lombok Coastal Villas - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200&h=800&fit=crop&auto=format',
        alt: 'Lombok Coastal Villas - view 2',
      },
      {
        url: 'https://images.unsplash.com/photo-1602391833977-358a52198938?w=1200&h=800&fit=crop&auto=format',
        alt: 'Lombok Coastal Villas - view 3',
      },
    ],
    architect: 'Tropical Design Studio',
    description:
      "Eight exclusive beachfront villas on Lombok's pristine southern coastline. Each villa is positioned to maximize ocean views and capture cooling sea breezes, with direct beach access and private infinity pools. This development represents a rare opportunity for true beachfront living in Indonesia.",
    highlights: [
      'Direct beachfront access',
      'Infinity pools with ocean views',
      'Modern tropical architecture',
      'Sunrise and sunset views',
      'Freehold available',
    ],
  },
  '5': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=1200&h=800&fit=crop&auto=format',
        alt: 'Ubud Forest Villas - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop&auto=format',
        alt: 'Ubud Forest Villas - view 2',
      },
    ],
    architect: 'Bamboo Architecture Collective',
    description:
      "Six eco-luxury villas nestled in Ubud's lush jungle setting. Built using sustainable materials including bamboo, reclaimed teak, and local stone, these villas demonstrate that luxury and environmental responsibility can coexist. All units sold within three months to environmentally conscious buyers.",
    highlights: [
      'Sustainable bamboo construction',
      'Solar power integration',
      'Natural swimming pools',
      'Rice field and jungle views',
      'Walking distance to Ubud center',
    ],
  },
  '6': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&fit=crop&auto=format',
        alt: 'Kemang Creative Quarter - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop&auto=format',
        alt: 'Kemang Creative Quarter - view 2',
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop&auto=format',
        alt: 'Kemang Creative Quarter - view 3',
      },
    ],
    architect: 'Studio Persegi',
    description:
      "Ten design-forward residences in Jakarta's creative heart. Kemang Creative Quarter features flexible living spaces, double-height studios, and architecture that celebrates natural light. Designed for the contemporary professional who values both aesthetics and functionality.",
    highlights: [
      'Award-winning architecture',
      'Flexible live-work spaces',
      'Gallery-quality interiors',
      'Private rooftop studios',
      'Launch Q1 2027',
    ],
  },
}
