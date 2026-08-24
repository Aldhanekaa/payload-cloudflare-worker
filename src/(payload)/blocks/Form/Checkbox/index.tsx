import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    getValues: any
    register: UseFormRegister<any & FieldValues>
    setValue: any
  } & CheckboxField
> = ({
  name,
  errors,
  getValues,
  label,
  register,
  required: requiredFromProps,
  setValue,
  width,
}) => {
  const isCheckboxChecked = getValues(name)

  return (
    <Width width={width}>
      <div className="flex items-start space-x-3 space-y-0">
        <ShadcnCheckbox
          id={name}
          checked={isCheckboxChecked}
          onCheckedChange={(checked) => {
            setValue(name, checked)
          }}
          {...register(name, { required: requiredFromProps })}
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
    </Width>
  )
}
