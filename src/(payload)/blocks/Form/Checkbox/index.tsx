import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

import React from 'react'
import { Controller } from 'react-hook-form'
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  {
    control: Control<FieldValues, any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  } & CheckboxField
> = ({ name, control, errors, label, required: requiredFromProps, width }) => {
  return (
    <Width width={width}>
      <Controller
        control={control}
        name={name}
        defaultValue={false}
        rules={{ required: requiredFromProps }}
        render={({ field: { value, onChange } }) => (
          <div className="flex items-start space-x-3 space-y-0">
            <ShadcnCheckbox
              id={name}
              checked={!!value}
              onCheckedChange={onChange}
            />
            <div className="space-y-1 leading-none">
              <Label
                htmlFor={name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </Label>
              {requiredFromProps && errors[name] && <Error />}
            </div>
          </div>
        )}
      />
    </Width>
  )
}
