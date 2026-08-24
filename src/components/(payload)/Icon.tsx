'use client'

import React from 'react'
import Image from 'next/image'
import SquareLogo from '@/assets/Square_Andersen_Properties_Logo.svg'

export default function CustomIcon() {
  return (
    <div className="custom-icon">
      <Image
        src={SquareLogo}
        alt="Anderson Icon"
        width={32}
        height={32}
        style={{
          width: '32px',
          height: '32px',
        }}
        priority
      />
    </div>
  )
}
