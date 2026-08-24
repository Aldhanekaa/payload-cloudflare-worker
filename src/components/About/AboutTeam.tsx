import Image from 'next/image'
import PageContainer from '@/components/PageContainer'

const team = [
  {
    name: 'Henrik Andersen',
    role: 'Founder & Principal Advisor',
    bio: 'Henrik has spent over twelve years working across residential property in Indonesia. He established Andersen Properties with a clear purpose: to create a property firm that operates with the same values as the clients it serves.',
    imageUrl:
      'https://andersen.feroworks.com/assets/andersenwisnawa_1735277735_3532088108605209787_1484401865-CnSm1g89.jpg',
  },
  {
    name: 'Sari Wijayanti',
    role: 'Head of Sales, Indonesia',
    bio: 'Sari leads our sales team across all Indonesian markets. Her deep local network and acute market knowledge have been central to our presence in both Bali and Jakarta.',
    imageUrl:
      'https://andersen.feroworks.com/assets/bellaatrrix_1766136782_3790952555342921685_578807836-CSGcNwUL.jpg',
  },
  {
    name: 'Budi Santoso',
    role: 'Development Advisory',
    bio: 'With a background in architecture and ten years advising developers, Budi brings a rigorous design perspective to every development project we take on.',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&auto=format',
  },
  {
    name: 'Clara Reinholt',
    role: 'Client Relations',
    bio: 'Clara manages the experience of every client from first contact through to transaction completion, ensuring our standard of service is consistent at every point.',
    imageUrl:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&auto=format',
  },
]

export default function AboutTeam() {
  return (
    <section className="py-[clamp(64px,8vw,100px)] bg-white border-t border-[#e5e0d7]">
      <PageContainer>
        {/* Header */}
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#b89a5b] font-medium mb-3">
          The People
        </p>
        <h2
          className="font-normal text-[#0a0a0a] leading-[1.1] mb-14 mt-0"
          style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
          }}
        >
          A small team doing considered work.
        </h2>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name}>
              {/* Portrait */}
              <div className="aspect-3/4 overflow-hidden bg-[#e5e0d7] mb-5 rounded-sm relative">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Name */}
              <h3
                className="text-xl font-medium text-[#0a0a0a] mb-1 mt-0 leading-[1.2]"
                style={{ fontFamily: 'var(--font-cormorant, serif)' }}
              >
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-[10px] tracking-[0.12em] uppercase text-[#b89a5b] font-medium mb-3">
                {member.role}
              </p>

              {/* Bio */}
              <p className="text-[#a5a19a] text-[13px] leading-[1.7] font-light m-0">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
