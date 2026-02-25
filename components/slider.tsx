"use client"

import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const Root = SliderPrimitive.Root
const Control = SliderPrimitive.Control
const Track = SliderPrimitive.Track
const Indicator = SliderPrimitive.Indicator
const Thumb = SliderPrimitive.Thumb

const sliderVariants = tv({
  slots: {
    root: "relative flex touch-none select-none",
    range: "absolute bg-primary",
    track: "relative grow overflow-hidden rounded-full bg-secondary",
    thumb:
      "relative block rounded-full border-[1.5px] border-foreground/50 bg-background shadow-sm transition-colors before:absolute before:top-1/2 before:left-1/2 before:aspect-square before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full before:bg-primary before:content-[''] focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
  },
  variants: {
    orientation: {
      horizontal: {
        root: "w-full items-center",
        track: "w-full",
        range: "h-full",
      },
      vertical: {
        root: "h-full flex-col items-center",
        track: "h-full",
        range: "w-full",
      },
    },
    size: {
      sm: { thumb: "h-4 w-4 before:w-2.5" },
      md: { thumb: "h-5 w-5 before:w-3" },
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      class: { track: "h-1" },
    },
    {
      orientation: "horizontal",
      size: "md",
      class: { track: "h-2" },
    },
    {
      orientation: "vertical",
      size: "sm",
      class: { track: "w-1" },
    },
    {
      orientation: "vertical",
      size: "md",
      class: { track: "w-2" },
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
})

type SliderProps = ComponentProps<typeof Root> &
  VariantProps<typeof sliderVariants> & {
    vertical?: boolean
    onChange?: (value: number[]) => void
  }

export function Slider({
  className,
  size,
  orientation = "horizontal",
  vertical = false,
  defaultValue,
  value,
  min = 0,
  max = 100,
  onChange,
  ...props
}: SliderProps) {
  const resolvedOrientation = vertical ? "vertical" : orientation
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]
  const { root, track, range, thumb } = sliderVariants({
    size,
    orientation: resolvedOrientation,
  })
  return (
    <Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      orientation={resolvedOrientation}
      onValueChange={onChange}
      className={root({ className: className as string })}
      {...props}
    >
      <Control>
        <Track className={track()}>
          <Indicator className={range()} />
        </Track>
      </Control>
      {Array.from({ length: _values.length }, (_, index) => (
        <Thumb key={index} className={thumb()} />
      ))}
    </Root>
  )
}
