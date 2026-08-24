'use client'

import { Link } from '@payloadcms/ui'
import { Globe, Home, FileText, FolderKanban } from 'lucide-react'

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
          style={{
            fontSize: '0.875rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Globe size={16} />
          View Website
        </Link>
        <Link
          href="/admin/collections/properties"
          style={{
            fontSize: '0.875rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Home size={16} />
          Manage Active Listings
        </Link>
        <Link
          href="/admin/collections/portfolios"
          style={{
            fontSize: '0.875rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <FolderKanban size={16} />
          Manage Active Portfolio
        </Link>
        <Link
          href="/admin/collections/posts"
          style={{
            fontSize: '0.875rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <FileText size={16} />
          Manage Posts
        </Link>
      </div>
    </div>
  )
}
