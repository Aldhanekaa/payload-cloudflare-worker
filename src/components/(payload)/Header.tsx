'use client'

import React, { useState } from 'react'

export default function CustomHeader() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return <></>
}
