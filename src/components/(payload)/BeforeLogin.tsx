'use client'

import React from 'react'
import Image from 'next/image'
import HorizontalLogo from '@/assets/Horizontal_Andersen_Properties_Logo.svg'

export default function BeforeLogin() {
  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: '2rem',
      }}
    >
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
        {/* <Image
          src={HorizontalLogo}
          alt="Anderson Property Management"
          width={250}
          height={75}
          priority
        /> */}
      </div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Anderson Property Management</h2>
      <p style={{ opacity: 0.7, margin: 0 }}>Admin Portal</p>
    </div>
  )
}
