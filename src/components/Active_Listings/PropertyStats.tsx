import { cn } from '@/utilities/cn'

interface StatItemProps {
  value: string | number
  label: string
  isFirst?: boolean
}

function StatItem({ value, label, isFirst }: StatItemProps) {
  return (
    <div className={cn('px-6 py-5 border border-[#e5e0d7] min-w-30', !isFirst && 'border-l-0')}>
      <div className="font-display text-[28px] font-medium text-[#0a0a0a] leading-none">
        {value}
      </div>
      <div className="font-sans text-[10px] tracking-[0.12em] uppercase text-[#a5a19a] mt-1.5">
        {label}
      </div>
    </div>
  )
}

interface PropertyStatsProps {
  bedrooms: number
  bathrooms: number
  buildArea: string
  landArea: string
  yearBuilt: number
}

export function PropertyStats({
  bedrooms,
  bathrooms,
  buildArea,
  landArea,
  yearBuilt,
}: PropertyStatsProps) {
  return (
    <div className="flex gap-0 mb-12 flex-wrap">
      <StatItem value={bedrooms} label="Bedrooms" isFirst />
      <StatItem value={bathrooms} label="Bathrooms" />
      <StatItem value={buildArea} label="Build Area" />
      <StatItem value={landArea} label="Land Area" />
      <StatItem value={yearBuilt} label="Year Built" />
    </div>
  )
}
