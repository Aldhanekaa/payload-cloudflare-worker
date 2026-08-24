'use client'
import { montserrat } from '@/app/fonts'
import MobileNav from '@/components/Navbar/MobileNav'
import NavbarItemText from '@/components/Navbar/Navbar'
import PageContainer from '@/components/PageContainer'
import { useState } from 'react'
import type { Navigation } from '@/payload-types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { LocaleCodes } from '@/i18n/localization'

interface DynamicNavbarProps {
  navigation: Navigation
}

interface NavItem {
  id?: string
  label: string
  link?: {
    type: 'reference' | 'custom'
    reference?: { relationTo: 'pages' | 'posts'; value: Record<string, unknown> }
    url?: string
    newTab?: boolean
    label?: string
    appearance?: string
  }
}

const SUPPORTED_LOCALES: LocaleCodes[] = ['id', 'en']

function extractLocalePrefix(pathname: string): string {
  const firstSegment = pathname.split('/').filter(Boolean)[0] as LocaleCodes | undefined
  if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment)) {
    return `/${firstSegment}`
  }
  return ''
}

export default function DynamicNavbar({ navigation }: DynamicNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const genericHamburgerLine = `h-1 w-8 my-1 rounded-full transition ease transform duration-300`

  const pathName = usePathname()
  const localePrefix = extractLocalePrefix(pathName)

  // Extract navigation items from the categories array
  const navItems: NavItem[] = Array.isArray(navigation.categories)
    ? (navigation.categories as unknown[])
        .map((item: unknown) => {
          if (typeof item !== 'object' || item === null || !('link' in item)) return null
          const linkData = (item as { id?: string; link: NavItem['link'] }).link
          return {
            id: 'id' in item && typeof item.id === 'string' ? item.id : undefined,
            label: linkData?.label ?? '',
            link: linkData,
          }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)
    : []

  const getItemLinkHref = (linkData?: NavItem['link']): string => {
    if (!linkData) return '#'
    if (linkData.type === 'custom') return linkData.url || '#'
    if (linkData.type === 'reference' && linkData.reference) {
      const ref = linkData.reference
      if (typeof ref === 'object' && 'value' in ref) {
        const value = ref.value
        if (typeof value === 'object' && value !== null && 'slug' in value) {
          return `${localePrefix}/${value.slug}`
        }
      }
    }
    return '#'
  }

  const getCtaLinkHref = (): string => {
    if (!navigation.link) return '#'
    if (navigation.link.type === 'custom') return navigation.link.url || '#'
    if (navigation.link.type === 'reference' && navigation.link.reference) {
      const ref = navigation.link.reference
      if (typeof ref === 'object' && 'value' in ref) {
        const value = ref.value
        if (typeof value === 'object' && value !== null && 'slug' in value) {
          return `${localePrefix}/${value.slug}`
        }
      }
    }
    return '#'
  }

  const ctaHref = getCtaLinkHref()
  const ctaLabel = navigation.link?.label || 'Learn More'
  const ctaNewTab = navigation.link?.newTab || false

  const backgroundColor = navigation.backgroundColor || '#0ea5e9'
  const textColor = navigation.textColor || '#fff'
  const buttonBackground = navigation.buttonBackground || '#063844'
  const buttonColor = navigation.buttonColor || '#fff'

  return (
    <>
      <nav className={`z-30 w-full top-0 ${montserrat.className} sticky`}>
        <MobileNav active={isOpen}>
          <>
            {navItems.map((item) => {
              const itemHref = getItemLinkHref(item.link)
              const itemNewTab = item.link?.newTab || false
              return (
                <a
                  key={item.id}
                  href={itemHref}
                  target={itemNewTab ? '_blank' : '_self'}
                  rel={itemNewTab ? 'noopener noreferrer' : undefined}
                >
                  <h5 className="text-xl font-normal mb-10">{item.link?.label}</h5>
                </a>
              )
            })}
            {ctaHref && ctaHref !== '#' && (
              <a
                href={ctaHref}
                target={ctaNewTab ? '_blank' : '_self'}
                rel={ctaNewTab ? 'noopener noreferrer' : undefined}
              >
                <h4 className="text-xl font-normal mb-10">{ctaLabel}</h4>
              </a>
            )}
          </>
        </MobileNav>

        <div className="w-full z-40 shadow-xl backdrop-blur-xl" style={{ backgroundColor }}>
          <PageContainer>
            <div className="w-full grid grid-cols-9 py-4 ">
              <div className="col-span-8 md:col-span-2 xl:col-span-3 flex items-center">
                <Link
                  href={navigation.slug ? `${localePrefix}/${navigation.slug}` : `${localePrefix}/`}
                >
                  <div
                    className="hover:underline inline-block"
                    style={{ textDecorationColor: textColor }}
                  >
                    <h3
                      className="text-xl md:text-lg xl:text-2xl font-bold"
                      style={{ color: textColor }}
                    >
                      {navigation.displayText}
                    </h3>

                    {navigation.subDisplayText && (
                      <h3
                        className="text-lg md:text-md xl:text-lg italic"
                        style={{ color: textColor }}
                      >
                        {navigation.subDisplayText}
                      </h3>
                    )}
                  </div>
                </Link>
              </div>
              <div className="flex md:hidden col-span-1 justify-end items-center">
                <button
                  className="flex flex-col h-full w-12 rounded justify-center items-center group"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div
                    className={`${genericHamburgerLine} ${
                      isOpen
                        ? 'rotate-45 translate-y-3 opacity-100 group-hover:opacity-100'
                        : 'opacity-100 group-hover:opacity-100'
                    }`}
                    style={{ backgroundColor: textColor }}
                  />
                  <div
                    className={`${genericHamburgerLine} ${
                      isOpen ? 'opacity-0' : 'opacity-100 group-hover:opacity-100'
                    }`}
                    style={{ backgroundColor: textColor }}
                  />
                  <div
                    className={`${genericHamburgerLine} ${
                      isOpen
                        ? '-rotate-45 -translate-y-3 opacity-100 group-hover:opacity-100'
                        : 'opacity-100 group-hover:opacity-100'
                    }`}
                    style={{ backgroundColor: textColor }}
                  />
                </button>
              </div>
              <div className="hidden md:flex md:col-span-7 xl:col-span-6  justify-end items-center">
                {navItems.map((item) => {
                  const itemHref = getItemLinkHref(item.link)
                  const itemNewTab = item.link?.newTab || false
                  return (
                    <NavbarItemText
                      key={item.id}
                      small
                      link={itemHref}
                      textColor={textColor}
                      newTab={itemNewTab}
                    >
                      {item.link?.label || ''}
                    </NavbarItemText>
                  )
                })}
                {ctaHref && (
                  <div className={` relative h-full font-medium`}>
                    <a
                      href={ctaHref}
                      target={ctaNewTab ? '_blank' : '_self'}
                      rel={ctaNewTab ? 'noopener noreferrer' : undefined}
                    >
                      <div className="relative w-full px-3 h-full flex items-center cursor-pointer">
                        <div
                          className="absolute -left-1 w-full -z-10 h-full"
                          style={{
                            clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)',
                            backgroundColor: buttonBackground,
                          }}
                        ></div>
                        <h6 className="md:text-sm text-end" style={{ color: buttonColor }}>
                          {ctaLabel}
                        </h6>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </PageContainer>
        </div>
      </nav>
    </>
  )
}
