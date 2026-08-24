# Payload CMS Configuration

## Enhanced Sidebar Configuration

The Enhanced Sidebar plugin organizes collections into logical tabs for better navigation and improved admin panel usability.

### Overview

The sidebar is organized into the following main sections:

1. **Dashboard** - Quick access to the main admin dashboard
2. **Content** - General content management (Pages, Posts, Media, Categories)
3. **Properties** - Real estate management system
4. **FIRST Robotics** - Competition and student management
5. **Community** - Testimonials and partnerships
6. **Settings** - User management and system settings

### Tab Structure

#### 🏠 Dashboard

- Direct link to the admin home page
- Always visible at the top

#### 📄 Content

Collections:

- Pages
- Posts
- Categories
- Media

Use this tab for managing website content, blog posts, and media assets.

#### 🏢 Properties

Collections:

- Properties
- Property Types
- Property Categories
- Cities
- Portfolios

Features:

- Quick link to "All Properties" at the top
- Badge showing total property count

#### 🤖 FIRST Robotics

Collections:

- Students & Student Registrations
- Teams & Team Registrations
- Seasons & Season Games
- Events
- Leadership Awards
- Schools

Features:

- Quick link to "Seasons Overview" at the top
- Badges showing pending registrations
- Custom sorting to prioritize key collections

#### 👥 Community

Collections:

- Testimonials
- Partners

For managing community feedback and partnership information.

#### ⚙️ Settings

Collections:

- Users

Located at the bottom of the sidebar for system administration.

### Badge System

The sidebar includes notification badges for:

- **Student Registrations** (Primary color) - Shows count of student registrations
- **Team Registrations** (Primary color) - Shows count of team registrations
- **Properties** (Default color) - Shows total property count

### Customization

To modify the sidebar configuration, edit:

```
src/(payload)/config/sidebar.config.ts
```

#### Adding a New Tab

```typescript
{
  id: 'new-tab',
  type: 'tab',
  icon: 'Icon-Name', // From Lucide icons
  label: {
    en: 'New Tab',
  },
  collections: ['collection-slug'],
}
```

#### Adding a Custom Link

```typescript
{
  slug: 'custom-link',
  href: '/path/to/page',
  label: {
    en: 'Link Label',
  },
  group: {
    en: 'Group Name', // Optional
  },
  position: 'top', // or 'bottom'
}
```

#### Adding Badges

```typescript
badges: {
  'collection-slug': {
    type: 'collection-count',
    color: 'primary', // default | primary | success | warning | error
  },
}
```

### Available Icons

The sidebar uses [Lucide Icons](https://lucide.dev/icons). Common icons used:

- `House` - Dashboard
- `FileText` - Content
- `Building2` - Properties
- `Bot` - Robotics
- `Users` - Community
- `Settings` - Settings
- `ShoppingCart` - E-commerce
- `BookOpen` - Documentation

### Access Control

You can add access control to tabs using the `access` function:

```typescript
{
  id: 'admin-only',
  type: 'tab',
  icon: 'Shield',
  label: { en: 'Admin Panel' },
  collections: ['sensitive-data'],
  access: ({ req }) => {
    return req.user?.role === 'admin'
  },
}
```

### Sorting

Collections within tabs can be sorted using the `sort` configuration:

```typescript
sort: {
  'tab-id': {
    groups: (group) => {
      // Return number or string for sort order
    },
    items: (item) => {
      // Return number or string for sort order
    },
  },
}
```

### Resources

- [Plugin Documentation](https://github.com/VeiaG/payload-enhanced-sidebar)
- [Lucide Icons](https://lucide.dev/icons)
- [Payload CMS Docs](https://payloadcms.com/docs)
