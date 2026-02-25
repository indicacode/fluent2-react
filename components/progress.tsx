"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import * as React from "react"

import { tv } from "tailwind-variants"

const progressSlots = tv({
  slots: {
    root: "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
    indicator: "bg-primary h-full w-full flex-1 transition-all",
  },
  variants: {
    indeterminate: {
      true: {
        indicator:
          "animate-pulse w-2/5 translate-x-0",
      },
    },
  },
})

const { root, indicator } = progressSlots()

function Progress({
  className,
  value,
  indicatorClassName,
  indicatorStyle,
  ...props
}: Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, "value"> & {
  value?: number
  indicatorClassName?: string
  indicatorStyle?: React.CSSProperties
}) {
  const resolvedValue = value ?? 0
  const indeterminate = value === undefined || value === null
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={resolvedValue}
      className={root({ className: className as string })}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={indicator({ indeterminate, className: indicatorClassName })}
        style={
          indeterminate
            ? { ...indicatorStyle }
            : {
                transform: `translateX(-${100 - resolvedValue}%)`,
                ...indicatorStyle,
              }
        }
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
