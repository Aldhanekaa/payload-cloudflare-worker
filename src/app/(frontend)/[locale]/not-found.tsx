import { Link } from '@/i18n/routing'

export default function NotFound() {
  return (
    <main className="  min-h-[70vh] flex flex-col items-center justify-center bg-[#f7f5f0] text-center px-6 py-15">
      {/* Large 404 numeral */}
      <span
        className="block font-light text-[#e5e0d7] leading-none mb-2 italic"
        style={{
          fontFamily: 'var(--font-cormorant, serif)',
          fontSize: 'clamp(80px, 15vw, 160px)',
        }}
        aria-hidden="true"
      >
        404
      </span>

      {/* Headline */}
      <h1
        className="font-normal text-[#0a0a0a] leading-[1.2] mb-4 mt-0"
        style={{
          fontFamily: 'var(--font-cormorant, serif)',
          fontSize: 'clamp(24px, 3vw, 36px)',
        }}
      >
        This page doesn&apos;t exist.
      </h1>

      {/* Body */}
      <p className="text-[#a5a19a] text-[15px] leading-[1.7] font-light max-w-90 mb-10">
        The address you&apos;ve visited may have moved or may never have existed. Let&apos;s get you
        somewhere useful.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="bg-[#0a0a0a] text-white text-[11px] tracking-[0.14em] uppercase font-medium px-7 py-3.25 no-underline hover:bg-[#242424] transition-colors duration-200"
        >
          Return Home
        </Link>
        <Link
          href="/active-listings"
          className="border border-[#b89a5b] text-[#b89a5b] text-[11px] tracking-[0.14em] uppercase font-medium px-7 py-3.25 no-underline hover:bg-[#b89a5b] hover:text-[#0a0a0a] transition-colors duration-200"
        >
          Browse Listings
        </Link>
      </div>
    </main>
  )
}
