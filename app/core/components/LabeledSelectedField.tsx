import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"
export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  name: string
  label: string
  type?: "text" | "password" | "email" | "number" | "select"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}
export const LabeledSelectedField = React.forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })
    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    return (
      <div {...outerProps}>
        <label>
          {label}
          <select {...input} disabled={submitting} {...props} />
        </label>
        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;
          }
          input {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            border: 1px solid purple;
            appearance: none;
            margin-top: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledSelectedField
