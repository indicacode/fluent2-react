"use client"

import * as React from "react"

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode
}

// Minimal slot utility for `asChild` patterns used across components.
export function Slot({ children, ...props }: SlotProps) {
  if (!React.isValidElement(children)) {
    return null
  }

  return React.cloneElement(
    children as React.ReactElement<Record<string, unknown>>,
    props
  )
}
