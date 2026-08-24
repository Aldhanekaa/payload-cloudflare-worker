import PageContainer from '../PageContainer'

export function MobileNavChildren({
  childrens,
  localePrefix = '',
}: {
  active?: boolean
  childrens?: Array<{ text: string; link: string; detail?: string }>
  localePrefix?: string
}) {
  return childrens?.map((children, i) => (
    <a href={`${localePrefix}${children.link}`} key={i}>
      <div className="border-b-2 mb-4 py-3 px-2 cursor-pointer hover:bg-slate-100">
        <h5>{children.text}</h5>
      </div>
    </a>
  ))
}

export default function MobileNav({
  active,
  children,
}: {
  active: boolean
  children: React.ReactNode
}) {
  if (active) {
    return (
      <div className="w-full absolute h-screen box-border overflow-auto pb-20 pt-28 bg-slate-50 animate-fade-down animate-once animate-normal backdrop-blur-xl">
        <div className=" w-full">
          <PageContainer className="pt-12">{children}</PageContainer>
        </div>
      </div>
    )
  }

  return <></>
}

export function MobileNavbarItemText({
  link,
  children,
  title,
  localePrefix = '',
}: {
  link: string
  title?: string
  children?: string
  localePrefix?: string
}) {
  return (
    <a href={`${localePrefix}${link}`}>
      {' '}
      <h5 className="text-xl font-normal mb-10">{title ? title : children}</h5>
    </a>
  )
}
