import type { PayloadEnhancedSidebarConfig } from '@veiag/payload-enhanced-sidebar'

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

    // FIRST Robotics - Competition Management
    {
      id: 'robotics',
      type: 'tab',
      icon: 'Bot',
      label: {
        en: 'FIRST Robotics',
      },
      collections: [
        'students',
        'student-registrations',
        'teams',
        'team-registrations',
        'seasons',
        'season-games',
        'events',
        'leadership-awards',
        'schools',
      ],
      customItems: [
        {
          slug: 'robotics-overview',
          href: '/collections/seasons',
          label: {
            en: 'Seasons Overview',
          },
          group: {
            en: 'Quick Access',
          },
          position: 'top',
        },
      ],
    },

    // Community & Partnerships
    {
      id: 'community',
      type: 'tab',
      icon: 'Users',
      label: {
        en: 'Community',
      },
      collections: ['testimonials', 'partners'],
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
    // Show pending student registrations
    'student-registrations': {
      type: 'collection-count',
      color: 'primary',
    },
    // Show pending team registrations
    'team-registrations': {
      type: 'collection-count',
      color: 'primary',
    },
    // Show properties count
    properties: {
      type: 'collection-count',
      color: 'default',
    },
  },

  // Sorting configuration for better organization
  sort: {
    properties: {
      groups: (group) => {
        // Pin Quick Links to the top
        if (typeof group.label !== 'string' && group.label?.en === 'Quick Links') {
          return -100
        }
        return undefined
      },
    },
    robotics: {
      groups: (group) => {
        // Pin Quick Access to the top
        if (typeof group.label !== 'string' && group.label?.en === 'Quick Access') {
          return -100
        }
        return undefined
      },
      items: (item) => {
        // Order key collections first
        const order: Record<string, number> = {
          seasons: 1,
          events: 2,
          students: 3,
          teams: 4,
          'student-registrations': 5,
          'team-registrations': 6,
        }
        return order[item.slug] ?? 999
      },
    },
  },

  // Show logout button
  showLogout: true,

  // Plugin is enabled
  disabled: false,
}
