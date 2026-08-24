'use client'

import React from 'react'

export default function BeforeNavLinks() {
  return (
    <div
      style={{
        padding: '1rem',
        marginBottom: '1rem',
        borderBottom: '1px solid var(--theme-elevation-200)',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          opacity: 0.5,
          letterSpacing: '0.05em',
        }}
      >
        Main Navigation
      </p>
    </div>
  )
}
