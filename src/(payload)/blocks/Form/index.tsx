'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import RichText from '@/components/(payload)/RichText'
import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import { cn } from '@/utilities/ui'

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[] | Value
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: {
    [k: string]: unknown
  }[]
}

export const FormBlock: React.FC<
  FormBlockType & {
    id?: string
  }
> = (props) => {
  const { enableIntro, form: formFromProps, introContent } = props

  // Guard: if form is missing or has no id, don't render at all (avoids 500 errors)
  if (!formFromProps || !formFromProps.id) return null

  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    redirect,
    submitButtonLabel,
  } = formFromProps

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string | number } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: (res as any)?.errors?.[0]?.message || 'Internal Server Error',
              status: (res as any)?.status || req.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className={cn('bg-card rounded-lg border shadow-sm p-6', hasSubmitted && 'bg-muted/50')}>
        {enableIntro && introContent && !hasSubmitted && (
          <div className="prose prose-sm max-w-none mb-6">
            <RichText content={introContent} />
          </div>
        )}
        {!isLoading && hasSubmitted && confirmationType === 'message' && (
          <div className="prose prose-sm max-w-none text-center py-8">
            <RichText content={confirmationMessage} />
          </div>
        )}
        {isLoading && !hasSubmitted && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading, please wait...</p>
          </div>
        )}
        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md mb-6">
            {`${error.status || '500'}: ${error.message || ''}`}
          </div>
        )}
        {!hasSubmitted && (
          <form id={formID} onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {formFromProps &&
                formFromProps.fields &&
                formFromProps.fields.map((field, index) => {
                  console.log('field.blockType', field.blockType)
                  const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                  if (Field) {
                    return (
                      <React.Fragment key={index}>
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      </React.Fragment>
                    )
                  }
                  return null
                })}
            </div>
            <div className="mt-6">
              <Button type="submit" form={formID} className="w-full sm:w-auto">
                {submitButtonLabel || 'Submit'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
