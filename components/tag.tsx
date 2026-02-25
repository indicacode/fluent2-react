"use client"

import * as React from "react"
import { X } from "lucide-react"
import { tv, VariantProps } from "tailwind-variants"

const tag = tv({
  slots: {
    root:
      "inline-flex items-center gap-1 border px-2 py-0.5 text-xs font-medium",
    secondary: "text-[0.7rem] text-muted-foreground",
    dismiss: "ml-1 text-muted-foreground hover:text-foreground",
  },
  variants: {
    appearance: {
      filled: { root: "bg-muted border-border text-foreground" },
      outline: { root: "bg-transparent border-border text-muted-foreground" },
      brand: { root: "bg-primary border-primary text-primary-foreground" },
    },
    size: {
      "extra-small": { root: "text-[0.65rem] px-1.5" },
      small: { root: "text-xs px-2" },
      medium: { root: "text-sm px-2.5 py-1" },
    },
    shape: {
      rounded: { root: "rounded-md" },
      circular: { root: "rounded-full" },
    },
    selected: {
      true: { root: "ring-1 ring-primary" },
    },
    disabled: {
      true: { root: "opacity-60 cursor-not-allowed" },
    },
  },
  defaultVariants: {
    appearance: "filled",
    size: "medium",
    shape: "rounded",
  },
})

const { root, secondary, dismiss } = tag()

export type TagProps = React.ComponentProps<"span"> &
  VariantProps<typeof tag> & {
    icon?: React.ReactNode
    media?: React.ReactNode
    secondaryText?: React.ReactNode
    dismissible?: boolean
    onDismiss?: () => void
  }

function Tag({
  className,
  appearance,
  size,
  shape,
  selected,
  disabled,
  icon,
  media,
  secondaryText,
  dismissible,
  onDismiss,
  children,
  ...props
}: TagProps) {
  return (
    <span
      data-slot="tag"
      className={root({ appearance, size, shape, selected, disabled, className })}
      {...props}
    >
      {media}
      {icon}
      <span className="inline-flex flex-col">
        <span>{children}</span>
        {secondaryText && (
          <span className={secondary()}>{secondaryText}</span>
        )}
      </span>
      {dismissible && !disabled && (
        <button
          type="button"
          className={dismiss()}
          onClick={onDismiss}
          aria-label="Dismiss tag"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
}

export type TagGroupProps = React.ComponentProps<"div"> & {
  onDismiss?: (value: string) => void
}

function TagGroup({ className, ...props }: TagGroupProps) {
  return (
    <div data-slot="tag-group" className={`flex flex-wrap gap-2 ${className ?? ""}`} {...props} />
  )
}

export { Tag, TagGroup }
