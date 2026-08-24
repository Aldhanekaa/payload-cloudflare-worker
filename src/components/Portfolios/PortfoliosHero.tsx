import { PORTFOLIOS } from './portfolios.data'
import { ENABLE_DUMMY_FALLBACK } from '@/config/fallback'
import type { Portfolio as PayloadPortfolio } from '@/payload-types'

type Props = {
  portfolios: PayloadPortfolio[]
}

export default function PortfoliosHero({ portfolios }: Props) {
  // Use CMS data or fallback to dummy data
  const data = portfolios.length > 0 || !ENABLE_DUMMY_FALLBACK.portfolios ? portfolios : PORTFOLIOS

  const total = data.length
  const active = data.filter((p) => p.status === 'active').length
  const soldOut = data.filter((p) => p.status === 'sold-out').length
  const comingSoon = data.filter((p) => p.status === 'coming-soon').length

  const stats = [
    { value: total, label: 'Total Projects' },
    { value: active, label: 'Active' },
    { value: soldOut, label: 'Sold Out' },
    { value: comingSoon, label: 'Coming Soon' },
  ]

  return (
    <div
      className="bg-black"
      style={{
        paddingTop: 'clamp(60px, 8vw, 100px)',
        paddingBottom: 'clamp(48px, 6vw, 72px)',
      }}
    >
      <div className="max-w-360 mx-auto px-5 md:px-20">
        <p className="text-[10px] tracking-[0.22em] uppercase text-primary font-medium mb-4">
          Development Projects
        </p>
        <h1
          className="text-white font-normal leading-[1.08] tracking-[-0.01em] mb-4 mt-0"
          style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(36px, 5vw, 64px)',
          }}
        >
          Portfolios
        </h1>
        <p className="text-white/50 text-[15px] leading-[1.7] font-light max-w-120 m-0">
          A record of every development we have curated, delivered, and sold — from active projects
          open for purchase to completed collections.
        </p>

        {/* Stats */}
        <div className="flex gap-10 mt-12 flex-wrap">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div
                className="text-white leading-none tracking-[-0.02em] mb-1"
                style={{
                  fontFamily: 'var(--font-cormorant, serif)',
                  fontSize: '36px',
                  fontWeight: 400,
                }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] tracking-[0.14em] uppercase text-white/35 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
