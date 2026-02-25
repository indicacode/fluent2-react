"use client"

import * as React from "react"

function AspectRatio({
  ratio = 1 / 1,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & { ratio?: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{ position: "relative", width: "100%", ...style }}
      {...props}
    >
      <div style={{ paddingBottom: `${100 / ratio}%` }} />
      <div style={{ position: "absolute", inset: 0 }}>{children}</div>
    </div>
  )
}

export { AspectRatio }
