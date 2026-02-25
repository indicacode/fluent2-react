"use client"

import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { tv, VariantProps } from "tailwind-variants"

const spinButton = tv({
  slots: {
    root: "inline-flex items-center rounded-[4px] border border-border bg-background",
    input: "w-16 px-2 py-1 text-sm text-foreground outline-hidden",
    controls: "flex flex-col border-l border-border",
    controlButton:
      "h-4 w-6 items-center justify-center text-muted-foreground hover:bg-muted",
  },
  variants: {
    size: {
      sm: { input: "text-xs py-0.5 w-12", controlButton: "h-3" },
      md: { input: "text-sm py-1 w-16", controlButton: "h-4" },
      lg: { input: "text-base py-1.5 w-20", controlButton: "h-5" },
    },
    appearance: {
      outline: { root: "border-border" },
      underline: { root: "border-0 border-b border-border rounded-none" },
      filled: { root: "bg-muted border-border" },
    },
    disabled: {
      true: { root: "opacity-60", input: "cursor-not-allowed" },
    },
  },
  defaultVariants: {
    size: "md",
    appearance: "outline",
  },
})

const { root, input, controls, controlButton } = spinButton()

export type SpinButtonProps = Omit<
  React.ComponentProps<"input">,
  "size" | "defaultValue" | "value" | "onChange" | "type"
> &
  VariantProps<typeof spinButton> & {
    value?: number
    defaultValue?: number
    onChange?: (value: number) => void
    min?: number
    max?: number
    step?: number
    stepPage?: number
  }

function clamp(value: number, min?: number, max?: number) {
  if (min !== undefined && value < min) return min
  if (max !== undefined && value > max) return max
  return value
}

function SpinButton({
  value,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
  stepPage = 10,
  size,
  appearance,
  disabled,
  className,
  ...props
}: SpinButtonProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState(defaultValue)
  const currentValue = isControlled ? value! : internal

  function setValue(next: number) {
    const clamped = clamp(next, min, max)
    if (!isControlled) {
      setInternal(clamped)
    }
    onChange?.(clamped)
  }

  return (
    <div
      data-slot="spin-button"
      className={root({ size, appearance, disabled, className })}
    >
      <input
        data-slot="spin-button-input"
        type="number"
        value={currentValue}
        onChange={(event) => setValue(Number(event.target.value))}
        onKeyDown={(event) => {
          if (event.key === "PageUp") {
            event.preventDefault()
            setValue(currentValue + stepPage)
          }
          if (event.key === "PageDown") {
            event.preventDefault()
            setValue(currentValue - stepPage)
          }
        }}
        disabled={disabled}
        className={input({ size })}
        {...props}
      />
      <div className={controls()}>
        <button
          type="button"
          className={controlButton({ size })}
          onClick={() => setValue(currentValue + step)}
          disabled={disabled}
          aria-label="Increment"
        >
          <ChevronUp className="h-3 w-3" />
        </button>
        <button
          type="button"
          className={controlButton({ size })}
          onClick={() => setValue(currentValue - step)}
          disabled={disabled}
          aria-label="Decrement"
        >
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

export { SpinButton }
