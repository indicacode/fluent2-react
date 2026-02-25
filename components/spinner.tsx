"use client"

import * as React from "react"
import { tv, VariantProps } from "tailwind-variants"

const spinner = tv({
  slots: {
    root: "inline-flex items-center gap-2 text-sm text-muted-foreground",
    circle:
      "border-2 border-border border-t-primary rounded-full animate-spin",
    label: "text-sm",
  },
  variants: {
    size: {
      tiny: { circle: "h-3 w-3 border" },
      small: { circle: "h-4 w-4" },
      medium: { circle: "h-5 w-5" },
      large: { circle: "h-6 w-6" },
      "extra-large": { circle: "h-8 w-8" },
    },
  },
  defaultVariants: {
    size: "medium",
  },
})

const { root, circle, label } = spinner()

export type SpinnerProps = React.ComponentProps<"div"> &
  VariantProps<typeof spinner> & {
    label?: React.ReactNode
  }

function Spinner({ className, size, label: labelText, ...props }: SpinnerProps) {
  return (
    <div data-slot="spinner" className={root({ className: className as string })} {...props}>
      <span data-slot="spinner-circle" className={circle({ size })} />
      {labelText && (
        <span data-slot="spinner-label" className={label()}>
          {labelText}
        </span>
      )}
    </div>
  )
}

export { Spinner }
