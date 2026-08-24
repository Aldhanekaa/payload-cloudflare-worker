'use client'

import React from 'react'
import Image from 'next/image'
import HorizontalLogo from '@/assets/Horizontal_Andersen_Properties_Logo.svg'

export default function CustomLogo() {
  return (
    <div className="custom-logo" style={{ padding: '1rem' }}>
      <Image
        src={HorizontalLogo}
        alt="Anderson Property Management"
        width={200}
        height={60}
        style={{
          maxWidth: '200px',
          height: 'auto',
        }}
        priority
      />
    </div>
  )
}
