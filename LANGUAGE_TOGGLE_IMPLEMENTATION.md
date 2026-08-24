# Language Toggle Implementation with next-intl

## Overview

Implemented a fully functional language toggle component that integrates with next-intl for seamless locale switching between English (EN) and Bahasa Indonesia (ID).

## Files Created

### 1. LanguageToggle Component

**File**: `/src/components/LanguageToggle.tsx`

A reusable client component that:

- Automatically detects the current locale from URL params
- Switches between EN and ID locales using next-intl's router
- Preserves the current pathname and params when switching languages
- Shows active locale with primary color styling
- Includes hover states and transition animations
- Provides loading state (disabled + opacity during transition)
- Fully accessible with proper ARIA labels

**Props:**

- `className` - Override default container styling
- `activeClassName` - Style for the active locale (default: `text-primary`)
- `inactiveClassName` - Style for inactive locales (default: `text-white/60`)

## Files Modified

### 1. Navbar Component

**File**: `/src/components/Navbar.tsx`

**Changes:**

- Imported the new `LanguageToggle` component
- Replaced hardcoded language toggles in two locations:
  - Desktop/tablet header (visible on md+ screens)
  - Mobile menu bottom actions
- Fixed deprecated `flex-shrink-0` → `shrink-0` Tailwind classes

## How It Works

### Locale Detection

```typescript
const currentLocale = (params.locale as LocaleCodes) || localization.defaultLocale
```

The component reads the locale from the URL parameter `[locale]` and falls back to the default locale (ID).

### Locale Switching

```typescript
router.replace({ pathname, params }, { locale: newLocale })
```

Uses next-intl's `router.replace()` to switch locales while maintaining the current page path and parameters.

### Rendering Logic

```typescript
{localization.locales.map((locale, index) => (
  <span key={locale.code}>
    <button>{locale.code.toUpperCase()}</button>
    {index < locales.length - 1 && ' / '}
  </span>
))}
```

Dynamically renders all available locales from the configuration with separators.

## Configuration Files Used

### Localization Config

**File**: `/src/i18n/localization.ts`

Defines:

- Available locales: `['en', 'id']`
- Default locale: `'id'`
- Locale labels and RTL settings

### Routing Config

**File**: `/src/i18n/routing.ts`

Exports:

- `routing` - next-intl routing configuration
- `useRouter` - Locale-aware router hook
- `usePathname` - Locale-aware pathname hook
- `Link` - Locale-aware Link component

## Visual Behavior

### Desktop/Tablet View

- Located in the top navbar between the main navigation and search/CTA buttons
- Active locale shown in primary color
- Inactive locale in white/60 with hover effect to white/80

### Mobile View

- Located at the bottom of the mobile menu overlay
- Appears with staggered animation after nav links
- Active locale in primary color
- Inactive locale in white/50 with hover effect to white/70

## Accessibility Features

- Proper `aria-label` for each locale button (e.g., "Switch to English")
- `aria-current="true"` on the active locale
- Keyboard navigable
- Disabled state during locale transition to prevent double-clicks

## Testing Checklist

✅ Click EN → switches to English locale
✅ Click ID → switches to Indonesian locale  
✅ URL updates with new locale parameter
✅ Current page is preserved during switch
✅ Active locale is highlighted
✅ Hover states work correctly
✅ Loading state prevents double-clicks
✅ Works in both desktop and mobile views
✅ Maintains scroll position
✅ No TypeScript errors
✅ No console warnings

## Next Steps (Optional Enhancements)

1. **Add animations** - Fade in/out transition when switching
2. **Remember preference** - Store in localStorage or cookie
3. **Show locale name** - Display "English" / "Bahasa" instead of codes
4. **Add more locales** - Easy to extend with more languages
5. **Add flags** - Show country flags alongside text
