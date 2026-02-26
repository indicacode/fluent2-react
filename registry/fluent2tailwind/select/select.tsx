"use client"

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select"

import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const selectSlots = tv({
  slots: {
    trigger:
      "hover:border-b-primary flex h-9 w-full items-center justify-between rounded-md border border-border bg-transparent px-3 py-2 text-sm shadow-xs select-none placeholder:text-muted-foreground hover:border-b-2 focus:outline-hidden active:border-b-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    scrollUpButton: "flex cursor-default items-center justify-center py-1",
    scrollDownButton: "flex cursor-default items-center justify-center py-1",
    content:
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background text-foreground shadow-md",
    viewport: "p-1",
    label: "px-2 py-1.5 text-sm font-semibold",
    item:
      "focus:bg-accent relative flex w-full cursor-default items-center rounded-xs py-[0.5px] pr-8 pl-4 text-sm outline-hidden select-none focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
    separator: "-mx-1 my-1 h-px bg-muted",
  },
  variants: {
    appearance: {
      outline: { trigger: "border border-border bg-transparent" },
      underline: { trigger: "border-b border-border rounded-none" },
      "filled-lighter": { trigger: "bg-background border border-border" },
      "filled-darker": { trigger: "bg-muted border border-border" },
    },
    size: {
      sm: { trigger: "h-8 text-xs" },
      md: { trigger: "h-9 text-sm" },
      lg: { trigger: "h-10 text-base" },
    },
    position: {
      popper: {
        content:
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        viewport:
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
      },
    },
  },
  defaultVariants: {
    appearance: "outline",
    size: "md",
  },
})

const {
  trigger,
  scrollUpButton,
  scrollDownButton,
  content,
  viewport,
  label,
  item,
  separator,
} = selectSlots()

function Select({
  onChange,
  ...props
}: ComponentProps<typeof SelectPrimitive.Root> & {
  onChange?: (value: string) => void
}) {
  return (
    <SelectPrimitive.Root
      data-slot="select"
      onValueChange={onChange}
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
      className={trigger({ appearance, size, className })}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
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
}: ComponentProps<"select"> & {
  size?: "sm" | "md" | "lg"
  appearance?: "outline" | "underline" | "filled-lighter" | "filled-darker"
}) {
  return (
    <select
      data-slot="select-native"
      className={trigger({ appearance, size, className })}
      {...props}
    >
      {children}
    </select>
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={scrollUpButton({ className })}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={scrollDownButton({ className })}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={content({ position, className })}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={viewport({ position })}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

interface SelectLabelProps extends ComponentProps<"label"> {
  className?: string
}

function SelectLabel({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={label({ className })}
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
      className={item({ className })}
      {...props}
    >
      <span className="absolute left-0 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText> {children}</SelectPrimitive.ItemText>
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
      className={separator({ className })}
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
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
