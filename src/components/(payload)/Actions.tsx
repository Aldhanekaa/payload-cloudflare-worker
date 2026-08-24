'use client'

import React from 'react'

export default function CustomActions() {
  const handleClearCache = () => {
    // Implement cache clearing logic
    alert('Cache cleared successfully!')
  }

  const handleViewSite = () => {
    window.open('/', '_blank')
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <button
        onClick={handleViewSite}
        style={{
          padding: '0.5rem 1rem',
          background: 'var(--theme-elevation-100)',
          border: '1px solid var(--theme-elevation-300)',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span>🌐</span>
        <span>View Site</span>
      </button>
      <button
        onClick={handleClearCache}
        style={{
          padding: '0.5rem 1rem',
          background: 'var(--theme-elevation-100)',
          border: '1px solid var(--theme-elevation-300)',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span>🔄</span>
        <span>Clear Cache</span>
      </button>
    </div>
  )
}
