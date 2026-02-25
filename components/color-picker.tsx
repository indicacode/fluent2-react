"use client"

import * as React from "react"
import { useEffect, useMemo, useState } from "react"
import { tv, VariantProps } from "tailwind-variants"

const colorPicker = tv({
  slots: {
    root: "flex items-center gap-3",
    swatch:
      "h-8 w-8 shrink-0 border border-border bg-background shadow-xs",
    input:
      "h-8 w-24 rounded-[4px] border border-border bg-background px-2 text-sm text-foreground outline-hidden focus:border-primary",
    colorInput:
      "h-8 w-10 cursor-pointer rounded-[4px] border border-border bg-background p-0",
  },
  variants: {
    shape: {
      rounded: { swatch: "rounded-md", colorInput: "rounded-md" },
      square: { swatch: "rounded-none", colorInput: "rounded-none" },
    },
    disabled: {
      true: {
        root: "opacity-60",
        input: "cursor-not-allowed bg-muted",
        colorInput: "cursor-not-allowed bg-muted",
      },
    },
    size: {
      sm: { swatch: "h-6 w-6", input: "h-7 w-20 text-xs" },
      md: { swatch: "h-8 w-8", input: "h-8 w-24 text-sm" },
      lg: { swatch: "h-10 w-10", input: "h-10 w-28 text-base" },
    },
  },
  defaultVariants: {
    shape: "rounded",
    size: "md",
  },
})

const { root, swatch, input, colorInput } = colorPicker()

export type ColorPickerProps = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "type"
> &
  VariantProps<typeof colorPicker> & {
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    showHexInput?: boolean
  }

function normalizeHex(value: string) {
  if (!value) return "#000000"
  if (value.startsWith("#")) return value
  return `#${value}`
}

function ColorPicker({
  value,
  defaultValue = "#2563eb",
  onChange,
  disabled,
  shape,
  size,
  showHexInput = true,
  className,
  ...props
}: ColorPickerProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(normalizeHex(defaultValue))
  const currentValue = useMemo(
    () => normalizeHex(isControlled ? value! : internal),
    [isControlled, value, internal]
  )

  useEffect(() => {
    if (isControlled && value) {
      setInternal(normalizeHex(value))
    }
  }, [isControlled, value])

  function handleChange(next: string) {
    if (!isControlled) {
      setInternal(next)
    }
    onChange?.(next)
  }

  return (
    <div
      data-slot="color-picker"
      className={root({ shape, size, disabled, className })}
    >
      <span
        aria-hidden
        className={swatch({ shape, size })}
        style={{ backgroundColor: currentValue }}
      />
      <input
        data-slot="color-picker-input"
        type="color"
        value={currentValue}
        onChange={(event) => handleChange(event.target.value)}
        disabled={disabled}
        className={colorInput({ shape, size, disabled })}
        {...props}
      />
      {showHexInput && (
        <input
          data-slot="color-picker-hex"
          type="text"
          value={currentValue.toUpperCase()}
          onChange={(event) => handleChange(normalizeHex(event.target.value))}
          disabled={disabled}
          className={input({ size, disabled })}
          aria-label="Hex color"
        />
      )}
    </div>
  )
}

export { ColorPicker }
