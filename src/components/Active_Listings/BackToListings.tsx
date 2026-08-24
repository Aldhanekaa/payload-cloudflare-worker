import Link from 'next/link'

export function BackToListings() {
  return (
    <div className="mt-20 pt-10 border-t border-[#e5e0d7]">
      <Link
        href="/active-listings"
        className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.12em] uppercase text-[#a5a19a] no-underline transition-colors hover:text-[#242424]"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 3L5 8L10 13"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to Active Listings
      </Link>
    </div>
  )
}
