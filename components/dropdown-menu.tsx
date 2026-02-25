'use client'

import { Menu as DropdownMenuPrimitive } from "@base-ui/react/menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import * as React from "react"
import { ReactElement } from "react"

import { dropdownMenuStyles } from "./dropdown-menu.styles"

const {
  content,
  item,
  checkboxItem,
  radioItem,
  label,
  separator,
  shortcut,
  subTrigger,
  subContent,
} = dropdownMenuStyles

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  asChild = false,
  nativeButton,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>, "render"> & {
  asChild?: boolean
  children?: React.ReactNode
}) {
  const resolvedRender =
    asChild && React.isValidElement(children)
      ? (children as ReactElement)
      : undefined
  const isNonButtonIntrinsicElement =
    React.isValidElement(resolvedRender) &&
    typeof resolvedRender.type === "string" &&
    resolvedRender.type !== "button"
  const resolvedNativeButton =
    nativeButton ?? (resolvedRender ? !isNonButtonIntrinsicElement : true)

  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      nativeButton={resolvedNativeButton}
      render={resolvedRender}
      {...props}
    >
      {!resolvedRender ? children : null}
    </DropdownMenuPrimitive.Trigger>
  )
}

function DropdownMenuContent({
  className,
  align,
  side,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Popup> & {
  align?: React.ComponentProps<typeof DropdownMenuPrimitive.Positioner>["align"]
  side?: React.ComponentProps<typeof DropdownMenuPrimitive.Positioner>["side"]
  sideOffset?: number
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <DropdownMenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={content({ className: className as string })}
          {...props}
        />
      </DropdownMenuPrimitive.Positioner>
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={item({ className: className as string })}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={checkboxItem({ className: className as string })}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.CheckboxItemIndicator>
          <Check className="size-4" />
        </DropdownMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={radioItem({ className: className as string })}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.RadioItemIndicator>
          <Circle className="size-2 fill-current" />
        </DropdownMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.GroupLabel> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={label({ className: className as string })}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={separator({ className: className as string })}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={shortcut({ className: className as string })}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubmenuRoot>) {
  return (
    <DropdownMenuPrimitive.SubmenuRoot
      data-slot="dropdown-menu-sub"
      {...props}
    />
  )
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubmenuTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={subTrigger({ className: className as string })}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  align,
  side,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Popup> & {
  align?: React.ComponentProps<typeof DropdownMenuPrimitive.Positioner>["align"]
  side?: React.ComponentProps<typeof DropdownMenuPrimitive.Positioner>["side"]
  sideOffset?: number
}) {
  return (
    <DropdownMenuPrimitive.Positioner
      align={align}
      side={side}
      sideOffset={sideOffset}
    >
      <DropdownMenuPrimitive.Popup
        data-slot="dropdown-menu-sub-content"
        className={subContent({ className: className as string })}
        {...props}
      />
    </DropdownMenuPrimitive.Positioner>
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
