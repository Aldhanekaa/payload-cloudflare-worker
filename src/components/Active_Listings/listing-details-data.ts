export interface ListingDetailData {
  images: {
    url: string
    alt: string
  }[]
  landArea: string
  yearBuilt: number
  description: string
  note?: string
  features: string[]
}

export const LISTING_DETAILS: Record<string, ListingDetailData> = {
  '1': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop&auto=format',
        alt: 'The Aruna Residence - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&auto=format',
        alt: 'The Aruna Residence - view 2',
      },
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop&auto=format',
        alt: 'The Aruna Residence - view 3',
      },
    ],
    landArea: '850 m²',
    yearBuilt: 2021,
    description:
      'Perched on the cliff edge of Uluwatu, The Aruna Residence offers breathtaking ocean views and contemporary tropical design. This exceptional villa features floor-to-ceiling glass, infinity pools, and pavilion-style living spaces that blur the boundary between indoor and outdoor.',
    note: 'Fully furnished with bespoke interior design',
    features: [
      'Ocean Views',
      'Infinity Pool',
      'Private Beach Access',
      'Smart Home System',
      'Wine Cellar',
      'Home Cinema',
      'Gym',
      'Staff Quarters',
    ],
  },
  '2': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&auto=format',
        alt: 'Senopati Courtyard House - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&auto=format',
        alt: 'Senopati Courtyard House - view 2',
      },
    ],
    landArea: '500 m²',
    yearBuilt: 2019,
    description:
      'A modern interpretation of traditional Indonesian courtyard living in the heart of South Jakarta. This contemporary residence features a central garden with reflecting pool, connecting all living spaces through covered walkways.',
    note: 'Unfurnished - interior design services available',
    features: [
      'Central Courtyard',
      'Reflecting Pool',
      'Modern Design',
      'High Ceilings',
      'Two Kitchens',
      'Service Area',
      'Parking for 4',
    ],
  },
  '3': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop&auto=format',
        alt: 'The Terraces at Canggu - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop&auto=format',
        alt: 'The Terraces at Canggu - view 2',
      },
      {
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&auto=format',
        alt: 'The Terraces at Canggu - view 3',
      },
    ],
    landArea: '350 m²',
    yearBuilt: 2022,
    description:
      'Contemporary Balinese villa in prime Canggu location, walking distance to beaches and cafes. Features terraced rice field views, modern tropical design, and resort-style amenities.',
    note: 'Partially furnished',
    features: [
      'Rice Field Views',
      'Modern Tropical',
      'Pool',
      'Outdoor Kitchen',
      'Walking to Beach',
      'Parking',
    ],
  },
  '4': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&auto=format',
        alt: 'Dago Hills Residence - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&auto=format',
        alt: 'Dago Hills Residence - view 2',
      },
    ],
    landArea: '600 m²',
    yearBuilt: 2020,
    description:
      "Elegant hillside residence in Bandung's most prestigious neighborhood. Offers stunning city and mountain views, contemporary colonial architecture, and lush terraced gardens.",
    note: 'Unfurnished',
    features: [
      'City Views',
      'Mountain Views',
      'Terraced Garden',
      'Colonial Design',
      'Wine Storage',
      'Study',
      'Large Terrace',
    ],
  },
  '5': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop&auto=format',
        alt: 'Surabaya Garden Estate - view 1',
      },
    ],
    landArea: '1000 m²',
    yearBuilt: 2018,
    description:
      'Expansive garden estate in Pakuwon, featuring colonial-inspired architecture with modern amenities. Set on over 1000 m² of landscaped grounds with mature trees and multiple outdoor entertaining areas.',
    note: 'Partially furnished',
    features: [
      'Large Garden',
      'Colonial Style',
      'Guest House',
      'Pool',
      'BBQ Area',
      'Garage for 4',
      'Security',
    ],
  },
  '6': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&auto=format',
        alt: 'Oberoi Retreat - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop&auto=format',
        alt: 'Oberoi Retreat - view 2',
      },
    ],
    landArea: '650 m²',
    yearBuilt: 2023,
    description:
      'Brand new luxury villa in the exclusive Oberoi area of Seminyak. Walking distance to beach clubs and fine dining. Features minimalist design, smart home technology, and resort amenities.',
    note: 'Fully furnished with luxury finishes',
    features: [
      'Beach Proximity',
      'Smart Home',
      'Pool & Spa',
      'Modern Design',
      'Media Room',
      'Wine Fridge',
      'Maid Quarters',
    ],
  },
  '7': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop&auto=format',
        alt: 'Menteng Heritage Home - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop&auto=format',
        alt: 'Menteng Heritage Home - view 2',
      },
      {
        url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1200&h=800&fit=crop&auto=format',
        alt: 'Menteng Heritage Home - view 3',
      },
      {
        url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop&auto=format',
        alt: 'Menteng Heritage Home - view 4',
      },
    ],
    landArea: '800 m²',
    yearBuilt: 1940,
    description:
      "A heritage property in Menteng carefully restored and extended - preserving Dutch colonial proportions with contemporary interiors. Original terrazzo floors, high ceilings, and period timber joinery have been meticulously retained. A truly rare opportunity in one of Jakarta's most prestigious addresses.",
    note: 'Unfurnished - staging available on request',
    features: [
      'Heritage Listed',
      'Central Location',
      'Restored Original Features',
      'Formal Dining',
      'Library',
      'Original Terrazzo',
      'Period Joinery',
    ],
  },
  '8': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=1200&h=800&fit=crop&auto=format',
        alt: 'Ubud Forest Villa - view 1',
      },
    ],
    landArea: '250 m²',
    yearBuilt: 2021,
    description:
      "Intimate forest retreat in central Ubud, surrounded by lush jungle and rice fields. Perfect for those seeking tranquility with proximity to Ubud's cultural heart.",
    note: 'Fully furnished',
    features: [
      'Forest Views',
      'Jungle Setting',
      'Natural Pool',
      'Yoga Deck',
      'Open Living',
      'Eco Design',
    ],
  },
  '9': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&auto=format',
        alt: 'BSD City Penthouse - view 1',
      },
    ],
    landArea: '240 m²',
    yearBuilt: 2022,
    description:
      "Luxurious penthouse in BSD City's premier residential tower. Features 360-degree city views, high-end finishes, and access to world-class building amenities.",
    note: 'Fully furnished',
    features: [
      'City Views',
      'Sky Terrace',
      'High Floor',
      'Building Pool',
      'Gym Access',
      'Concierge',
      'Security',
    ],
  },
  '10': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop&auto=format',
        alt: 'Gili Air Beach House - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200&h=800&fit=crop&auto=format',
        alt: 'Gili Air Beach House - view 2',
      },
    ],
    landArea: '280 m²',
    yearBuilt: 2020,
    description:
      'Beachfront villa on Gili Air with direct access to white sand beaches and crystal clear waters. Offers island living at its finest with modern comforts.',
    note: 'Partially furnished',
    features: [
      'Beachfront',
      'Direct Beach Access',
      'Ocean Views',
      'Pool',
      'Outdoor Living',
      'Island Style',
    ],
  },
  '11': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop&auto=format',
        alt: 'Kemang Design House - view 1',
      },
    ],
    landArea: '550 m²',
    yearBuilt: 2023,
    description:
      'Award-winning contemporary design house in Kemang. Features striking architecture, double-height spaces, and curated art collection.',
    note: 'Fully furnished with designer pieces',
    features: [
      'Award-Winning Design',
      'Double Height',
      'Art Collection',
      'Designer Furniture',
      'Pool',
      'Home Office',
    ],
  },
  '12': {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200&h=800&fit=crop&auto=format',
        alt: 'Lombok Hillside Estate - view 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop&auto=format',
        alt: 'Lombok Hillside Estate - view 2',
      },
    ],
    landArea: '720 m²',
    yearBuilt: 2021,
    description:
      'Spectacular hillside estate in Senggigi with panoramic ocean views. Modern tropical architecture designed to capture breezes and views from every room.',
    note: 'Unfurnished',
    features: [
      'Ocean Views',
      'Hillside Location',
      'Infinity Pool',
      'Modern Tropical',
      'Multiple Terraces',
      'Privacy',
      'Sunset Views',
    ],
  },
}
