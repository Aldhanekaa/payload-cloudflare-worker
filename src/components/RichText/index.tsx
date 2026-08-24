import { MediaBlock } from '@/(payload)/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/(payload)/blocks/Banner/Component'
import { CallToActionBlock } from '@/(payload)/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

type NodeTypes =
  DefaultNodeTypes | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  link: (data) => {
    // console.log('LINK DATA', data)
    // console.log('LINK NODE DATA', data.node.fields.doc)
    // console.log('LINK NODE CHILDREN', data.node.children)

    const linkContent = data.node.children[0]
    // console.log('LINK linkContent', linkContent)

    let href = ''
    if (data.node.fields.doc) {
      href = internalDocToHref({ linkNode: data.node })
    } else if (data.node && data.node.fields.url) {
      href = data.node.fields.url
    }

    if (
      data.node.fields.linkType == 'custom' &&
      data.node.fields.link_appearance == 'button-outline'
    ) {
      return (
        <a
          href={href}
          target={data.node.fields.newTab ? '_blank' : ''}
          className=" px-4 py-2 button-outline  outline-1 rounded-full inline-flex gap-x-3"
        >
          {/* @ts-ignore */}
          {linkContent.text}
          <ExternalLink />
        </a>
      )
    }

    if (
      data.node.fields.linkType == 'custom' &&
      data.node.fields.link_appearance == 'button-filled'
    ) {
      return (
        <a
          href={href}
          target={data.node.fields.newTab ? '_blank' : ''}
          className=" px-4 py-2 rounded-full  button-filled inline-flex gap-x-3 "
        >
          {/* @ts-ignore */}
          {linkContent.text}
          <ExternalLink />
        </a>
      )
    }

    return (
      <Link
        href={href}
        target={data.node.fields.newTab ? '_blank' : ''}
        className=" underline hover:outline-1 active:translate-y-7 "
      >
        {/* @ts-ignore */}
        {linkContent.text}
      </Link>
    )
  },

  blocks: {
    banner: ({ node }) => (
      <div data-better-editor-id={node.fields.id}>
        <BannerBlock className="col-start-2 mb-4" {...node.fields} />
      </div>
    ),
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    // code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        '',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
