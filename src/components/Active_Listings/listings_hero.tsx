export default function ListingsHero() {
  return (
    <div className="bg-[#0a0a0a] pt-[clamp(60px,8vw,100px)] pb-[clamp(48px,6vw,72px)]">
      <div className="px-5 md:px-20 max-w-360 mx-auto">
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#b89a5b] font-medium mb-4">
          Curated Residences
        </p>
        <h1
          className="text-[clamp(36px,5vw,64px)] font-normal text-white leading-[1.08] tracking-[-0.01em] mb-4"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          Active Listings
        </h1>
        <p className="text-white/50 text-[15px] leading-[1.7] font-light max-w-120">
          Every property personally selected for architectural quality, location, and long-term
          value across Indonesia&apos;s key markets.
        </p>
      </div>
    </div>
  )
}
