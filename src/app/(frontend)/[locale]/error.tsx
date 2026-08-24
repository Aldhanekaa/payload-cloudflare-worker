'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to an error reporting service if needed
    console.error(error)
  }, [error])

  return (
    <>
      <Navbar />

      <main className="  min-h-[70vh] flex flex-col items-center justify-center bg-[#f7f5f0] text-center px-6 py-15">
        {/* Large code numeral */}
        <span
          className="block font-light text-[#e5e0d7] leading-none mb-2 italic"
          style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(80px, 15vw, 160px)',
          }}
          aria-hidden="true"
        >
          500
        </span>

        {/* Headline */}
        <h1
          className="font-normal text-[#0a0a0a] leading-[1.2] mb-4 mt-0"
          style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(24px, 3vw, 36px)',
          }}
        >
          Something went wrong.
        </h1>

        {/* Body */}
        <p className="text-[#a5a19a] text-[15px] leading-[1.7] font-light max-w-90 mb-10">
          An unexpected error occurred on our end. You can try again, or return home while we look
          into it.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-[#0a0a0a] text-white text-[11px] tracking-[0.14em] uppercase font-medium px-7 py-3.25 no-underline hover:bg-[#242424] transition-colors duration-200 cursor-pointer border-none"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-[#b89a5b] text-[#b89a5b] text-[11px] tracking-[0.14em] uppercase font-medium px-7 py-3.25 no-underline hover:bg-[#b89a5b] hover:text-[#0a0a0a] transition-colors duration-200"
          >
            Return Home
          </Link>
        </div>

        {/* Digest for support reference — only shown when available */}
        {error.digest && (
          <p className="mt-8 text-[#c8c0b0] text-[11px] tracking-[0.08em] font-light">
            Reference: {error.digest}
          </p>
        )}
      </main>

      <Footer />
    </>
  )
}
