'use client'

import React from 'react'

export default function AfterDashboard() {
  // Collection stats data
  const collectionStats = [
    { name: 'Properties', slug: 'properties' },
    { name: 'Posts', slug: 'posts' },
    { name: 'Media', slug: 'media' },
    { name: 'Portfolios', slug: 'portfolios' },
  ]

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Quick Stats</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        {collectionStats.map((stat) => {
          return (
            <div
              key={stat.slug}
              style={{
                padding: '1.5rem',
                background: 'var(--theme-elevation-50)',
                borderRadius: '8px',
                border: '1px solid var(--theme-elevation-200)',
              }}
            >
              <h4 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.7 }}>
                {stat.name}
              </h4>
              <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>—</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
