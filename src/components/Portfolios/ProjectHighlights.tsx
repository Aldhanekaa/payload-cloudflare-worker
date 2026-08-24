interface ProjectHighlightsProps {
  highlights: string[]
}

export function ProjectHighlights({ highlights }: ProjectHighlightsProps) {
  return (
    <div>
      <h2 className="font-display text-[22px] font-medium text-[#0a0a0a] mb-6">
        Project Highlights
      </h2>
      <div className="flex flex-col gap-0">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-center gap-4 py-4.5 border-b border-[#e5e0d7]">
            <span className="text-[#b89a5b] font-display text-xl font-medium min-w-8">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-sans text-sm text-[#4b4743] leading-[1.5]">{highlight}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
