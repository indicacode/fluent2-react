"use client"

import * as React from "react"
import {
  DropdownMenu as Menubar,
  DropdownMenuCheckboxItem as MenubarCheckboxItem,
  DropdownMenuContent as MenubarContent,
  DropdownMenuGroup as MenubarGroup,
  DropdownMenuItem as MenubarItem,
  DropdownMenuLabel as MenubarLabel,
  DropdownMenuPortal as MenubarPortal,
  DropdownMenuRadioGroup as MenubarRadioGroup,
  DropdownMenuRadioItem as MenubarRadioItem,
  DropdownMenuSeparator as MenubarSeparator,
  DropdownMenuShortcut as MenubarShortcut,
  DropdownMenuSub as MenubarSub,
  DropdownMenuSubContent as MenubarSubContent,
  DropdownMenuSubTrigger as MenubarSubTrigger,
  DropdownMenuTrigger as MenubarTrigger,
} from "@/components/dropdown-menu"

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof Menubar>) {
  return <Menubar data-slot="menubar-menu" {...props} />
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
}
