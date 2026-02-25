"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { tv, type VariantProps } from "tailwind-variants"

import { Toggle, toggleVariants } from "@/components/toggle"

const toggleGroupSlots = tv({
  slots: {
    root:
      "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
    item:
      "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
  },
})

const { root, item } = toggleGroupSlots()

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={root({ className: className as string })}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Toggle> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <Toggle
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={toggleVariants({
        variant: context.variant || variant,
        size: context.size || size,
        className: item({ className: className as string }),
      })}
      {...props}
    >
      {children}
    </Toggle>
  )
}

export { ToggleGroup, ToggleGroupItem }
