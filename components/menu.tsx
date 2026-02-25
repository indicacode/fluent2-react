"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"
import { tv } from "tailwind-variants"

const menu = tv({
  slots: {
    list: "min-w-[12rem]",
  },
  variants: {
    hasIcons: {
      true: { list: "[&_[data-slot=dropdown-menu-item]>svg]:opacity-100" },
    },
    hasCheckmarks: {
      true: { list: "[&_[data-slot=dropdown-menu-item]]:pl-8" },
    },
  },
})

const { list } = menu()

function Menu({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu data-slot="menu" {...props} />
}

function MenuTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuTrigger>) {
  return <DropdownMenuTrigger data-slot="menu-trigger" {...props} />
}

function MenuList({
  className,
  hasIcons,
  hasCheckmarks,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent> & {
  hasIcons?: boolean
  hasCheckmarks?: boolean
}) {
  return (
    <DropdownMenuContent
      data-slot="menu-list"
      className={list({ hasIcons, hasCheckmarks, className })}
      {...props}
    />
  )
}

function MenuItem({ ...props }: React.ComponentProps<typeof DropdownMenuItem>) {
  return <DropdownMenuItem data-slot="menu-item" {...props} />
}

function MenuItemCheckbox({
  ...props
}: React.ComponentProps<typeof DropdownMenuCheckboxItem>) {
  return <DropdownMenuCheckboxItem data-slot="menu-item-checkbox" {...props} />
}

function MenuItemRadio({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioItem>) {
  return <DropdownMenuRadioItem data-slot="menu-item-radio" {...props} />
}

function MenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuGroup>) {
  return <DropdownMenuGroup data-slot="menu-group" {...props} />
}

function MenuDivider({
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return <DropdownMenuSeparator data-slot="menu-divider" {...props} />
}

function MenuLabel({ ...props }: React.ComponentProps<typeof DropdownMenuLabel>) {
  return <DropdownMenuLabel data-slot="menu-label" {...props} />
}

function MenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
  return <DropdownMenuRadioGroup data-slot="menu-radio-group" {...props} />
}

function MenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuSub>) {
  return <DropdownMenuSub data-slot="menu-sub" {...props} />
}

function MenuSubTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger>) {
  return <DropdownMenuSubTrigger data-slot="menu-sub-trigger" {...props} />
}

function MenuSubContent({
  ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
  return <DropdownMenuSubContent data-slot="menu-sub-content" {...props} />
}

export {
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuLabel,
  MenuList,
  MenuRadioGroup,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
}
