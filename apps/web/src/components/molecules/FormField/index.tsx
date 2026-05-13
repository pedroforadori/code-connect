import { cloneElement } from 'react'
import { Label } from '@/components/atoms/Label'

type FormFieldProps = {
  id: string
  label: string
  error?: string
  children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>
}

export function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col">
      <Label htmlFor={id}>{label}</Label>
      {cloneElement(children, { id, invalid: !!error })}
      {error && (
        <span role="alert" className="text-xs text-red-400 mt-1">
          {error}
        </span>
      )}
    </div>
  )
}