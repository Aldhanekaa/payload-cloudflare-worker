import { cn } from '@/utilities/cn'

interface InfoItemProps {
  label: string
  value: string | number
  isLast?: boolean
}

function InfoItem({ label, value, isLast }: InfoItemProps) {
  return (
    <div className={cn('px-6 py-5 border border-[#e5e0d7] min-w-[140px]', !isLast && 'border-r-0')}>
      <div className="font-sans text-[10px] tracking-[0.12em] uppercase text-[#a5a19a] mb-2">
        {label}
      </div>
      <div className="font-display text-xl font-medium text-[#0a0a0a] leading-[1.2]">{value}</div>
    </div>
  )
}

interface PortfolioInfoGridProps {
  location: string
  type: string
  units: number
  completion: string
  architect: string
}

export function PortfolioInfoGrid({
  location,
  type,
  units,
  completion,
  architect,
}: PortfolioInfoGridProps) {
  return (
    <div className="flex flex-wrap gap-0 mb-12">
      <InfoItem label="Location" value={location} />
      <InfoItem label="Type" value={type} />
      <InfoItem label="Total Units" value={units} />
      <InfoItem label="Completion" value={completion} />
      <InfoItem label="Architect" value={architect} isLast />
    </div>
  )
}
