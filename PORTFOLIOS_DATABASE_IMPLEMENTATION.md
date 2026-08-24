# Portfolios Grid - Database Implementation

## Overview

The portfolios grid has been optimized to be fully database-driven with intelligent fallback to dummy data. The implementation already had most features in place and only needed refinement.

## Key Features

### 1. Slug-Based Navigation ✅

- **Portfolio Cards**: Use `slug` field for navigation
- **Detail Page**: Configured to use slug parameter
- **URL Structure**: `/portfolios/{slug}` (e.g., `/portfolios/andersen-residences-no-01`)
- **SEO Friendly**: Human-readable URLs instead of numeric IDs

### 2. Dynamic Filter Options ✅

- **Cities**: Automatically extracted from portfolio data
- **Status Counts**: Real-time count of portfolios by status (Active, Sold Out, Coming Soon)
- **Fallback**: Uses dummy data filters when no database records exist

### 3. Data Transformation ✅

- Portfolios from database are transformed to match component format
- City relationships are properly resolved
- Hero images are extracted from media uploads
- All fields properly mapped with fallbacks

### 4. Files Status

#### Already Optimized

- ✅ `PortfoliosGrid.tsx` - Already has dynamic cities extraction
- ✅ `PortfolioCard.tsx` - Already uses slug for navigation
- ✅ `[portfolio-slug]/page.tsx` - Already uses slug for lookups
- ✅ `portfolios/page.tsx` - Fetches with proper depth and relationships

#### Updated

- ✅ `portfolios.data.ts` - Updated dummy data slugs to be SEO-friendly

## Implementation Details

### PortfoliosGrid Component

**Dynamic Cities Extraction:**

```typescript
const cities = useMemo(() => {
  const uniqueCities = Array.from(new Set(portfolios.map((p) => p.city)))
  return ['All Cities', ...uniqueCities.sort()]
}, [portfolios])
```

**Dynamic Status Counts:**

```typescript
function getStatusFilters(portfolios: Portfolio[]) {
  return [
    { value: 'all', label: 'All', count: portfolios.length },
    {
      value: 'active',
      label: 'Active',
      count: portfolios.filter((p) => p.status === 'active').length,
    },
    {
      value: 'sold-out',
      label: 'Sold Out',
      count: portfolios.filter((p) => p.status === 'sold-out').length,
    },
    {
      value: 'coming-soon',
      label: 'Coming Soon',
      count: portfolios.filter((p) => p.status === 'coming-soon').length,
    },
  ]
}
```

**Data Transformation:**

```typescript
function transformPortfolioData(portfolios: PayloadPortfolio[]): Portfolio[] {
  return portfolios.map((p) => {
    const cityData = typeof p.city === 'object' ? p.city : null
    const heroImageData = typeof p.heroImage === 'object' ? p.heroImage : null

    return {
      id: String(p.id),
      slug: p.slug || String(p.id),
      status: p.status,
      category: p.category || 'Uncategorized',
      name: p.name,
      location: p.location || '',
      city: cityData?.name || 'Unknown',
      tagline: p.tagline,
      units: p.units,
      completion: p.completion,
      from: p.from,
      image: {
        src: heroImageData?.url || '',
        alt: p.imageAlt || p.name,
      },
    }
  })
}
```

### Portfolio Detail Page

**CMS Data Fetching:**

```typescript
const result = await getCachedCollection(
  {
    collection: 'portfolios',
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  },
  locale,
)()
```

**Fallback Logic:**

```typescript
if (cmsPortfolio) {
  // Transform CMS data
  portfolio = transformCMSData(cmsPortfolio)
  details = transformDetailsData(cmsPortfolio)
} else if (ENABLE_DUMMY_FALLBACK.portfolios) {
  // Fallback to dummy data using slug
  portfolio = PORTFOLIOS.find((p) => p.slug === slug) || null
  if (portfolio) {
    details = PORTFOLIO_DETAILS[portfolio.id] || defaultDetails
  }
}
```

## Database Schema

The Portfolios collection includes:

- `name` - Portfolio name (localized)
- `slug` - Auto-generated from name
- `tagline` - Short compelling tagline (localized)
- `status` - active, sold-out, or coming-soon
- `category` - e.g., Villa Collection, Residential Houses (localized)
- `city` - Relationship to Cities collection
- `location` - Specific area within city
- `units` - Number of units in development
- `completion` - Completion date (e.g., Q3 2026)
- `from` - Starting price display
- `heroImage` - Main image for card/hero
- `imageAlt` - Alt text (localized)
- `architect` - Architecture firm name
- `description` - Detailed description (localized)
- `detailImages` - Array of images for detail page
- `highlights` - Array of project highlights (localized)

## How It Works

### Database Mode

When portfolios exist in the database:

1. Portfolios are fetched with depth=1 to include city relationship
2. Data is transformed to match component format
3. Cities are dynamically extracted from actual data
4. Status counts are calculated in real-time
5. Navigation uses slug field from database

### Fallback Mode

When no portfolios exist in database AND `ENABLE_DUMMY_FALLBACK.portfolios` is `true`:

1. Dummy data is used (6 sample portfolios)
2. Fixed cities from dummy data (Bali, Bandung, Jakarta, Lombok)
3. Status counts from dummy data
4. Navigation uses slug field from dummy data

### Configuration

Fallback behavior is controlled in `src/config/fallback.ts`:

```typescript
export const ENABLE_DUMMY_FALLBACK = {
  properties: true,
  portfolios: true, // Set to false to require database data
  posts: true,
}
```

## Updated Dummy Data Slugs

All dummy portfolios now have SEO-friendly slugs:

- `andersen-residences-no-01` (was: `1`)
- `the-dago-collection` (was: `2`)
- `senopati-urban-residences` (was: `3`)
- `lombok-coastal-villas` (was: `4`)
- `ubud-forest-villas` (was: `5`)
- `kemang-creative-quarter` (was: `6`)

## Benefits

1. **SEO Optimized**: URLs use descriptive slugs
2. **Dynamic Filters**: Cities and counts automatically adjust
3. **Status Filtering**: Filter by Active, Sold Out, Coming Soon
4. **Type Safe**: Proper TypeScript types throughout
5. **Graceful Fallback**: Development continues without database
6. **Localization Ready**: Most text fields support localization
7. **Real-time Counts**: Filter tabs show current portfolio counts

## Comparison with Listings Grid

Both implementations now share the same patterns:

| Feature                   | Listings Grid | Portfolios Grid |
| ------------------------- | ------------- | --------------- |
| Slug-based URLs           | ✅            | ✅              |
| Dynamic cities            | ✅            | ✅              |
| Dynamic categories/status | ✅            | ✅              |
| Database-first            | ✅            | ✅              |
| Fallback support          | ✅            | ✅              |
| Type safety               | ✅            | ✅              |
| SEO-friendly slugs        | ✅            | ✅              |

## Testing

### With Database Data

1. Add portfolios in Payload CMS admin
2. Ensure each has a slug, city, status, and hero image
3. Visit `/portfolios` - filters will show actual data and counts
4. Click on a portfolio - URL will use the slug
5. Test filtering by status and city

### With Fallback Data

1. Set `ENABLE_DUMMY_FALLBACK.portfolios = true`
2. Remove all portfolios from database
3. Visit `/portfolios` - will show 6 dummy portfolios
4. Status filters show: All (6), Active (2), Sold Out (3), Coming Soon (1)
5. Cities show: All Cities, Bali, Bandung, Jakarta, Lombok

## Next Steps

Consider adding:

- Search functionality across portfolio names and descriptions
- Price range filters
- Completion date filters
- Category/type filters (separate from free-text category field)
- Architect filters
- Integration with properties (link portfolios to individual property listings)
- Investment calculator or ROI tools
