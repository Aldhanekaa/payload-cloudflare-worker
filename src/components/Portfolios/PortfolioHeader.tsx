interface PortfolioHeaderProps {
  category: string
  city: string
  title: string
  tagline: string
}

export function PortfolioHeader({ category, city, title, tagline }: PortfolioHeaderProps) {
  return (
    <div className="mb-10 pb-10 border-b border-[#e5e0d7]">
      <div className="font-sans text-[11px] tracking-[0.12em] uppercase text-[#b89a5b] font-medium mb-3.5">
        {category} · {city}
      </div>
      <h1 className="font-display text-[clamp(30px,4vw,50px)] font-normal text-[#0a0a0a] leading-[1.1] mb-2.5 tracking-[-0.01em]">
        {title}
      </h1>
      <p className="font-display text-lg italic text-[#6b6360] font-normal">"{tagline}"</p>
    </div>
  )
}
