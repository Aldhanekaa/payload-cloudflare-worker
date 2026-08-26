import type { StateField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

import React from 'react'
import { Controller } from 'react-hook-form'
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { Width } from '../Width'
import { stateOptions } from './options'

export const State: React.FC<
  {
    control: Control<FieldValues, any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  } & StateField
> = ({ name, control, errors, label, required, width }) => {
  return (
    <Width width={width}>
      <div className="space-y-2">
        {label && <Label htmlFor={name}>{label}</Label>}
        <Controller
          control={control}
          defaultValue=""
          name={name}
          rules={{ required }}
          render={({ field: { onChange, value } }) => (
            <ShadcnSelect onValueChange={onChange} value={value}>
              <SelectTrigger id={name} className="w-full">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {stateOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </ShadcnSelect>
          )}
        />
        {required && errors[name] && <Error />}
      </div>
    </Width>
  )
}
