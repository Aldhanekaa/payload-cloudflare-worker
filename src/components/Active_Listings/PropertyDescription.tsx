interface PropertyDescriptionProps {
  description: string
  note?: string
}

export function PropertyDescription({ description, note }: PropertyDescriptionProps) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-[22px] font-medium text-[#0a0a0a] mb-4 tracking-[-0.01em]">
        About this property
      </h2>
      <p className="font-sans text-[15px] leading-[1.8] text-[#4b4743]">{description}</p>
      {note && (
        <p className="font-sans text-[13px] text-[#a5a19a] mt-4 tracking-[0.04em]">○ {note}</p>
      )}
    </div>
  )
}
