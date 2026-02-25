"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"
import { Check, ChevronDown } from "lucide-react"
import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const selectSlots = tv({
  slots: {
    trigger:
      "hover:border-b-primary flex h-9 w-full items-center justify-between rounded-md border border-border bg-transparent px-3 py-2 text-sm shadow-xs select-none placeholder:text-muted-foreground hover:border-b-2 focus:outline-hidden active:border-b-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    content:
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background text-foreground shadow-md",
    viewport: "p-1",
    label: "px-2 py-1.5 text-sm font-semibold",
    item:
      "focus:bg-accent relative flex w-full cursor-default items-center rounded-xs py-[0.5px] pr-8 pl-4 text-sm outline-hidden select-none focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
    separator: "-mx-1 my-1 h-px bg-muted",
  },
  variants: {
    appearance: {
      outline: { trigger: "border border-border bg-transparent" },
      underline: { trigger: "rounded-none border-b border-border" },
      "filled-lighter": { trigger: "border border-border bg-background" },
      "filled-darker": { trigger: "border border-border bg-muted" },
    },
    controlSize: {
      sm: { trigger: "h-8 text-xs" },
      md: { trigger: "h-9 text-sm" },
      lg: { trigger: "h-10 text-base" },
    },
  },
  defaultVariants: {
    appearance: "outline",
    controlSize: "md",
  },
})

const { trigger, content, viewport, label, item, separator } = selectSlots()

function Select({
  onChange,
  onValueChange,
  ...props
}: Omit<ComponentProps<typeof SelectPrimitive.Root>, "onValueChange"> & {
  onChange?: (value: string) => void
  onValueChange?: ComponentProps<typeof SelectPrimitive.Root>["onValueChange"]
}) {
  return (
    <SelectPrimitive.Root
      data-slot="select"
      onValueChange={(value, eventDetails) => {
        onChange?.(String(value))
        onValueChange?.(value, eventDetails)
      }}
      {...props}
    />
  )
}

function SelectGroup({
  ...props
}: ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  children,
  appearance,
  size = "md",
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "md" | "lg"
  appearance?: "outline" | "underline" | "filled-lighter" | "filled-darker"
}) {
  return (
    <SelectPrimitive.Trigger
      className={trigger({ appearance, controlSize: size, className: className as string })}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectNative({
  className,
  children,
  appearance,
  size = "md",
  ...props
}: Omit<ComponentProps<"select">, "size"> & {
  size?: "sm" | "md" | "lg"
  appearance?: "outline" | "underline" | "filled-lighter" | "filled-darker"
}) {
  return (
    <select
      data-slot="select-native"
      className={trigger({ appearance, controlSize: size, className: className as string })}
      {...props}
    >
      {children}
    </select>
  )
}

function SelectContent({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Popup>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner sideOffset={4}>
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={content({ className: className as string })}
          {...props}
        >
          <SelectPrimitive.ScrollUpArrow />
          <SelectPrimitive.List className={viewport()}>
            {children}
          </SelectPrimitive.List>
          <SelectPrimitive.ScrollDownArrow />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.GroupLabel>) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={label({ className: className as string })}
      {...props}
    />
  )
}

function SelectItem({
  className,
  value,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      value={value}
      className={item({ className: className as string })}
      {...props}
    >
      <span className="absolute left-0 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={separator({ className: className as string })}
      {...props}
    />
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectNative,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
