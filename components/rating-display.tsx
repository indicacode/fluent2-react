"use client"

import * as React from "react"
import { Rating } from "@/components/rating"
import { tv, VariantProps } from "tailwind-variants"

const ratingDisplay = tv({
  slots: {
    root: "inline-flex items-center gap-2 text-sm text-muted-foreground",
    text: "text-sm text-muted-foreground",
  },
  variants: {
    compact: {
      true: { root: "gap-1", text: "text-xs" },
    },
  },
})

const { root, text } = ratingDisplay()

export type RatingDisplayProps = VariantProps<typeof ratingDisplay> & {
  value: number
  max?: number
  count?: number
  size?: "small" | "medium" | "large" | "extra-large"
  color?: "neutral" | "brand" | "marigold"
  iconFilled?: React.ReactNode
  iconOutline?: React.ReactNode
}

function RatingDisplay({
  value,
  max = 5,
  count,
  size,
  color,
  compact,
  iconFilled,
  iconOutline,
}: RatingDisplayProps) {
  return (
    <div data-slot="rating-display" className={root({ compact })}>
      <Rating
        value={value}
        max={max}
        readOnly
        size={size}
        color={color}
        iconFilled={iconFilled}
        iconOutline={iconOutline}
      />
      <span className={text()}>
        {value.toFixed(1)} / {max}
        {typeof count === "number" ? ` (${count})` : ""}
      </span>
    </div>
  )
}

export { RatingDisplay }
