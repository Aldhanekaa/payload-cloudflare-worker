import Link from 'next/link'

interface BreadcrumbProps {
  items: {
    label: string
    href?: string
  }[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 font-sans text-[11px] tracking-[0.08em] text-[#a5a19a] uppercase">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="text-[#a5a19a] no-underline hover:text-[#242424]">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#242424]">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="text-[#d1ccc4]">→</span>}
        </div>
      ))}
    </div>
  )
}
