"use client"

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"
import * as React from "react"

import { tv } from "tailwind-variants"

const scrollAreaSlots = tv({
  slots: {
    root: "relative",
    scrollbar: "flex touch-none p-px transition-colors select-none",
    thumb: "bg-border relative flex-1 rounded-full",
  },
  variants: {
    orientation: {
      vertical: {
        scrollbar: "h-full w-2.5 border-l border-l-transparent",
      },
      horizontal: {
        scrollbar: "h-2.5 flex-col border-t border-t-transparent",
      },
    },
  },
})

const { root, scrollbar, thumb } = scrollAreaSlots()

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={root({ className: className as string })}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={scrollbar({ orientation, className })}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className={thumb()}
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
