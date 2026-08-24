interface PropertyHeaderProps {
  category: string
  city: string
  listingType: string
  title: string
  location: string
}

export function PropertyHeader({
  category,
  city,
  listingType,
  title,
  location,
}: PropertyHeaderProps) {
  return (
    <div className="mb-10 pb-10 border-b border-[#e5e0d7]">
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-[#b89a5b] font-medium">
          {category} · {city}
        </span>
        <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-[#a5a19a] px-2 py-0.75 border border-[#e5e0d7]">
          {listingType}
        </span>
      </div>
      <h1 className="font-display text-[clamp(32px,5vw,52px)] font-normal text-[#0a0a0a] leading-[1.1] mb-2 tracking-[-0.01em]">
        {title}
      </h1>
      <p className="font-sans text-sm text-[#a5a19a] tracking-[0.04em]">{location}</p>
    </div>
  )
}
