import React from 'react'

import type { Post } from '@/payload-types'

import Image from 'next/image'
import { TagIcon } from 'lucide-react'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { category, heroImage, publishedAt, title, ..._rest } = post
  const subTitle = (_rest as any).subTitle
  const subTitleItalic = (_rest as any).subTitleItalic

  return (
    <div className="relative grid grid-cols-11 bg-secondary">
      <div className="col-span-11 lg:col-span-5 pl-6 lg:pl-14  pr-6 lg:pr-10 pt-20 text-white">
        <div className="">
          {category && (
            <div className="uppercase text-sm mb-4">
              <div className="gap-2 inline-flex justify-center items-center">
                <TagIcon />
                {category}
              </div>
            </div>
          )}
          <h1 className="mb-10 text-3xl md:text-2xl lg:text-3xl xl:text-4xl">{title}</h1>
        </div>
        {subTitle && (
          <div className="">
            <p className="mb-3 text-xl md:text-xl xl:text-2xl">{subTitle}</p>
          </div>
        )}
        {subTitleItalic && (
          <div className="">
            <p className="mb-6 text-md md xl:text-lg italic">{subTitleItalic}</p>
          </div>
        )}
      </div>
      <div className="col-span-11 lg:col-span-6">
        <div className="h-[20vh] md:h-[40vh] w-full relative">
          {heroImage && typeof heroImage !== 'number' && (
            <Image
              src={heroImage.url || ''}
              blurDataURL={(heroImage as any).blurDataUrl || ''}
              alt={heroImage.alt || 'alt data not found'}
              // width={heroImage.width || 50}
              // height={heroImage.height || 50}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
            />
          )}
        </div>
      </div>
    </div>
  )
}
