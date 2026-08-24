# Enhanced Sidebar - Quick Reference

## 🎯 Main Configuration File

`src/(payload)/config/sidebar.config.ts`

## 📋 Tab Structure At A Glance

| Icon | Tab Name       | Collections                                                         | Special Features               |
| ---- | -------------- | ------------------------------------------------------------------- | ------------------------------ |
| 🏠   | Dashboard      | -                                                                   | Direct link to home            |
| 📄   | Content        | pages, posts, categories, media                                     | General content                |
| 🏢   | Properties     | properties, property-types, property-categories, cities, portfolios | Quick links + badge            |
| 🤖   | FIRST Robotics | students, teams, seasons, events, etc.                              | Quick links + badges + sorting |
| 👥   | Community      | testimonials, partners                                              | Community content              |
| ⚙️   | Settings       | users                                                               | Pinned to bottom               |

## 🔢 Collection Counts

**Total Collections**: 20

- Content: 4
- Properties: 5
- Robotics: 9
- Community: 2

## 🏷️ Badges Active

- `student-registrations` - Primary (Blue)
- `team-registrations` - Primary (Blue)
- `properties` - Default (Gray)

## 🔗 Quick Links

**Properties Tab:**

- All Properties → `/collections/properties`

**Robotics Tab:**

- Seasons Overview → `/collections/seasons`

## 🎨 Available Icons (Lucide)

Commonly used:

- `House`, `FileText`, `Building2`, `Bot`, `Users`, `Settings`
- `ShoppingCart`, `BookOpen`, `Bell`, `Shield`, `BarChart`
- Full list: https://lucide.dev/icons

## 🎨 Badge Colors

- `default` - Gray
- `primary` - Blue ⭐
- `success` - Green
- `warning` - Orange
- `error` - Red

## 📝 Quick Code Snippets

### Add New Tab

```typescript
{
  id: 'new-tab',
  type: 'tab',
  icon: 'Icon',
  label: { en: 'Label' },
  collections: ['slug'],
}
```

### Add Quick Link

```typescript
customItems: [
  {
    slug: 'link',
    href: '/path',
    label: { en: 'Label' },
    group: { en: 'Group' },
    position: 'top',
  },
]
```

### Add Badge

```typescript
badges: {
  'collection-slug': {
    type: 'collection-count',
    color: 'primary',
  },
}
```

### Add Access Control

```typescript
access: ({ req }) => req.user?.role === 'admin'
```

## 🚀 Commands

- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Types**: `npm run generate:types`

## 📖 Full Documentation

- Setup: `SIDEBAR_SETUP.md`
- Config: `src/(payload)/config/README.md`
- Summary: `IMPLEMENTATION_SUMMARY.md`
