'use client'

import React from 'react'

export default function CustomLogo() {
  return (
    <div className="custom-logo" style={{ padding: '1rem' }}>
      <img
        src="/logo.svg"
        alt="Anderson Property Management"
        style={{
          maxWidth: '200px',
          height: 'auto',
        }}
      />
    </div>
  )
}
