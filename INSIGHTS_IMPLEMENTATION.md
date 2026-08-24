# Insights Page Implementation

## ✅ Task Completed

The Insights page has been successfully updated to fetch data from the CMS `posts` collection, following the same pattern as Portfolios and Active Listings.

## What Was Implemented

### 1. Updated Insights List Page (`/insights`)

**File**: `/src/app/(frontend)/[locale]/insights/page.tsx`

- Fetches all posts from `posts` collection
- Uses `getCachedCollection` with depth=1 for relationships
- Sorts by `-publishedAt` (newest first)
- Passes posts to InsightsGrid component

**Query**:

```typescript
const result = await getCachedCollection(
  {
    collection: 'posts',
    depth: 1,
    limit: 100,
    sort: '-publishedAt',
  },
  locale,
)()
```

### 2. Updated InsightsGrid Component

**File**: `/src/components/Insights/InsightsGrid.tsx`

- Accepts `posts` prop from page
- Transforms CMS Post data to InsightPost format
- Falls back to dummy data if enabled and no CMS data
- Maintains all existing filtering and featured post logic

**Transformation**:

```typescript
Post (CMS) → InsightPost (Component)
- slug: from post slug
- category: from first category title
- date: formatted from publishedAt
- readTime: hardcoded to "5 min read" (could be calculated)
- title: from post title
- excerpt: from short_overview
- imageUrl: from heroImage.url
- imageAlt: from heroImage.alt
- featured: from isFeatured boolean
```

### 3. Created Insights Detail Page (`/insights/[slug]`)

**File**: `/src/app/(frontend)/[locale]/insights/[slug]/page.tsx`

**Features**:

- Fetches single post by slug with depth=2
- Transforms CMS data for display
- Falls back to dummy data if enabled
- Returns 404 if post not found
- Renders full article with:
  - Breadcrumb navigation
  - Category and meta information
  - Title, subtitle, overview
  - Hero image
  - Article content (Lexical format)
  - Back to Insights link

**Query**:

```typescript
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
```

### 4. Updated Fallback Configuration

**File**: `/src/config/fallback.ts`

Added `posts: true` to enable fallback for insights:

```typescript
export const ENABLE_DUMMY_FALLBACK = {
  portfolios: true,
  properties: true,
  posts: true, // ← Added
}
```

## Data Requirements

### Required Fields in CMS Posts

- `slug` - URL-friendly identifier
- `title` - Article title
- `subTitle` - Optional subtitle
- `subTitleItalic` - Optional italic subtitle suffix
- `short_overview` - Brief excerpt/description
- `publishedAt` - Publication date
- `heroImage` - Main article image (relationship to media)
- `categories` - Array of category relationships
- `isFeatured` - Boolean to mark as featured
- `content` - Lexical rich text content

### Category Mapping

The component expects category titles to match:

- Architecture
- Market Insight
- Buyer's Guide
- Design
- Lifestyle

If no category or unknown category, defaults to "Market Insight".

## Routes

✅ **List Page**: `/insights`

- Shows all posts with filtering by category
- Featured post displayed large in "All" view

✅ **Detail Page**: `/insights/[slug]`

- Shows individual post content
- Uses slug from posts collection

## Features

### Caching

- List page cached with 60-second revalidation
- Detail page cached with 60-second revalidation
- Tagged by collection and locale

### Fallback

- Enabled by default for development
- Falls back to dummy data in `insights.data.ts`
- Set `ENABLE_DUMMY_FALLBACK.posts = false` for production

### Filtering

- "All" category shows all posts
- Featured post pulled out and displayed large
- Category filtering works with CMS data
- Empty state when no posts match

## Content Rendering

The detail page includes a basic Lexical content renderer that handles:

- Paragraphs
- Headings (h1-h6)

For full Lexical content rendering with all node types, you may want to:

1. Use the `@payloadcms/richtext-lexical/react` renderer
2. Or implement a more comprehensive renderer for all node types

## Testing

### With Dummy Data (Current)

```bash
Visit: http://localhost:3000/insights
Visit: http://localhost:3000/insights/tropical-modernism
```

Should show dummy data ✅

### With CMS Data (After adding posts)

1. Add categories to `categories` collection
2. Add posts to `posts` collection
3. Mark one post as featured
4. Visit pages - should show CMS data

### Production Mode

Set `ENABLE_DUMMY_FALLBACK.posts = false` and only CMS data will be shown.

## Files Modified

1. `/src/config/fallback.ts` - Added posts fallback
2. `/src/app/(frontend)/[locale]/insights/page.tsx` - Fetch from CMS
3. `/src/components/Insights/InsightsGrid.tsx` - Accept props, transform data

## Files Created

1. `/src/app/(frontend)/[locale]/insights/[slug]/page.tsx` - Detail page

## Next Steps

1. **Add Posts to CMS**
   - Create categories (Architecture, Market Insight, etc.)
   - Add posts with all required fields
   - Upload hero images
   - Mark featured post

2. **Enhance Content Rendering** (Optional)
   - Implement full Lexical renderer
   - Handle images, lists, quotes, etc.
   - Add styling for rich content

3. **Test & Verify**
   - Test list page with CMS data
   - Test detail pages render correctly
   - Verify filtering works
   - Check featured post logic

4. **Disable Fallback**
   - Set `ENABLE_DUMMY_FALLBACK.posts = false`
   - Test 404 behavior
   - Deploy to production

## Notes

- The `readTime` is currently hardcoded to "5 min read"
- You can calculate it based on content length if needed
- The content renderer is basic - enhance it for production use
- Category matching is case-sensitive
- All posts need at least one category for proper display
