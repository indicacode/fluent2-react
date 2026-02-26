"use client"

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/fluent2tailwind/popover/popover"
import { tv, VariantProps } from "tailwind-variants"

const teachingPopover = tv({
  slots: {
    surface:
      "max-w-[320px] rounded-md border border-border bg-background p-4 text-sm text-foreground shadow-lg",
    title: "text-base font-semibold",
    body: "text-sm text-muted-foreground",
    footer: "mt-3 flex items-center justify-between gap-2",
  },
  variants: {
    appearance: {
      light: { surface: "bg-background" },
      dark: { surface: "bg-foreground text-background border-border" },
    },
  },
  defaultVariants: {
    appearance: "light",
  },
})

const { surface, title, body, footer } = teachingPopover()

export type TeachingPopoverProps = React.ComponentProps<typeof Popover>

function TeachingPopover({ children, ...props }: TeachingPopoverProps) {
  return <Popover {...props}>{children}</Popover>
}

function TeachingPopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverTrigger>) {
  return <PopoverTrigger data-slot="teaching-popover-trigger" {...props} />
}

export type TeachingPopoverSurfaceProps = React.ComponentProps<typeof PopoverContent> &
  VariantProps<typeof teachingPopover>

function TeachingPopoverSurface({
  className,
  appearance,
  ...props
}: TeachingPopoverSurfaceProps) {
  return (
    <PopoverContent
      data-slot="teaching-popover-surface"
      className={surface({ appearance, className })}
      {...props}
    />
  )
}

function TeachingPopoverTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="teaching-popover-title" className={title({ className })} {...props} />
  )
}

function TeachingPopoverBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="teaching-popover-body" className={body({ className })} {...props} />
  )
}

function TeachingPopoverFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="teaching-popover-footer" className={footer({ className })} {...props} />
  )
}

export {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverFooter,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
}
