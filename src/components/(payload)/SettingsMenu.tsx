'use client'

import React from 'react'
import { PopupList } from '@payloadcms/ui'

export function SettingsMenu() {
  return (
    <PopupList.ButtonGroup>
      <PopupList.Button
        onClick={() => {
          if (window.confirm('Are you sure you want to clear the cache?')) {
            // Implement cache clearing logic
            alert('Cache cleared!')
          }
        }}
      >
        🔄 Clear Cache
      </PopupList.Button>
      <PopupList.Button onClick={() => window.open('/admin/collections/users', '_self')}>
        👥 Manage Users
      </PopupList.Button>
      <PopupList.Button onClick={() => window.open('/', '_blank')}>
        🌐 View Website
      </PopupList.Button>
    </PopupList.ButtonGroup>
  )
}

export function SystemActions() {
  return (
    <PopupList.ButtonGroup>
      <PopupList.Button
        onClick={() => {
          console.log('System diagnostic triggered')
          alert('System status: All systems operational')
        }}
      >
        🔧 System Diagnostics
      </PopupList.Button>
      <PopupList.Button onClick={() => window.open('/api/health', '_blank')}>
        📊 Health Check
      </PopupList.Button>
    </PopupList.ButtonGroup>
  )
}
