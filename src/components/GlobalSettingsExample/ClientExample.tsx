'use client'

/**
 * EXAMPLE: Client-Side Global Settings Usage
 *
 * This example shows how to use the useGlobalSettings hook
 * in a client component.
 */

import { useGlobalSettings } from '@/(payload)/globals/Global_Settings'
import {
  getWhatsAppUrl,
  sortAnnouncementsByPriority,
} from '@/(payload)/globals/Global_Settings/types'

export function ClientExample() {
  const { settings, loading, error } = useGlobalSettings()

  if (loading) {
    return (
      <div className="p-4 bg-gray-100 rounded">
        <p>Loading settings...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded">
        <p>Error loading settings: {error.message}</p>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-600 rounded">
        <p>No settings available</p>
      </div>
    )
  }

  // Sort announcements by priority
  const sortedAnnouncements = settings.announcements
    ? sortAnnouncementsByPriority(settings.announcements)
    : []

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">Global Settings (Client-Side)</h2>

      {/* WhatsApp Info */}
      {settings.whatsapp && (
        <div className="border-l-4 border-green-500 pl-4">
          <h3 className="font-semibold text-lg mb-2">WhatsApp Contact</h3>
          <p className="text-gray-600">
            {settings.whatsapp.displayText || 'Contact us on WhatsApp'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {settings.whatsapp.countryCode} {settings.whatsapp.number}
          </p>
          <a
            href={getWhatsAppUrl(settings.whatsapp, 'Hello from client component!')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-green-600 hover:underline"
          >
            Open WhatsApp →
          </a>
        </div>
      )}

      {/* Schedule Consultation Link */}
      {settings.scheduleConsultationLink && (
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="font-semibold text-lg mb-2">Schedule Consultation</h3>
          <a
            href={settings.scheduleConsultationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Book Now
          </a>
        </div>
      )}

      {/* Announcements */}
      {sortedAnnouncements.length > 0 && (
        <div className="border-l-4 border-purple-500 pl-4">
          <h3 className="font-semibold text-lg mb-2">
            Announcements ({sortedAnnouncements.length})
          </h3>
          <div className="space-y-2">
            {sortedAnnouncements.map((announcement, index) => (
              <div
                key={announcement.id || index}
                className={`p-3 rounded ${
                  announcement.priority === 'high'
                    ? 'bg-red-50 border border-red-200'
                    : announcement.priority === 'low'
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-blue-50 border border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm flex-1">{announcement.announcement}</p>
                  {announcement.priority && (
                    <span className="ml-2 text-xs font-semibold uppercase px-2 py-1 rounded">
                      {announcement.priority}
                    </span>
                  )}
                </div>
                {announcement.announcementLink?.label && (
                  <a
                    href={
                      announcement.announcementLink.type === 'custom'
                        ? announcement.announcementLink.url
                        : `/${announcement.announcementLink.reference?.value}`
                    }
                    className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                  >
                    {announcement.announcementLink.label} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
