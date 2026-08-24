import { formatDateTime } from '@/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import Image from 'next/image'
import { TagIcon } from 'lucide-react'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title, subTitle, subTitleItalic } =
    post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative grid grid-cols-11 bg-secondary">
      <div className="col-span-11 lg:col-span-5 pl-6 lg:pl-14  pr-6 lg:pr-10 pt-20 text-white">
        <div className="">
          <div className="uppercase text-sm mb-4">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    <div className="  gap-2 inline-flex justify-center items-center">
                      <TagIcon />
                      {titleToUse}
                      {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                    </div>
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>
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
              blurDataURL={heroImage.blurDataUrl || ''}
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
