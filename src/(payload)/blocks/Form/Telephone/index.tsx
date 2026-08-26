import React from 'react'
import { Controller } from 'react-hook-form'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { Width } from '../Width'
import { phoneDialCodes } from './phone-codes'

export type TelephoneFieldType = {
  blockName?: string
  blockType: 'telephone'
  defaultDialCode?: string
  label?: string
  name: string
  required?: boolean
  width?: number
}

export const Telephone: React.FC<
  {
    control: Control<FieldValues, any>
    errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
  } & TelephoneFieldType
> = ({ name, control, errors, label, required, width, defaultDialCode }) => {
  const dialCodeFieldName = `${name}_dialCode`
  const numberFieldName = `${name}_number`

  return (
    <Width width={width}>
      <div className="space-y-2">
        {label && (
          <Label>
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </Label>
        )}
        <div className="flex gap-2">
          {/* Dial code selector */}
          <Controller
            control={control}
            name={dialCodeFieldName}
            defaultValue={defaultDialCode ?? ''}
            rules={{ required }}
            render={({ field: { onChange, value } }) => (
              <ShadcnSelect onValueChange={onChange} value={value}>
                <SelectTrigger className="w-[160px] shrink-0">
                  <SelectValue placeholder="+code" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {phoneDialCodes.map((code) => (
                    <SelectItem key={code.value} value={code.value}>
                      {code.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </ShadcnSelect>
            )}
          />

          {/* Phone number input */}
          <Controller
            control={control}
            name={numberFieldName}
            defaultValue=""
            rules={{
              required,
              pattern: {
                value: /^[0-9\s\-()]+$/,
                message: 'Please enter a valid phone number',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id={name}
                type="tel"
                placeholder="Phone number"
                className="flex-1"
              />
            )}
          />
        </div>

        {required && (errors[dialCodeFieldName] || errors[numberFieldName]) && <Error />}
      </div>
    </Width>
  )
}
