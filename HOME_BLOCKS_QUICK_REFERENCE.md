# Home Blocks - Quick Reference

## 🎯 All 12 Blocks at a Glance

| Block                        | Slug                       | Type    | Default Colors          | Key Features                                  |
| ---------------------------- | -------------------------- | ------- | ----------------------- | --------------------------------------------- |
| **HomeHero**                 | `homeHero`                 | Hero    | Dark bg, Primary accent | Background image, Dual CTAs, Scroll indicator |
| **HomeAbout**                | `homeAbout`                | Content | Cream bg                | Stats grid, Divider, CTA link                 |
| **HomeFeaturedProperties**   | `homeFeaturedProperties`   | Data 🔄 | White bg                | Auto/Manual, 5 filters, Property cards        |
| **HomeSignatureDevelopment** | `homeSignatureDevelopment` | Feature | Dark bg                 | Split layout, Stats table, Image              |
| **HomeConsiderationSteps**   | `homeConsiderationSteps`   | Content | Dark bg                 | 4 numbered steps, Table layout                |
| **HomeExpertise**            | `homeExpertise`            | Content | Cream bg                | 4 service cards, Icons, Hover states          |
| **HomePlaces**               | `homePlaces`               | Data 🔄 | Cream bg                | Auto/Manual, City cards, Hover tooltips       |
| **HomeClientTestimonial**    | `homeClientTestimonial`    | Content | White bg                | Quote, Image 4:5 ratio, Gold rule             |
| **HomePath**                 | `homePath`                 | Content | Cream bg                | 4 steps, Connector line, Numbered boxes       |
| **HomeJournalSection**       | `homeJournalSection`       | Data 🔄 | White bg                | Auto/Manual, 3-column grid, Post cards        |
| **HomeFAQs**                 | `homeFaqs`                 | Content | Cream bg                | Accordion, 2-column layout                    |
| **HomeCTA**                  | `homeCta`                  | CTA     | Dark bg                 | Background image, Dual CTAs, Centered text    |

🔄 = Data-fetching block with Auto/Manual modes

---

## 🎨 Default Color Palette

### Brand Colors

- **Primary**: `#D7F205` (Lime/Yellow accent)
- **Gold**: `#b89a5b` (Secondary accent)
- **Dark**: `#0a0a0a` / `#111110` (Backgrounds)
- **Cream**: `#f5f2eb` / `#f7f5f0` (Light backgrounds)
- **White**: `#ffffff`

### Text Colors

- **Headline**: `#0a0a0a` / `#1a1a1a` / `#ffffff` (depends on bg)
- **Body**: `#555` / `#888` / `rgba(255,255,255,0.6)` (depends on bg)
- **Muted**: `#a5a19a` / `#aaa` / `rgba(255,255,255,0.4)`

### Interactive Colors

- **Hover Gold**: `#a8894a` / `#a5894f`
- **Border**: `#e5e0d7` / `#d6d0c4` / `rgba(255,255,255,0.1)`

---

## 🔄 Data-Fetching Blocks Configuration

### HomeFeaturedProperties

```typescript
Data Source: 'auto' | 'manual'
Auto Mode:
  - limit: 1-10 (default: 5)
  - Fetches: Active properties, sorted by -createdAt
Manual Mode:
  - properties: Relationship field (max 5)
```

### HomePlaces

```typescript
Data Source: 'auto' | 'manual'
Auto Mode:
  - limit: 1-∞ (default: 100)
  - Fetches: All cities
Manual Mode:
  - cities: Relationship field (no max)
```

### HomeJournalSection

```typescript
Data Source: 'auto' | 'manual'
Auto Mode:
  - limit: 1-6 (default: 3)
  - Fetches: Published posts, sorted by -publishedAt
Manual Mode:
  - posts: Relationship field (max 6)
```

---

## 📐 Layout Patterns

### Full Width Sections

- HomeHero
- HomeSignatureDevelopment
- HomeCTA

### Container Sections

All others use `PageContainer` component

### Grid Layouts

- **2-column**: HomeAbout, HomeFAQs, HomeClientTestimonial
- **4-column**: HomeExpertise, HomePath (desktop)
- **3-column**: HomeJournalSection
- **Custom**: HomeFeaturedProperties (1.6fr + 1fr layout)

---

## 🎯 Common Configuration Patterns

### Section Header (Eyebrow + Title)

```typescript
eyebrow: 'Section Label' // Small uppercase text
title: 'Main Heading\nOptional Line Break'
```

### CTA Pattern (Dual CTAs)

```typescript
ctaPrimary: {
  label: 'Primary Action',
  href: '/path'
}
ctaSecondary: {
  label: 'Secondary Action',
  href: '/path'
}
```

### Stats/Steps Array

```typescript
;[
  { number: '01', title: 'Step', description: 'Details' },
  { value: '12+', label: 'Years' },
  // ...
]
```

### Color Hierarchy

```typescript
backgroundColor: string // Section background
headlineColor: string // Main title
descriptionColor: string // Body text
accentColor: string // Highlights/CTAs
dividerColor: string // Borders/lines
```

---

## 🛠️ Development Tips

### Adding a New Block

1. Create folder: `src/(payload)/blocks/NewBlock/`
2. Create files: `Component.tsx`, `config.ts`, `index.ts`
3. Import config in `Pages/index.ts`
4. Import component in `RenderBlocks.tsx`
5. Add to both arrays

### Modifying Existing Block

1. Update `config.ts` for new fields
2. Update `Component.tsx` for new props
3. Test in Payload admin
4. Check frontend rendering

### Color Field Pattern

```typescript
colorPickerField({
  name: 'myColor',
  label: 'My Color Label',
  defaultValue: '#ffffff',
  // optional: required: true
})
```

### Conditional Field Pattern

```typescript
{
  name: 'conditionalField',
  type: 'text',
  admin: {
    condition: (data) => data.someField === 'someValue',
  },
}
```

---

## 📱 Responsive Breakpoints

Based on Tailwind defaults:

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

Most blocks use `md:` for tablet and `lg:` for desktop breakpoints.

---

## 🔍 Testing Checklist

### For Each Block:

- [ ] Add block in Payload admin
- [ ] Edit all text fields
- [ ] Change all color fields
- [ ] Preview on frontend
- [ ] Test mobile view
- [ ] Test tablet view
- [ ] Test desktop view
- [ ] Verify hover states
- [ ] Check image loading (if applicable)

### For Data Blocks:

- [ ] Test Auto mode
- [ ] Test Manual mode
- [ ] Verify data loads correctly
- [ ] Check empty state handling
- [ ] Test with different limits

---

## 🐛 Common Issues & Fixes

### Block not appearing in admin

→ Check import in `Pages/index.ts` and add to `blocks` array

### Block not rendering on frontend

→ Check import in `RenderBlocks.tsx` and add to `blockComponents` object

### Colors not applying

→ Verify field name matches props in Component

### Data not loading

→ Check locale parameter in `getCachedCollection` call

### Type errors

→ Run `payload generate:types` to regenerate types

---

## 📚 Related Files

- **Block Components**: `src/(payload)/blocks/*/Component.tsx`
- **Block Configs**: `src/(payload)/blocks/*/config.ts`
- **Render Logic**: `src/(payload)/blocks/RenderBlocks.tsx`
- **Page Collection**: `src/(payload)/collections/Pages/index.ts`
- **Color Picker**: `src/(payload)/plugins/colorPicker/`
- **Original Components**: `src/components/Home/*.tsx`
- **Type Definitions**: `src/payload-types.ts`

---

## 💾 Backup Original Components

Original home components are preserved in `src/components/Home/`:

- Use as reference for styling
- Maintain for backward compatibility
- Compare for debugging

---

This quick reference should help you work with the blocks efficiently!
