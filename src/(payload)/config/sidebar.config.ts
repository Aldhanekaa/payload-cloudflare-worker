// import type { PayloadEnhancedSidebarConfig } from '@veiag/payload-enhanced-sidebar'

type PayloadEnhancedSidebarConfig = any // Temporary type until package is fixed

/**
 * Enhanced Sidebar Configuration
 * Organizes collections into logical tabs for better navigation
 */
export const sidebarConfig: PayloadEnhancedSidebarConfig = {
  tabs: [
    // Dashboard - Main entry point
    {
      id: 'dashboard',
      type: 'link',
      href: '/',
      icon: 'House',
      label: {
        en: 'Dashboard',
      },
    },

    // Content Management - Pages, Posts, Media
    {
      id: 'content',
      type: 'tab',
      icon: 'FileText',
      label: {
        en: 'Content',
      },
      collections: ['pages', 'posts', 'categories', 'media'],
    },

    // Properties - Real Estate Management
    {
      id: 'properties',
      type: 'tab',
      icon: 'Building2',
      label: {
        en: 'Properties',
      },
      collections: ['properties', 'property-types', 'property-categories', 'cities', 'portfolios'],
      customItems: [
        {
          slug: 'property-dashboard',
          href: '/collections/properties',
          label: {
            en: 'All Properties',
          },
          group: {
            en: 'Quick Links',
          },
          position: 'top',
        },
      ],
    },

    // System Settings
    {
      id: 'settings',
      type: 'tab',
      icon: 'Settings',
      label: {
        en: 'Settings',
      },
      collections: ['users'],
      position: 'bottom',
    },
  ],

  // Badge Configuration - Show counts on tabs
  badges: {
    // Show properties count
    properties: {
      type: 'collection-count',
      color: 'default',
    },
  },

  // Sorting configuration for better organization
  sort: {
    properties: {
      groups: (group: any) => {
        // Pin Quick Links to the top
        if (typeof group.label !== 'string' && group.label?.en === 'Quick Links') {
          return -100
        }
        return undefined
      },
    },
  },

  // Show logout button
  showLogout: true,

  // Plugin is enabled
  disabled: false,
}
