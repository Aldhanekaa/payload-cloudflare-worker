import Link from 'next/link'
import { useState } from 'react'

export function NavbarChildren({
  childrens,
  active,
  childrenWidth,
  localePrefix = '',
}: {
  active: boolean
  childrens?: Array<{ text: string; link: string; detail?: string }>
  childrenWidth?: number
  localePrefix?: string
}) {
  return (
    <div
      className={`w-[200%] ${
        active ? 'block ' : 'hidden'
      } shadow-xl bg-primary  absolute  pt-4 z-30 top-full left-0 cursor-pointer`}
      style={{
        clipPath: 'polygon(100% 0, 100% 65%, 70% 100%, 0 100%, 0 0)',
      }}
    >
      <div className="w-full h-full relative ">
        <div
          className="absolute w-6 h-4  -top-8 left-3"
          style={{
            clipPath: 'polygon(50% 0, 0% 100%, 100% 100%)',
          }}
        ></div>
        {childrens?.map((child, i) => (
          <div className="mb-2 cursor-pointer font-normal  px-2 py-2 hover:bg-[#bed038]" key={i}>
            <Link
              href={`${localePrefix}${child.link}`}
              className="xl:text-xl lg:text-lg md:text-sm text-md"
            >
              {child.text}
            </Link>
            <p className="text-slate-700 font-normal">{child.detail} </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function NavbarItemText({
  children,
  childrens,
  end,
  link = '',
  textColorBlack,
  textColor,
  bigFont,
  childrenWidth,
  small,
  className,
  newTab,
  localePrefix = '',
}: {
  children: string
  end?: boolean
  link?: string
  childrens?: Array<{ text: string; link: string; detail?: string }>
  textColorBlack?: boolean
  textColor?: string
  bigFont?: boolean
  childrenWidth?: number
  small?: boolean
  className?: string
  newTab?: boolean
  localePrefix?: string
}) {
  const [childrenActive, setChildrenActive] = useState<boolean>(() => false)
  function onMouseEnter() {
    setChildrenActive(true)
  }
  function onMouseLeave() {
    setChildrenActive(false)
  }

  const computedTextColor = textColor || (textColorBlack ? '#1e293b' : '#f1f5f9')

  return (
    <div
      className={`${end ? '' : ''} font-normal   relative h-full cursor-pointer  `}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <Link
        target={newTab ? '_blank' : '_parent'}
        href={`${localePrefix}${link}`}
        className=" no-underline"
      >
        <div
          className={` ${
            small
              ? 'xl:px-4 lg:px-3 md:px-2 xl:py-3 py-2 hover:underline'
              : 'py-8 xl:px-8 lg:px-6 md:px-4 hover:bg-[#C7DE18]'
          } ${className && className} w-full h-full  flex items-center  no-underline`}
          style={small ? { textDecorationColor: computedTextColor } : undefined}
        >
          <h6
            className={`${
              bigFont ? 'xl:text-lg lg:text-lg md:text-sm' : ' text-xs lg:text-sm'
            }  text-end no-underline`}
            style={{ color: computedTextColor }}
          >
            {children}{' '}
          </h6>
        </div>
      </Link>{' '}
      {childrens && (
        <NavbarChildren
          childrenWidth={childrenWidth}
          active={childrenActive}
          childrens={childrens}
          localePrefix={localePrefix}
        />
      )}
    </div>
  )
}
