"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const radioGroupSlots = tv({
  slots: {
    root: "",
    item:
      "relative flex h-4 w-4 items-center justify-center rounded-full border border-border text-foreground shadow-sm focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  },
  variants: {
    orientation: {
      vertical: { root: "grid gap-2" },
      horizontal: { root: "flex flex-row items-center gap-3" },
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

const { root, item } = radioGroupSlots()

function RadioGroup({
  className,
  orientation = "vertical",
  layout,
  onChange,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive> & {
  orientation?: "horizontal" | "vertical"
  layout?: "horizontal" | "vertical"
  onChange?: (value: string) => void
}) {
  const resolvedOrientation = layout ?? orientation
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      onValueChange={(value) => onChange?.(String(value))}
      className={root({ orientation: resolvedOrientation, className })}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  value,
  ...props
}: ComponentProps<typeof RadioPrimitive.Root>) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      value={value}
      className={item({ className: className as string })}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="h-2 w-2 rounded-full bg-primary"
      />
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
