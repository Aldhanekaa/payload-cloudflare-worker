# Enhanced Sidebar Setup Guide

## Overview

The Enhanced Sidebar plugin has been successfully installed and configured for the Anderson Properties / Indonesia FIRST Robotics website. This guide explains the setup and how to customize it further.

## Installation

The plugin has been installed using npm:

```bash
npm install @veiag/payload-enhanced-sidebar
```

## File Structure

```
src/
├── (payload)/
│   ├── components/
│   │   └── sidebar/
│   │       ├── CustomIcons.tsx          # Optional custom icon components
│   │       └── SidebarBadgeProvider.tsx # Badge provider for real-time counts
│   ├── config/
│   │   ├── sidebar.config.ts            # Main sidebar configuration
│   │   └── README.md                    # Configuration documentation
│   └── plugins/
│       └── index.ts                     # Updated to include enhanced sidebar
```

## Configuration

### Current Tab Structure

The sidebar is organized into 6 main tabs:

1. **🏠 Dashboard** - Quick access home
2. **📄 Content** - Pages, Posts, Categories, Media
3. **🏢 Properties** - Real estate management (Properties, Types, Categories, Cities, Portfolios)
4. **🤖 FIRST Robotics** - Competition management (Students, Teams, Seasons, Events, etc.)
5. **👥 Community** - Testimonials and Partners
6. **⚙️ Settings** - User management (pinned to bottom)

### Features Implemented

✅ **Tab-based Navigation** - Clean organization of collections  
✅ **Custom Icons** - Using Lucide icons for visual clarity  
✅ **Badge System** - Show counts on registrations and properties  
✅ **Quick Links** - Fast access to frequently used collections  
✅ **Custom Sorting** - Priority ordering of important collections  
✅ **Bottom Positioning** - Settings tab pinned to bottom

## Customization

### Adding a New Tab

Edit `src/(payload)/config/sidebar.config.ts`:

```typescript
{
  id: 'your-tab',
  type: 'tab',
  icon: 'YourIcon', // From https://lucide.dev/icons
  label: {
    en: 'Your Tab Name',
  },
  collections: ['your-collection-slug'],
}
```

### Adding Quick Links

Add custom items to any tab:

```typescript
{
  id: 'your-tab',
  type: 'tab',
  icon: 'Icon',
  label: { en: 'Tab' },
  collections: ['collection'],
  customItems: [
    {
      slug: 'quick-link',
      href: '/collections/your-collection',
      label: { en: 'Quick Link' },
      group: { en: 'Quick Links' },
      position: 'top',
    },
  ],
}
```

### Enabling Real-time Badges

To enable the badge provider for real-time counts:

1. Edit `src/payload.config.ts`:

```typescript
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      providers: ['@/(payload)/components/sidebar/SidebarBadgeProvider#SidebarBadgeProvider'],
    },
  },
  // ... rest of config
})
```

2. Update the badge provider to fetch from your API:

```typescript
// src/(payload)/components/sidebar/SidebarBadgeProvider.tsx
const response = await fetch('/api/badge-counts')
const data = await response.json()
setCounts(data)
```

### Using Custom Icons

To replace default icons with custom ones:

```typescript
{
  id: 'dashboard',
  type: 'link',
  href: '/',
  iconComponent: '@/(payload)/components/sidebar/CustomIcons#DashboardIcon',
  label: { en: 'Dashboard' },
}
```

### Adding Access Control

Restrict tabs based on user roles:

```typescript
{
  id: 'admin-tab',
  type: 'tab',
  icon: 'Shield',
  label: { en: 'Admin' },
  collections: ['users'],
  access: ({ req }) => {
    return req.user?.role === 'admin'
  },
}
```

## Badge Configuration

Current badges configured:

- **student-registrations**: Shows count (Primary color)
- **team-registrations**: Shows count (Primary color)
- **properties**: Shows total count (Default color)

### Badge Types Available

1. **Collection Count** - Auto-fetch from collection

   ```typescript
   badges: {
     'collection-slug': {
       type: 'collection-count',
       color: 'primary',
     },
   }
   ```

2. **API Endpoint** - Fetch from custom API

   ```typescript
   badges: {
     'custom-badge': {
       type: 'api',
       endpoint: '/api/custom-count',
       responseKey: 'count',
       color: 'warning',
     },
   }
   ```

3. **Provider-based** - Real-time updates
   ```typescript
   badges: {
     'live-count': {
       type: 'provider',
       slug: 'live-count',
       color: 'error',
     },
   }
   ```

## Available Badge Colors

- `default` - Gray
- `primary` - Blue
- `success` - Green
- `warning` - Orange/Yellow
- `error` - Red

## Sorting Collections

The following tabs have custom sorting:

### Properties Tab

- Quick Links group appears at top
- Collections maintain default order

### Robotics Tab

- Quick Access group appears at top
- Collections ordered: Seasons → Events → Students → Teams → Registrations

To modify sorting, edit the `sort` section in `sidebar.config.ts`.

## Testing

After making changes:

1. **Development**: Run `npm run dev` to see changes
2. **Build**: Run `npm run build` to ensure no errors
3. **Type Check**: Run `npm run generate:types` to regenerate types

## Troubleshooting

### Sidebar Not Showing

- Ensure plugin is added to `plugins` array in `payload.config.ts`
- Check that collections slugs match exactly
- Verify no TypeScript errors

### Icons Not Displaying

- Verify icon name from [Lucide Icons](https://lucide.dev/icons)
- Check capitalization (e.g., `House`, not `house`)
- For custom icons, ensure export name matches

### Badges Not Updating

- Check badge configuration in `sidebar.config.ts`
- Verify API endpoints return correct format
- Enable BadgeProvider for real-time updates

### Collections Not Grouped Correctly

- Verify collection slug matches exactly
- Check `sort` configuration for custom ordering
- Use `group` property in `customItems` to merge items

## Resources

- [Plugin GitHub](https://github.com/VeiaG/payload-enhanced-sidebar)
- [Plugin Documentation](https://payload.veiag.dev/docs/plugins/payload-enhanced-sidebar)
- [Lucide Icons](https://lucide.dev/icons)
- [Payload CMS Docs](https://payloadcms.com/docs)

## Support

For issues or questions:

1. Check the plugin's [GitHub Issues](https://github.com/VeiaG/payload-enhanced-sidebar/issues)
2. Review configuration in `src/(payload)/config/sidebar.config.ts`
3. Check Payload CMS admin console for errors

## Next Steps

Consider these enhancements:

1. **Implement real-time badges** using the BadgeProvider
2. **Add custom navigation components** for specific workflows
3. **Configure access control** based on user roles
4. **Add external links** to documentation or resources
5. **Create custom dashboard widgets** with quick actions
