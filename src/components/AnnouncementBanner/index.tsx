'use client'

import React from 'react'
import Link from 'next/link'
import type { Announcement } from '@/(payload)/globals/Global_Settings/types'
import { sortAnnouncementsByPriority } from '@/(payload)/globals/Global_Settings/types'
import styles from './styles.module.scss'

interface AnnouncementBannerProps {
  announcements: Announcement[]
  showAll?: boolean
  className?: string
}

export function AnnouncementBanner({
  announcements,
  showAll = false,
  className = '',
}: AnnouncementBannerProps) {
  if (!announcements || announcements.length === 0) return null

  // Sort by priority
  const sortedAnnouncements = sortAnnouncementsByPriority(announcements)
  const displayAnnouncements = showAll ? sortedAnnouncements : sortedAnnouncements.slice(0, 1)

  return (
    <div className={`${styles.announcementBanner} ${className}`}>
      {displayAnnouncements.map((announcement, index) => {
        const priorityClass = announcement.priority
          ? styles[`priority-${announcement.priority}`]
          : styles['priority-normal']

        return (
          <div key={announcement.id || index} className={`${styles.announcement} ${priorityClass}`}>
            <div className={styles.content}>
              <p className={styles.text}>{announcement.announcement}</p>

              {announcement.announcementLink?.label && (
                <div className={styles.linkWrapper}>
                  {announcement.announcementLink.type === 'custom' &&
                  announcement.announcementLink.url ? (
                    <a
                      href={announcement.announcementLink.url}
                      target={announcement.announcementLink.newTab ? '_blank' : undefined}
                      rel={announcement.announcementLink.newTab ? 'noopener noreferrer' : undefined}
                      className={`${styles.link} ${
                        announcement.announcementLink.appearance === 'outline' ? styles.outline : ''
                      }`}
                    >
                      {announcement.announcementLink.label}
                    </a>
                  ) : announcement.announcementLink.type === 'reference' &&
                    announcement.announcementLink.reference ? (
                    <Link
                      href={`/${announcement.announcementLink.reference.value}`}
                      target={announcement.announcementLink.newTab ? '_blank' : undefined}
                      className={`${styles.link} ${
                        announcement.announcementLink.appearance === 'outline' ? styles.outline : ''
                      }`}
                    >
                      {announcement.announcementLink.label}
                    </Link>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
