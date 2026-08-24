'use client'

import React from 'react'
import { useAuth } from '@payloadcms/ui'

export default function CustomLogoutButton() {
  const { logOut } = useAuth()

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      await logOut()
    }
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        width: '100%',
        padding: '0.75rem 1rem',
        background: 'var(--theme-error-500)',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        transition: 'background 0.2s',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'var(--theme-error-600)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'var(--theme-error-500)'
      }}
    >
      <span>🚪</span>
      <span>Logout</span>
    </button>
  )
}
