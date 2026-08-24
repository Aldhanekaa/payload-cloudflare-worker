'use client'

import React from 'react'
import { Link } from '@payloadcms/ui'

export default function AfterNavLinks() {
  return (
    <div
      style={{
        padding: '1rem',
        marginTop: '1rem',
        borderTop: '1px solid var(--theme-elevation-200)',
      }}
    >
      <p
        style={{
          margin: 0,
          marginBottom: '0.75rem',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          opacity: 0.5,
          letterSpacing: '0.05em',
        }}
      >
        Quick Links
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '0.875rem', textDecoration: 'none' }}
        >
          🌐 View Website
        </Link>
        <Link
          href="/admin/collections/properties"
          style={{ fontSize: '0.875rem', textDecoration: 'none' }}
        >
          🏠 Manage Properties
        </Link>
        <Link
          href="/admin/collections/posts"
          style={{ fontSize: '0.875rem', textDecoration: 'none' }}
        >
          📝 Manage Posts
        </Link>
      </div>
    </div>
  )
}
