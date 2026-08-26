# Migration Guide: Converting Home Page to Use Blocks

This guide shows how to migrate the current hardcoded home page (`src/app/(frontend)/[locale]/page.tsx`) to use the new Payload blocks.

## Current Home Page Structure

```typescript
// src/app/(frontend)/[locale]/page.tsx
<main>
  <HomePageHero />
  <HomeAboutAndersenProperties />
  <HomeFeaturedProperties properties={properties} />
  <HomeSignatureDevelopment />
  <HomeExpertise />
  <HomeConsiderationSteps />
  <HomePlaces cities={cities} />
  <HomeClientTestimonial />
  <HomePath />
  <HomeJournalSection posts={posts} />
  <HomeFAQs />
  <HomeCTA />
</main>
```

## Migration Options

### Option A: Full CMS Migration (Recommended)

Convert the home page to use Payload's page builder completely.

#### Step 1: Create "Home" Page in Payload

1. Open Payload Admin (`/admin`)
2. Go to **Pages** collection
3. Create new page with slug `home` or `index`
4. In **Content** tab, add blocks in order:
   - HomeHero
   - HomeAbout
   - HomeFeaturedProperties (Auto mode)
   - HomeSignatureDevelopment
   - HomeConsiderationSteps
   - HomeExpertise
   - HomePlaces (Auto mode)
   - HomeClientTestimonial
   - HomePath
   - HomeJournalSection (Auto mode)
   - HomeFAQs
   - HomeCTA
5. Configure each block's content
6. Publish

#### Step 2: Update Home Page Route

Replace `src/app/(frontend)/[locale]/page.tsx`:

```typescript
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import './styles.css'
import { RenderBlocks } from '@/(payload)/blocks/RenderBlocks'
import { getCachedPayload } from '@/utilities/getPayload'
import type { LocaleCodes } from '@/i18n/localization'
import type { Page as PageType } from '@/payload-types'
import { generateLocalizedMeta } from '@/utilities/generateLocalizedMeta'

type PageProps = {
  params: Promise<{ locale: LocaleCodes }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.home' })

  return generateLocalizedMeta({
    title: t('title'),
    description: t('description'),
    path: '',
    locale,
  })
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const payload = await getCachedPayload()

  // Fetch the home page from CMS
  const pages = await payload.find({
    collection: 'pages',
    depth: 2,
    locale,
    where: {
      slug: {
        equals: 'home', // or 'index'
      },
    },
    limit: 1,
  })

  const page = pages.docs[0] as PageType

  if (!page) {
    notFound()
  }

  return (
    <main>
      <RenderBlocks blocks={page.layout || []} />
    </main>
  )
}
```

**Pros:**

- ✅ Fully CMS-managed
- ✅ Non-technical users can edit
- ✅ A/B testing friendly
- ✅ Easy to reorder sections

**Cons:**

- ❌ Requires Payload admin setup
- ❌ Initial content migration needed

---

### Option B: Hybrid Approach

Keep the route but use blocks for specific sections.

```typescript
import { HomeHero } from '@/(payload)/blocks/HomeHero'
import { HomeAbout } from '@/(payload)/blocks/HomeAbout'
// ... other imports

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  // Fetch data for data-fetching blocks
  const properties = await getCachedCollection({ ... })()
  const cities = await getCachedCollection({ ... })()
  const posts = await getCachedCollection({ ... })()

  return (
    <main>
      {/* Use blocks directly */}
      <HomeHero
        eyebrow="Indonesia's Premier Real Estate"
        title="Contemporary Living,\nRefined by Design"
        backgroundColor="#000000"
        // ... other props
      />

      <HomeAbout
        headline="About Andersen\nProperties"
        // ... other props
      />

      <HomeFeaturedProperties
        dataSource="auto"
        limit={5}
        // ... other props
      />

      {/* Continue with other blocks... */}
    </main>
  )
}
```

**Pros:**

- ✅ Immediate use, no migration
- ✅ Keep existing routing
- ✅ Mix static and dynamic sections

**Cons:**

- ❌ Still hardcoded in component
- ❌ Requires developer for changes

---

### Option C: Keep Current, Use Blocks for New Pages

Don't migrate the home page; use blocks for new pages.

Keep `page.tsx` as-is, but use blocks for:

- Landing pages
- Campaign pages
- About page
- Services pages
- etc.

**Pros:**

- ✅ No breaking changes
- ✅ Gradual adoption
- ✅ Low risk

**Cons:**

- ❌ Inconsistent approach
- ❌ Home page still hardcoded

---

## Recommended: Option A (Full CMS Migration)

### Detailed Migration Steps

#### 1. Backup Current Implementation

```bash
cp src/app/\(frontend\)/\[locale\]/page.tsx src/app/\(frontend\)/\[locale\]/page.tsx.backup
```

#### 2. Create Home Page in Payload Admin

Log into `/admin` and create a page with these blocks:

**Block 1: HomeHero**

- eyebrow: "Indonesia's Premier Real Estate"
- title: "Contemporary Living,\nRefined by Design"
- subtitle: "Curated properties across Indonesia's most desirable locations..."
- Upload hero image
- Set CTAs:
  - Primary: "View Active Listings" → `/active-listings`
  - Secondary: "Speak with an Advisor" → `https://wa.me/...`
- Keep default colors

**Block 2: HomeAbout**

- headline: "About Andersen\nProperties"
- description: "We represent a new standard..."
- Stats:
  - "12+" → "Years of Experience"
  - "150+" → "Properties Sold"
  - "8" → "Key Markets"
- CTA: "Learn More About Us" → `/about`
- Keep default colors

**Block 3: HomeFeaturedProperties**

- Data Source: "Auto Query (Latest 5 Active)"
- Limit: 5
- eyebrow: "Active Listings"
- title: "Featured Properties"
- Customize filter labels if needed
- Keep default colors

**Block 4: HomeSignatureDevelopment**

- eyebrow: "Signature Development"
- title: "Andersen Residences\nNo. 01"
- description: "Our first proprietary development..."
- Upload development image
- Stats: Location, Type, Residences, Completion, Price
- CTA: "Explore the Development" → `/properties/...`
- Keep default colors

**Blocks 5-12:** Continue similarly with remaining blocks

#### 3. Update Route File

Replace `src/app/(frontend)/[locale]/page.tsx` with Option A code above.

#### 4. Test

1. Visit `/` or `/{locale}`
2. Verify all blocks render
3. Check data-fetching blocks show content
4. Test responsive views
5. Verify all links work

#### 5. Deploy

```bash
# Generate types
npx payload generate:types

# Build
npm run build

# Deploy
npm run deploy
```

---

## Data Migration Script (Optional)

If you want to programmatically create the home page:

```typescript
// scripts/create-home-page.ts
import { getPayload } from 'payload'
import config from '@/payload.config'

async function createHomePage() {
  const payload = await getPayload({ config })

  const page = await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      layout: [
        {
          blockType: 'homeHero',
          eyebrow: "Indonesia's Premier Real Estate",
          title: 'Contemporary Living,\nRefined by Design',
          // ... all other fields
        },
        {
          blockType: 'homeAbout',
          headline: 'About Andersen\nProperties',
          // ... all other fields
        },
        // ... other blocks
      ],
    },
  })

  console.log('Home page created:', page.id)
}

createHomePage()
```

Run with:

```bash
tsx scripts/create-home-page.ts
```

---

## Rollback Plan

If migration causes issues:

```bash
# Restore backup
cp src/app/\(frontend\)/\[locale\]/page.tsx.backup src/app/\(frontend\)/\[locale\]/page.tsx

# Delete CMS page (optional)
# Via admin: Pages → Delete "Home" page

# Rebuild
npm run build
```

---

## Testing Checklist

After migration:

- [ ] Home page loads without errors
- [ ] All 12 sections visible
- [ ] Data blocks show correct content
- [ ] Images load properly
- [ ] All links work
- [ ] Colors match original design
- [ ] Mobile view works
- [ ] Tablet view works
- [ ] Desktop view works
- [ ] SEO meta tags correct
- [ ] Performance acceptable
- [ ] Edit block in admin works
- [ ] Preview works
- [ ] Publish/unpublish works

---

## Performance Considerations

### Before Migration:

- Static components
- Data fetched once per page load

### After Migration:

- Blocks fetched from database
- Data still cached via `getCachedCollection`
- Consider adding Redis/KV cache for page data

### Optimization Tips:

```typescript
// Cache the page query
const getCachedPage = unstable_cache(
  async (slug: string, locale: string) => {
    const payload = await getCachedPayload()
    const pages = await payload.find({
      collection: 'pages',
      depth: 2,
      locale,
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return pages.docs[0]
  },
  ['page'],
  { revalidate: 3600 }, // 1 hour
)
```

---

## Conclusion

**Recommended Path:**

1. Start with **Option A** (Full CMS Migration)
2. Create home page in Payload admin
3. Update route to fetch from CMS
4. Test thoroughly
5. Deploy with rollback plan ready

This gives you the full benefits of the CMS while maintaining all functionality.

---

## Support

If you encounter issues:

1. Check `BLOCKS_CONVERSION_SUMMARY.md` for block details
2. Check `HOME_BLOCKS_QUICK_REFERENCE.md` for configuration
3. Review original components in `src/components/Home/`
4. Check Payload logs for errors
5. Verify database has required data

The blocks are production-ready and maintain the exact same visual design as the original components!
