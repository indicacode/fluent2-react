"use client"

import { Avatar, AvatarFallback } from "@/components/avatar"
import * as React from "react"
import { Children, ComponentProps, isValidElement } from "react"
import { tv, VariantProps } from "tailwind-variants"

const avatarGroup = tv({
  slots: {
    root: "flex items-center",
    item:
      "relative rounded-full ring-2 ring-background transition-transform duration-200 hover:z-10 hover:scale-[1.03]",
    overflow: "bg-secondary text-muted-foreground",
  },
  variants: {
    layout: {
      stack: { root: "-space-x-2" },
      spread: { root: "space-x-2" },
      pie: { root: "-space-x-3" },
    },
    size: {
      sm: { item: "ring-2" },
      md: { item: "ring-2" },
      lg: { item: "ring-2" },
    },
    ring: {
      light: { item: "ring-background" },
      dark: { item: "ring-foreground" },
    },
    overlap: {
      tight: { root: "-space-x-3" },
      normal: { root: "-space-x-2" },
      loose: { root: "-space-x-1" },
    },
  },
  defaultVariants: {
    layout: "stack",
    size: "md",
    ring: "light",
    overlap: "normal",
  },
})

const { root, item, overflow } = avatarGroup()

type AvatarGroupProps = ComponentProps<"div"> &
  VariantProps<typeof avatarGroup> & {
    max?: number
    overflowLabel?: (count: number) => React.ReactNode
    tooltip?: boolean
  }

function AvatarGroup({
  className,
  children,
  layout,
  size = "md",
  ring = "light",
  overlap = "normal",
  max,
  overflowLabel,
  tooltip = false,
  ...props
}: AvatarGroupProps) {
  const items = Children.toArray(children).filter(isValidElement)
  const displayItems = max ? items.slice(0, max) : items
  const overflowCount = max ? Math.max(items.length - max, 0) : 0
  const resolvedSize = size ?? "md"
  const avatarSize = resolvedSize === "sm" ? "sm" : resolvedSize === "lg" ? "lg" : "md"

  return (
    <div
      data-slot="avatar-group"
      className={root({ layout, size: resolvedSize, ring, overlap, className })}
      {...props}
    >
      {displayItems.map((child, index) => (
        <div
          key={`avatar-group-item-${index}`}
          className={item({ layout, size: resolvedSize, ring })}
          title={tooltip ? child.props?.name : undefined}
        >
          {React.cloneElement(child, {
            size: child.props?.size ?? avatarSize,
            variant: child.props?.variant ?? "group",
          })}
        </div>
      ))}
      {overflowCount > 0 && (
        <div className={item({ layout, size: resolvedSize, ring })}>
          <Avatar size={avatarSize}>
            <AvatarFallback className={overflow({})}>
              {overflowLabel ? overflowLabel(overflowCount) : `+${overflowCount}`}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  )
}

export { AvatarGroup }
