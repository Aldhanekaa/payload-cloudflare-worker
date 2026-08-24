import * as React from 'react'

export const Error: React.FC<{ message?: string }> = ({ message = 'This field is required' }) => {
  return <p className="text-sm font-medium text-destructive mt-1">{message}</p>
}
