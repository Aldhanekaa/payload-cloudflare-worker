'use client'

import React from 'react'

export default function BeforeDashboard() {
  return (
    <div
      style={{
        padding: '1.5rem',
        marginBottom: '1.5rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1.5rem' }}>
        Welcome to Anderson Property Management
      </h2>
      <p style={{ margin: 0, opacity: 0.9 }}>
        Manage your properties, listings, and content from this dashboard.
      </p>
    </div>
  )
}
