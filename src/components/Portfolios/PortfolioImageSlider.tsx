'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/cn'

interface PortfolioImageSliderProps {
  images: {
    url: string
    alt: string
  }[]
  status: string
}

export function PortfolioImageSlider({ images, status }: PortfolioImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  if (images.length === 0) return null

  return (
    <div className="w-full px-5 md:px-20 max-w-360 mx-auto">
      <div className="grid gap-2">
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-sm aspect-video max-h-155">
          <Image
            alt={images[currentIndex].alt}
            src={images[currentIndex].url}
            fill
            className="object-cover transition-opacity duration-300"
            priority
          />

          {/* Status Badge */}
          {status && (
            <span className="absolute top-5 left-5 bg-[#b89a5b]/12 border border-[#b89a5b] text-[#b89a5b] font-sans text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 font-semibold backdrop-blur">
              {status}
            </span>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-5 right-5 bg-black/50 backdrop-blur text-white font-sans text-[11px] tracking-[0.08em] px-3 py-1.5">
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur border-0 cursor-pointer text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 3L5 8L10 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={goToNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur border-0 cursor-pointer text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={cn(
                  'shrink-0 w-30 h-20 overflow-hidden rounded-sm border-2 p-0 cursor-pointer transition-all',
                  index === currentIndex
                    ? 'border-[#b89a5b]'
                    : 'border-transparent hover:border-[#b89a5b]/50',
                )}
              >
                <Image
                  alt={`Thumbnail ${index + 1}`}
                  src={image.url}
                  width={120}
                  height={80}
                  className={cn(
                    'w-full h-full object-cover transition-opacity',
                    index === currentIndex ? 'opacity-100' : 'opacity-55 hover:opacity-80',
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
