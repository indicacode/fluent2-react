"use client"

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"
import * as React from "react"
import { tv } from "tailwind-variants"
import { ToggleGroup } from "@/components/toggle-group"
import { Toggle } from "@/components/toggle"

const toolbarVariants = tv({
  variants: {
    size: {
      small: "px-2 py-1 text-sm",
      medium: "px-3 py-2 text-base",
      large: "px-5 py-3 text-lg",
    },
    vertical: {
      true: "flex flex-col",
      false: "flex flex-row",
    },
  },
  defaultVariants: { size: "medium", vertical: false },
})

type ToolbarProps = React.ComponentProps<typeof ToolbarPrimitive.Root> & {
  size?: "small" | "medium" | "large"
  vertical?: boolean
}

function Toolbar({ size, vertical, className, ...props }: ToolbarProps) {
  return (
    <ToolbarPrimitive.Root
      data-slot="toolbar"
      className={`inline-flex items-center gap-2 rounded-md border border-border bg-background ${toolbarVariants({ size, vertical })} ${className ?? ""}`}
      {...props}
    />
  )
}

type ToolbarButtonProps = React.ComponentProps<typeof ToolbarPrimitive.Button>

function ToolbarButton({ className, ...props }: ToolbarButtonProps) {
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm hover:bg-muted ${className ?? ""}`}
      {...props}
    />
  )
}

type ToolbarDividerProps = React.ComponentProps<typeof ToolbarPrimitive.Separator>

function ToolbarDivider({ className, ...props }: ToolbarDividerProps) {
  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-divider"
      className={`mx-1 h-5 w-px bg-secondary ${className ?? ""}`}
      {...props}
    />
  )
}

type ToolbarGroupProps = React.ComponentProps<typeof ToggleGroup>

function ToolbarGroup({ className, ...props }: ToolbarGroupProps) {
  return (
    <ToggleGroup
      data-slot="toolbar-group"
      className={`inline-flex items-center gap-1 ${className ?? ""}`}
      {...props}
    />
  )
}

type ToolbarRadioButtonProps = React.ComponentProps<typeof Toggle>

function ToolbarRadioButton({ className, ...props }: ToolbarRadioButtonProps) {
  return (
    <Toggle
      data-slot="toolbar-radio-button"
      className={`inline-flex items-center rounded-md px-2 py-1 text-sm hover:bg-muted data-[state=on]:bg-secondary ${className ?? ""}`}
      {...props}
    />
  )
}

type ToolbarRadioGroupProps = React.ComponentProps<typeof ToggleGroup>

function ToolbarRadioGroup({ className, ...props }: ToolbarRadioGroupProps) {
  return (
    <ToggleGroup
      data-slot="toolbar-radio-group"
      className={`inline-flex items-center gap-1 ${className ?? ""}`}
      {...props}
    />
  )
}

type ToolbarToogleButtonProps = React.ComponentProps<typeof Toggle>

function ToolbarToogleButton({ className, ...props }: ToolbarToogleButtonProps) {
  return (
    <Toggle
      data-slot="toolbar-toggle-button"
      className={`inline-flex items-center rounded-md px-2 py-1 text-sm hover:bg-muted data-[state=on]:bg-secondary ${className ?? ""}`}
      {...props}
    />
  )
}

export {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioButton,
  ToolbarRadioGroup,
  ToolbarToogleButton,
}
