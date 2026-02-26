"use client"

import * as React from "react"
import { createContext, useContext } from "react"
import { tv, VariantProps } from "tailwind-variants"

const field = tv({
  slots: {
    root: "flex gap-1",
    label: "text-sm font-medium text-foreground",
    hint: "text-xs text-muted-foreground",
    message: "text-xs text-muted-foreground",
    control: "flex-1",
  },
  variants: {
    orientation: {
      vertical: { root: "flex-col" },
      horizontal: { root: "flex-row items-start gap-3" },
    },
    size: {
      sm: { label: "text-xs", hint: "text-[0.7rem]", message: "text-[0.7rem]" },
      md: { label: "text-sm", hint: "text-xs", message: "text-xs" },
      lg: { label: "text-base", hint: "text-sm", message: "text-sm" },
    },
    state: {
      none: { message: "text-muted-foreground" },
      success: { message: "text-success-foreground" },
      warning: { message: "text-warning-foreground" },
      error: { message: "text-destructive" },
    },
  },
  defaultVariants: {
    orientation: "vertical",
    size: "md",
    state: "none",
  },
})

const { root, label, hint, message, control } = field()

type FieldContextValue = {
  id: string
  required?: boolean
  size?: "sm" | "md" | "lg"
  state?: "none" | "success" | "warning" | "error"
}

const FieldContext = createContext<FieldContextValue | null>(null)

export type FieldProps = React.ComponentProps<"div"> &
  VariantProps<typeof field> & {
    label?: React.ReactNode
    hint?: React.ReactNode
    validationMessage?: React.ReactNode
    required?: boolean
  }

function Field({
  label: labelText,
  hint: hintText,
  validationMessage,
  orientation,
  size,
  state,
  required,
  children,
  className,
  ...props
}: FieldProps) {
  const id = React.useId()
  const describedByIds: string[] = []
  if (hintText) describedByIds.push(`field-hint-${id}`)
  if (validationMessage) describedByIds.push(`field-message-${id}`)

  const child = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement, {
        id: (children as React.ReactElement).props.id ?? `field-control-${id}`,
        "aria-describedby": describedByIds.join(" ") || undefined,
        "aria-required": required || undefined,
        "aria-invalid": state === "error" || undefined,
      })
    : children

  return (
    <FieldContext.Provider value={{ id, required, size, state }}>
      <div
        data-slot="field"
        className={root({ orientation, size, state, className })}
        {...props}
      >
        {labelText && (
          <label
            data-slot="field-label"
            htmlFor={`field-control-${id}`}
            className={label({ size })}
          >
            {labelText}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}
        <div className={control()}>
          {child}
          {validationMessage && (
            <div
              data-slot="field-message"
              id={`field-message-${id}`}
              className={message({ size, state })}
            >
              {validationMessage}
            </div>
          )}
          {hintText && (
            <div
              data-slot="field-hint"
              id={`field-hint-${id}`}
              className={hint({ size })}
            >
              {hintText}
            </div>
          )}
        </div>
      </div>
    </FieldContext.Provider>
  )
}

export function useFieldContext() {
  return useContext(FieldContext)
}

export { Field }
