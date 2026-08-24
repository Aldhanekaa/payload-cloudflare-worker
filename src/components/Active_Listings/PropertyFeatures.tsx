interface PropertyFeaturesProps {
  features: string[]
}

export function PropertyFeatures({ features }: PropertyFeaturesProps) {
  return (
    <div>
      <h2 className="font-display text-[22px] font-medium text-[#0a0a0a] mb-6 tracking-[-0.01em]">
        Features & Amenities
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 font-sans text-[13px] text-[#4b4743] px-4 py-3 bg-white border border-[#e5e0d7]"
          >
            <span className="w-1.25 h-1.25 rounded-full bg-[#b89a5b] shrink-0 block" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  )
}
