# Home Page Internationalization Implementation Guide

## ✅ Completed Components

The following components have been fully internationalized:

1. **home_hero.tsx** - Hero section with eyebrow, title, subtitle, CTAs
2. **home_about_andersen_properties.tsx** - About section with stats
3. **home_featured_properties.tsx** - Featured properties grid with filters
4. **home_signature_development.tsx** - Signature development showcase

## 🔄 Remaining Components to Update

### 1. home_consideration_steps.tsx

**Location:** `/src/components/Home/home_consideration_steps.tsx`

**What to add:**

```typescript
import { useTranslations } from 'next-intl'

export default function HomeConsiderationSteps() {
  const t = useTranslations('home-page.consideration-steps')

  const steps = [
    {
      number: '01',
      title: t('steps.curated.title'),
      description: t('steps.curated.description'),
    },
    {
      number: '02',
      title: t('steps.intelligence.title'),
      description: t('steps.intelligence.description'),
    },
    {
      number: '03',
      title: t('steps.service.title'),
      description: t('steps.service.description'),
    },
    {
      number: '04',
      title: t('steps.value.title'),
      description: t('steps.value.description'),
    },
  ]

  return (
    <section className="bg-[#111110] py-20 md:py-28">
      <PageContainer>
        {/* Heading */}
        <h2 className="...">
          {t('title')}
        </h2>

        {/* Rest of component stays the same */}
      </PageContainer>
    </section>
  )
}
```

### 2. home_places.tsx

**Location:** `/src/components/Home/home_places.tsx`

**What to add:**

```typescript
import { useTranslations } from 'next-intl'

export default function HomePlaces({ cities: cmsCities }: Props) {
  const t = useTranslations('home-page.places')

  // Update transformCityData to use translation for description
  function transformCityData(cities: City[]): Place[] {
    return cities.map((city) => {
      // ... existing code ...
      return {
        // ... existing fields ...
        description: `Explore ${propertyCount} ${t('properties')} in ${city.name}.`,
      }
    })
  }

  return (
    <section className="bg-[#f7f5f0] py-[clamp(80px,10vw,140px)]">
      <PageContainer>
        <div className="mb-14">
          <h2>
            {t('title')}
          </h2>
        </div>

        {/* In PlaceCard component */}
        <Link href={place.href} className="...">
          {t('explore-location')}
          <ArrowIcon />
        </Link>
      </PageContainer>
    </section>
  )
}
```

### 3. home_client_testimonial.tsx

**Location:** `/src/components/Home/home_client_testimonial.tsx`

**What to add:**

```typescript
import { useTranslations } from 'next-intl'

export default function HomeClientTestimonial() {
  const t = useTranslations('home-page.testimonial')

  return (
    <section className="bg-white py-[clamp(80px,10vw,140px)]">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* ... image ... */}

          <div>
            {/* Quote */}
            <blockquote className="...">
              {t('quote')}
            </blockquote>

            {/* Attribution */}
            <cite className="...">
              <span className="...">
                {t('attribution')}
              </span>
            </cite>

            {/* CTA */}
            <Link href="/client-stories" className="...">
              {t('cta')}
              {/* ... arrow svg ... */}
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
```

### 4. home_journal_section.tsx

**Location:** `/src/components/Home/home_journal_section.tsx`

**What to add:**

```typescript
import { useTranslations } from 'next-intl'

export default function HomeJournalSection({ posts: cmsPosts }: Props) {
  const t = useTranslations('home-page.journal')

  // Update transformPostData to use translation for categories
  function transformPostData(posts: Post[]): JournalPost[] {
    return posts.map((post) => {
      // ... existing code ...
      const category = t(`categories.${post.category}`)
      // ... rest of transformation ...
    })
  }

  return (
    <section className="bg-white py-20 md:py-28">
      <PageContainer>
        {/* Header row */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="...">{t('eyebrow')}</p>
            <h2 className="...">
              {t('title')}
            </h2>
          </div>

          <Link href="/insights" className="...">
            {t('view-all')} <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Cards grid */}
        {journalPosts.length === 0 ? (
          <p className="...">{t('no-posts')}</p>
        ) : (
          {/* ... existing cards ... */}
        )}

        {/* Mobile — view all link */}
        <div className="mt-10 md:hidden">
          <Link href="/insights" className="...">
            {t('view-all')} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </PageContainer>
    </section>
  )
}
```

### 5. Services Components (Re-used in Home)

These components are located in `/src/components/Services/` and are imported into the home page:

#### a. ServicesExpertise.tsx

**What to add:**

```typescript
import { useTranslations } from 'next-intl'

export default function ServicesExpertise() {
  const t = useTranslations('home-page.expertise')

  const services = [
    {
      icon: {/* ... */},
      title: t('services.acquisition.title'),
      description: t('services.acquisition.description'),
      href: '#acquisition',
    },
    {
      icon: {/* ... */},
      title: t('services.sales.title'),
      description: t('services.sales.description'),
      href: '#sales',
    },
    {
      icon: {/* ... */},
      title: t('services.development.title'),
      description: t('services.development.description'),
      href: '#development',
    },
    {
      icon: {/* ... */},
      title: t('services.private-search.title'),
      description: t('services.private-search.description'),
      href: '#private-search',
    },
  ]

  return (
    <section id="services" className="...">
      <PageContainer>
        <div className="mb-16">
          <p className="...">{t('eyebrow')}</p>
          <h2 className="...">{t('title')}</h2>
        </div>

        {/* In ServiceCard */}
        <Link href={service.href} className="...">
          {t('learn-more')}
          <LearnMoreArrow />
        </Link>
      </PageContainer>
    </section>
  )
}
```

#### b. ServicesPath.tsx

**What to add:**

```typescript
import { useTranslations } from 'next-intl'

export default function ServicesPath() {
  const t = useTranslations('home-page.path')

  const steps = [
    {
      number: '01',
      title: t('steps.understand.title'),
      description: t('steps.understand.description'),
    },
    {
      number: '02',
      title: t('steps.curate.title'),
      description: t('steps.curate.description'),
    },
    {
      number: '03',
      title: t('steps.experience.title'),
      description: t('steps.experience.description'),
    },
    {
      number: '04',
      title: t('steps.complete.title'),
      description: t('steps.complete.description'),
    },
  ]

  return (
    <section className="...">
      <PageContainer>
        <div className="mb-16">
          <h2 className="...">{t('title')}</h2>
        </div>
        {/* ... rest stays the same ... */}
      </PageContainer>
    </section>
  )
}
```

#### c. ServicesFAQs.tsx

**What to add:**

```typescript
import { useTranslations } from 'next-intl'

export default function ServicesFAQs() {
  const t = useTranslations('home-page.faqs')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: t('questions.select-listings.q'),
      answer: t('questions.select-listings.a'),
    },
    {
      question: t('questions.off-market.q'),
      answer: t('questions.off-market.a'),
    },
    {
      question: t('questions.locations.q'),
      answer: t('questions.locations.a'),
    },
    {
      question: t('questions.international.q'),
      answer: t('questions.international.a'),
    },
    {
      question: t('questions.support.q'),
      answer: t('questions.support.a'),
    },
  ]

  return (
    <section className="...">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div className="flex flex-col gap-4">
            <h2 className="...">{t('title')}</h2>
            <p className="...">{t('subtitle')}</p>
          </div>
          {/* ... accordion stays the same ... */}
        </div>
      </PageContainer>
    </section>
  )
}
```

#### d. ServicesCTA.tsx

**What to add:**

```typescript
import { useTranslations } from 'next-intl'

export default function ServicesCTA() {
  const t = useTranslations('home-page.cta')

  return (
    <section id="consultation" className="...">
      <PageContainer className="...">
        <p className="...">{t('eyebrow')}</p>

        <h2 className="...">{t('title')}</h2>

        <p className="...">{t('subtitle')}</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact" className="...">
            {t('cta-primary')}
          </Link>
          <Link href="https://wa.me/62000000000" className="...">
            {/* ... WhatsApp icon ... */}
            {t('cta-secondary')}
          </Link>
        </div>
      </PageContainer>
    </section>
  )
}
```

## Translation Files Status

Both translation files have been updated with all necessary keys:

- ✅ `/src/i18n/localization-data/en.json` - English translations complete
- ✅ `/src/i18n/localization-data/id.json` - Indonesian translations complete

## Testing Instructions

1. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Test English version:**
   - Navigate to `http://localhost:3000/en`
   - Verify all text appears in English

3. **Test Indonesian version:**
   - Navigate to `http://localhost:3000/id`
   - Verify all text appears in Indonesian

4. **Test language switching:**
   - Use the language toggle in the navigation
   - Confirm all content updates appropriately

## Notes

- All components that need `useTranslations` must be marked as `'use client'` at the top
- The translation keys follow a nested structure: `home-page.section.key`
- For server components, use `import {useTranslations} from 'next-intl'` directly
- For client components, ensure `'use client'` is at the very top of the file

## Component Dependencies

- `home_hero.tsx` → No dependencies
- `home_about_andersen_properties.tsx` → No dependencies
- `home_featured_properties.tsx` → Uses Property types from Payload
- `home_signature_development.tsx` → No dependencies
- `home_expertise.tsx` → Re-exports `ServicesExpertise`
- `home_consideration_steps.tsx` → No dependencies
- `home_places.tsx` → Uses City types from Payload
- `home_client_testimonial.tsx` → No dependencies
- `home_path.tsx` → Re-exports `ServicesPath`
- `home_journal_section.tsx` → Uses Post types from Payload
- `home_faqs.tsx` → Re-exports `ServicesFAQs`
- `home_cta.tsx` → Re-exports `ServicesCTA`

## Implementation Priority

**High Priority (User-facing content):**

1. home_consideration_steps.tsx
2. home_places.tsx
3. home_client_testimonial.tsx
4. home_journal_section.tsx

**Medium Priority (Service sections):** 5. ServicesExpertise.tsx 6. ServicesPath.tsx 7. ServicesFAQs.tsx 8. ServicesCTA.tsx

All translation keys are already in place in both `en.json` and `id.json` files, so you just need to update the components to use `useTranslations` hook.
