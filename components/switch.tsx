"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { ComponentProps, ReactNode, useId } from "react"
import { tv } from "tailwind-variants"

const switchSlots = tv({
  slots: {
    root:
      "peer data-[state=checked]:bg-primary inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-secondary",
    thumb:
      "bg-background pointer-events-none block h-4 w-4 rounded-full ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-4 data-[state=checked]:bg-primary-foreground data-[state=unchecked]:translate-x-0",
  },
  variants: {
    size: {
      sm: {
        root: "h-4 w-7",
        thumb: "h-3 w-3 data-[state=checked]:translate-x-3",
      },
      md: {
        root: "h-5 w-9",
        thumb: "h-4 w-4 data-[state=checked]:translate-x-4",
      },
      lg: {
        root: "h-6 w-11",
        thumb: "h-5 w-5 data-[state=checked]:translate-x-5",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const { root, thumb } = switchSlots()

const switchFieldSlots = tv({
  slots: {
    wrapper: "inline-flex items-center gap-2",
    label: "text-sm text-foreground",
  },
  variants: {
    labelPosition: {
      before: { wrapper: "flex-row-reverse justify-end" },
      after: { wrapper: "flex-row" },
    },
    disabled: {
      true: { label: "opacity-50" },
    },
  },
  defaultVariants: {
    labelPosition: "after",
  },
})

export function Switch({
  className,
  label,
  labelPosition = "after",
  labelClassName,
  id,
  size = "md",
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root> & {
  label?: ReactNode
  labelPosition?: "before" | "after"
  labelClassName?: string
  size?: "sm" | "md" | "lg"
}) {
  const autoId = useId()
  const controlId = id ?? `switch-${autoId}`
  const { wrapper, label: labelSlot } = switchFieldSlots({
    labelPosition,
    disabled: props.disabled,
  })

  if (!label) {
    return (
      <SwitchPrimitive.Root
        data-slot="switch"
        id={id}
        className={root({ size, className })}
        {...props}
      >
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className={thumb({ size })}
        />
      </SwitchPrimitive.Root>
    )
  }

  return (
    <label htmlFor={controlId} className={wrapper()}>
      <SwitchPrimitive.Root
        data-slot="switch"
        id={controlId}
        className={root({ size, className })}
        {...props}
      >
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className={thumb({ size })}
        />
      </SwitchPrimitive.Root>
      <span className={labelSlot({ className: labelClassName })}>
        {label}
      </span>
    </label>
  )
}
