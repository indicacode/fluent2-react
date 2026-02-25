"use client"

import * as React from "react"
import { Star16Filled, Star16Regular } from "@fluentui/react-icons"
import { tv, VariantProps } from "tailwind-variants"

const rating = tv({
  slots: {
    root: "inline-flex items-center gap-1",
    item: "relative inline-flex items-center justify-center",
    icon: "text-muted-foreground",
    filled: "text-primary",
  },
  variants: {
    size: {
      small: { item: "h-4 w-4" },
      medium: { item: "h-5 w-5" },
      large: { item: "h-6 w-6" },
      "extra-large": { item: "h-7 w-7" },
    },
    color: {
      neutral: { filled: "text-muted-foreground" },
      brand: { filled: "text-primary" },
      marigold: { filled: "text-warning-foreground" },
    },
    disabled: {
      true: { root: "opacity-60" },
    },
  },
  defaultVariants: {
    size: "medium",
    color: "neutral",
  },
})

const { root, item, icon, filled } = rating()

export type RatingProps = React.ComponentProps<"div"> &
  VariantProps<typeof rating> & {
    value?: number
    defaultValue?: number
    max?: number
    step?: number
    onChange?: (value: number) => void
    readOnly?: boolean
    iconFilled?: React.ReactNode
    iconOutline?: React.ReactNode
  }

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function Rating({
  value,
  defaultValue = 0,
  max = 5,
  step = 1,
  onChange,
  readOnly = false,
  size,
  color,
  disabled,
  iconFilled,
  iconOutline,
  className,
  ...props
}: RatingProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = isControlled ? value! : internalValue

  function setValue(next: number) {
    const normalized = clamp(next, 0, max)
    if (!isControlled) {
      setInternalValue(normalized)
    }
    onChange?.(normalized)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (readOnly || disabled) return
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault()
      setValue(index + step)
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault()
      setValue(index - step)
    }
  }

  return (
    <div
      data-slot="rating"
      className={root({ size, color, disabled, className })}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      {...props}
    >
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1
        const fillPercent = clamp(currentValue - index, 0, 1) * 100

        return (
          <button
            key={`rating-${index}`}
            type="button"
            className={item({ size })}
            onClick={() => !readOnly && !disabled && setValue(starValue)}
            onKeyDown={(event) => handleKeyDown(event, starValue)}
            disabled={disabled}
            aria-label={`Rate ${starValue} out of ${max}`}
          >
            <span className={icon()}>{iconOutline ?? <Star16Regular />}</span>
            <span
              className={filled({ color })}
              style={{
                position: "absolute",
                inset: 0,
                width: `${fillPercent}%`,
                overflow: "hidden",
              }}
            >
              {iconFilled ?? <Star16Filled />}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export { Rating }
