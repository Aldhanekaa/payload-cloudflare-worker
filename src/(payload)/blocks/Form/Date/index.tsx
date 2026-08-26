'use client'

import type { DateField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

import React, { useState, useRef, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { Error } from '../Error'
import { Width } from '../Width'
import { cn } from '@/utilities/ui'

function formatDate(date: Date | undefined): string {
  if (!date) return ''
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const DatePicker: React.FC<
  {
    control: Control<FieldValues, any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  } & DateField
> = ({ name, control, errors, label, required, width }) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <Width width={width}>
      <div className="space-y-2" ref={containerRef}>
        {label && (
          <Label htmlFor={name}>
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </Label>
        )}
        <Controller
          control={control}
          name={name}
          defaultValue=""
          rules={{ required }}
          render={({ field: { value, onChange } }) => {
            const selectedDate: Date | undefined = value ? new Date(value) : undefined

            return (
              <div className="relative">
                <Button
                  id={name}
                  type="button"
                  variant="outline"
                  onClick={() => setOpen((v) => !v)}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !selectedDate && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? formatDate(selectedDate) : 'Pick a date'}
                </Button>

                {open && (
                  <div className="absolute z-50 mt-1 rounded-lg border border-border bg-popover shadow-md">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        onChange(date ? date.toISOString() : '')
                        setOpen(false)
                      }}
                      initialFocus
                    />
                  </div>
                )}
              </div>
            )
          }}
        />
        {required && errors[name] && <Error />}
      </div>
    </Width>
  )
}
