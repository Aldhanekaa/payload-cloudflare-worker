'use client'

import React, { useState } from 'react'

export default function CustomHeader() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div
      style={{
        background: '#fef3c7',
        color: '#92400e',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #fbbf24',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem' }}>ℹ️</span>
        <span>
          <strong>Welcome!</strong> You're managing the Anderson Property Management website.
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.25rem',
          padding: '0.25rem',
          color: 'inherit',
        }}
        aria-label="Close banner"
      >
        ×
      </button>
    </div>
  )
}
