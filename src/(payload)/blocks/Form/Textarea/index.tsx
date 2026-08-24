import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<any & FieldValues>
    rows?: number
  } & TextField
> = ({ name, errors, label, register, required: requiredFromProps, rows = 3, width }) => {
  return (
    <Width width={width}>
      <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <ShadcnTextarea
          id={name}
          rows={rows}
          {...register(name, { required: requiredFromProps })}
        />
        {requiredFromProps && errors[name] && <Error />}
      </div>
    </Width>
  )
}
