"use client"

import * as React from "react"
import { createContext, useContext } from "react"
import { tv, VariantProps } from "tailwind-variants"

const swatchPicker = tv({
  slots: {
    root: "flex flex-wrap gap-2",
    swatch:
      "relative flex h-8 w-8 items-center justify-center overflow-hidden border border-border",
    selectedRing: "ring-2 ring-primary",
    image: "h-full w-full object-cover",
  },
  variants: {
    shape: {
      rounded: { swatch: "rounded-md" },
      square: { swatch: "rounded-none" },
    },
    size: {
      sm: { swatch: "h-6 w-6" },
      md: { swatch: "h-8 w-8" },
      lg: { swatch: "h-10 w-10" },
    },
    disabled: {
      true: { root: "opacity-60", swatch: "cursor-not-allowed" },
    },
  },
  defaultVariants: {
    shape: "rounded",
    size: "md",
  },
})

const { root, swatch, selectedRing, image } = swatchPicker()

type SwatchPickerContextValue = {
  value?: string
  onChange?: (value: string) => void
  size?: "sm" | "md" | "lg"
  shape?: "rounded" | "square"
  disabled?: boolean
}

const SwatchPickerContext = createContext<SwatchPickerContextValue | null>(null)

export type SwatchPickerProps = React.ComponentProps<"div"> &
  VariantProps<typeof swatchPicker> & {
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
  }

function SwatchPicker({
  value,
  defaultValue,
  onChange,
  size,
  shape,
  disabled,
  className,
  children,
  ...props
}: SwatchPickerProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState(defaultValue)
  const currentValue = isControlled ? value : internal

  function handleChange(nextValue: string) {
    if (!isControlled) {
      setInternal(nextValue)
    }
    onChange?.(nextValue)
  }

  return (
    <SwatchPickerContext.Provider
      value={{ value: currentValue, onChange: handleChange, size, shape, disabled }}
    >
      <div
        data-slot="swatch-picker"
        className={root({ size, shape, disabled, className })}
        {...props}
      >
        {children}
      </div>
    </SwatchPickerContext.Provider>
  )
}

export type ColorSwatchProps = React.ComponentProps<"button"> & {
  value: string
  color: string
}

function ColorSwatch({ value, color, className, ...props }: ColorSwatchProps) {
  const context = useContext(SwatchPickerContext)
  const selected = context?.value === value

  return (
    <button
      type="button"
      data-slot="color-swatch"
      className={swatch({
        size: context?.size,
        shape: context?.shape,
        disabled: context?.disabled,
        className,
      })}
      style={{ backgroundColor: color }}
      onClick={() => context?.onChange?.(value)}
      disabled={context?.disabled}
      {...props}
    >
      {selected && <span className={selectedRing()} />}
    </button>
  )
}

export type ImageSwatchProps = React.ComponentProps<"button"> & {
  value: string
  src: string
  alt?: string
}

function ImageSwatch({ value, src, alt, className, ...props }: ImageSwatchProps) {
  const context = useContext(SwatchPickerContext)
  const selected = context?.value === value

  return (
    <button
      type="button"
      data-slot="image-swatch"
      className={swatch({
        size: context?.size,
        shape: context?.shape,
        disabled: context?.disabled,
        className,
      })}
      onClick={() => context?.onChange?.(value)}
      disabled={context?.disabled}
      {...props}
    >
      <img src={src} alt={alt} className={image()} />
      {selected && <span className={selectedRing()} />}
    </button>
  )
}

export { SwatchPicker, ColorSwatch, ImageSwatch }
