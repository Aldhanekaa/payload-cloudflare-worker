'use client'

import React, { useEffect, useState } from 'react'
import { BadgeProvider } from '@veiag/payload-enhanced-sidebar/client'

/**
 * Badge Provider for Enhanced Sidebar
 *
 * Provides real-time badge counts for collections.
 * This component can be enhanced to fetch counts from APIs,
 * subscribe to websockets, or update based on user actions.
 *
 * Usage:
 * Add this to payload.config.ts:
 *
 * admin: {
 *   components: {
 *     providers: ['@/(payload)/components/sidebar/SidebarBadgeProvider#SidebarBadgeProvider'],
 *   },
 * }
 */
export const SidebarBadgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [counts, setCounts] = useState<Record<string, number | string>>({
    'student-registrations': 0,
    'team-registrations': 0,
    properties: 0,
  })

  useEffect(() => {
    // Initial fetch of counts
    const fetchCounts = async () => {
      try {
        // Example: Fetch counts from your API
        // const response = await fetch('/api/badge-counts')
        // const data = await response.json()
        // setCounts(data)

        // For now, using static counts
        // Replace with actual API calls
        setCounts({
          'student-registrations': 0, // Will be fetched from API
          'team-registrations': 0,
          properties: 0,
        })
      } catch (error) {
        console.error('Failed to fetch badge counts:', error)
      }
    }

    fetchCounts()

    // Optional: Set up polling for updates
    const interval = setInterval(fetchCounts, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return <BadgeProvider values={counts}>{children}</BadgeProvider>
}
