import Image from 'next/image'
import PageContainer from '@/components/PageContainer'

export default function AboutHero() {
  return (
    <div
      className="relative overflow-hidden bg-[#0a0a0a]"
      style={{ height: 'clamp(400px, 55vw, 640px)' }}
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1440&h=700&fit=crop&auto=format"
        alt="Andersen Properties office"
        fill
        className="object-cover opacity-40"
        sizes="100vw"
        priority
      />

      {/* Content — pinned to bottom */}
      <PageContainer
        className="relative z-10 h-full flex flex-col justify-end"
        style={{ paddingBottom: 'clamp(48px, 6vw, 80px)' }}
      >
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#b89a5b] font-medium mb-4">
          Our Story
        </p>
        <h1
          className="text-white font-normal leading-[1.08] tracking-[-0.01em] max-w-150 m-0"
          style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(36px, 5vw, 68px)',
          }}
        >
          Built on considered advice and earned trust.
        </h1>
      </PageContainer>
    </div>
  )
}
