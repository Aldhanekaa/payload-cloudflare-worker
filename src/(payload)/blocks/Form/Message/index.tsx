import type { MessageField } from '@payloadcms/plugin-form-builder/types'

import React from 'react'
import RichText from '@/components/(payload)/RichText'
import { Width } from '../Width'

export const Message: React.FC<MessageField> = ({ message }) => {
  return (
    <Width width={100}>
      <div className="prose prose-sm max-w-none">
        <RichText content={message} />
      </div>
    </Width>
  )
}
