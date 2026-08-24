export type ListingType = 'buy' | 'rent' | 'both'
export type PropertyCategory = 'Houses' | 'Villas' | 'Apartments' | 'Land'
export type City = 'Bali' | 'Jakarta' | 'Bandung' | 'Surabaya' | 'Lombok'
export type Badge = 'Exclusive' | 'New' | 'Price Reduced'

export type Listing = {
  id: string
  name: string
  location: string
  city: City
  category: PropertyCategory
  beds: number
  baths: number
  area: string
  listingType: ListingType
  salePrice?: string
  rentPrice?: string
  badge?: Badge
  image: string
  imageAlt: string
  /** Numeric sale price in billions IDR — used for sort. null = price on request */
  salePriceValue: number | null
  /** Numeric rent price in juta IDR/month — used for sort. null = not available */
  rentPriceValue: number | null
}

export const LISTINGS: Listing[] = [
  {
    id: '1',
    name: 'The Aruna Residence',
    location: 'Uluwatu, Bali',
    city: 'Bali',
    category: 'Villas',
    beds: 5,
    baths: 6,
    area: '620 m²',
    listingType: 'buy',
    salePrice: 'IDR 28.5 Billion',
    salePriceValue: 28.5,
    rentPriceValue: null,
    badge: 'Exclusive',
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop&auto=format',
    imageAlt: 'The Aruna Residence, Uluwatu, Bali',
  },
  {
    id: '2',
    name: 'Senopati Courtyard House',
    location: 'South Jakarta',
    city: 'Jakarta',
    category: 'Houses',
    beds: 4,
    baths: 4,
    area: '380 m²',
    listingType: 'both',
    salePrice: 'IDR 18.2 Billion',
    rentPrice: 'IDR 85 Juta / month',
    salePriceValue: 18.2,
    rentPriceValue: 85,
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&auto=format',
    imageAlt: 'Senopati Courtyard House, South Jakarta',
  },
  {
    id: '3',
    name: 'The Terraces at Canggu',
    location: 'Canggu, Bali',
    city: 'Bali',
    category: 'Villas',
    beds: 3,
    baths: 3,
    area: '280 m²',
    listingType: 'both',
    salePrice: 'Price on request',
    rentPrice: 'IDR 55 Juta / month',
    salePriceValue: null,
    rentPriceValue: 55,
    badge: 'Exclusive',
    image:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop&auto=format',
    imageAlt: 'The Terraces at Canggu, Canggu, Bali',
  },
  {
    id: '4',
    name: 'Dago Hills Residence',
    location: 'Dago, Bandung',
    city: 'Bandung',
    category: 'Houses',
    beds: 5,
    baths: 5,
    area: '450 m²',
    listingType: 'buy',
    salePrice: 'IDR 14.8 Billion',
    salePriceValue: 14.8,
    rentPriceValue: null,
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&auto=format',
    imageAlt: 'Dago Hills Residence, Dago, Bandung',
  },
  {
    id: '5',
    name: 'Surabaya Garden Estate',
    location: 'Pakuwon, Surabaya',
    city: 'Surabaya',
    category: 'Houses',
    beds: 6,
    baths: 7,
    area: '780 m²',
    listingType: 'both',
    salePrice: 'IDR 22.0 Billion',
    rentPrice: 'IDR 95 Juta / month',
    salePriceValue: 22.0,
    rentPriceValue: 95,
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop&auto=format',
    imageAlt: 'Surabaya Garden Estate, Pakuwon, Surabaya',
  },
  {
    id: '6',
    name: 'Oberoi Retreat',
    location: 'Seminyak, Bali',
    city: 'Bali',
    category: 'Villas',
    beds: 4,
    baths: 5,
    area: '520 m²',
    listingType: 'rent',
    rentPrice: 'IDR 120 Juta / month',
    salePriceValue: null,
    rentPriceValue: 120,
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&auto=format',
    imageAlt: 'Oberoi Retreat, Seminyak, Bali',
  },
  {
    id: '7',
    name: 'Menteng Heritage Home',
    location: 'Menteng, Jakarta',
    city: 'Jakarta',
    category: 'Houses',
    beds: 5,
    baths: 6,
    area: '600 m²',
    listingType: 'both',
    salePrice: 'IDR 32.0 Billion',
    rentPrice: 'IDR 130 Juta / month',
    salePriceValue: 32.0,
    rentPriceValue: 130,
    badge: 'Exclusive',
    image:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop&auto=format',
    imageAlt: 'Menteng Heritage Home, Menteng, Jakarta',
  },
  {
    id: '8',
    name: 'Ubud Forest Villa',
    location: 'Ubud, Bali',
    city: 'Bali',
    category: 'Villas',
    beds: 2,
    baths: 2,
    area: '180 m²',
    listingType: 'both',
    salePrice: 'IDR 9.5 Billion',
    rentPrice: 'IDR 35 Juta / month',
    salePriceValue: 9.5,
    rentPriceValue: 35,
    image:
      'https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=1200&h=800&fit=crop&auto=format',
    imageAlt: 'Ubud Forest Villa, Ubud, Bali',
  },
  {
    id: '9',
    name: 'BSD City Penthouse',
    location: 'BSD City, Tangerang',
    city: 'Jakarta',
    category: 'Apartments',
    beds: 3,
    baths: 3,
    area: '240 m²',
    listingType: 'both',
    salePrice: 'IDR 12.0 Billion',
    rentPrice: 'IDR 48 Juta / month',
    salePriceValue: 12.0,
    rentPriceValue: 48,
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&auto=format',
    imageAlt: 'BSD City Penthouse, BSD City, Tangerang',
  },
  {
    id: '10',
    name: 'Gili Air Beach House',
    location: 'Gili Air, Lombok',
    city: 'Lombok',
    category: 'Villas',
    beds: 3,
    baths: 3,
    area: '200 m²',
    listingType: 'buy',
    salePrice: 'IDR 7.8 Billion',
    salePriceValue: 7.8,
    rentPriceValue: null,
    badge: 'Price Reduced',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop&auto=format',
    imageAlt: 'Gili Air Beach House, Gili Air, Lombok',
  },
  {
    id: '11',
    name: 'Kemang Design House',
    location: 'Kemang, Jakarta',
    city: 'Jakarta',
    category: 'Houses',
    beds: 4,
    baths: 4,
    area: '420 m²',
    listingType: 'rent',
    rentPrice: 'IDR 72 Juta / month',
    salePriceValue: null,
    rentPriceValue: 72,
    image:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop&auto=format',
    imageAlt: 'Kemang Design House, Kemang, Jakarta',
  },
  {
    id: '12',
    name: 'Lombok Hillside Estate',
    location: 'Senggigi, Lombok',
    city: 'Lombok',
    category: 'Villas',
    beds: 5,
    baths: 5,
    area: '560 m²',
    listingType: 'buy',
    salePrice: 'IDR 16.5 Billion',
    salePriceValue: 16.5,
    rentPriceValue: null,
    badge: 'Exclusive',
    image:
      'https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200&h=800&fit=crop&auto=format',
    imageAlt: 'Lombok Hillside Estate, Senggigi, Lombok',
  },
]

export const CITIES = ['All Cities', 'Bali', 'Jakarta', 'Bandung', 'Surabaya', 'Lombok'] as const
export type CityFilter = (typeof CITIES)[number]
