'use client'

import React from 'react'
import { PopupList } from '@payloadcms/ui'

export function SettingsMenu() {
  return <></>
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
