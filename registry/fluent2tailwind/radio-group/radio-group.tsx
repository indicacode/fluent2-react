"use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const radioGroupSlots = tv({
  slots: {
    root: "",
    item:
      "aspect-square h-4 w-4 rounded-full border border-border text-foreground shadow-sm focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
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
}: ComponentProps<typeof RadioGroupPrimitive.Root> & {
  orientation?: "horizontal" | "vertical"
  layout?: "horizontal" | "vertical"
  onChange?: (value: string) => void
}) {
  const resolvedOrientation = layout ?? orientation
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      orientation={resolvedOrientation}
      onValueChange={onChange}
      className={root({ orientation: resolvedOrientation, className })}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  value,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      value={value}
      className={item({ className })}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <div className="fill-primary h-2 w-2 rounded-full bg-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
