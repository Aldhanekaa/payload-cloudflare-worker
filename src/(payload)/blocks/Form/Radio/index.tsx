import type { RadioField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

import React from 'react'
import { Controller } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { Width } from '../Width'

export const Radio: React.FC<
  {
    control: Control<FieldValues, any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  } & RadioField
> = ({ name, control, errors, label, options, required, width }) => {
  return (
    <Width width={width}>
      <div className="space-y-3">
        {label && (
          <Label className="text-sm font-medium leading-none">
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </Label>
        )}
        <Controller
          control={control}
          name={name}
          defaultValue=""
          rules={{ required }}
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              value={value}
              onValueChange={onChange}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
            >
              {options?.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <RadioGroupItem
                    id={`${name}-${option.value}`}
                    value={option.value}
                  />
                  <Label
                    htmlFor={`${name}-${option.value}`}
                    className="cursor-pointer font-normal"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
        {required && errors[name] && <Error />}
      </div>
    </Width>
  )
}
