"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { ComponentPropsWithoutRef, useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa"
import { tv, VariantProps } from "tailwind-variants"

const Root = CheckboxPrimitive.Root
const Indicator = CheckboxPrimitive.Indicator
type CheckedState = boolean | "indeterminate"

const checkboxSlots = tv({
  slots: {
    checkbox: `peer data-[state=checked]:border-primary data-[state=indeterminate]:border-primary flex aspect-square shrink-0 overflow-hidden rounded-xs border border-border p-1 text-primary-foreground shadow-sm transition-colors hover:cursor-pointer hover:border-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary dark:data-[state=checked]:bg-muted dark:data-[state=checked]:text-foreground justify-center items-center`,
    indicator:
      "flex h-full max-h-2 w-full max-w-2 items-center justify-center text-primary-foreground [&_svg]:h-3 [&_svg]:w-3",
    indeterminate:
      "aspect-square min-h-[50%] min-w-[50%] rounded-xs bg-primary",
    indeterminateContainer: "flex items-center justify-center",
  },
  variants: {
    shape: {
      circular: {
        checkbox: "rounded-full",
        indeterminate: "rounded-full",
      },
      square: {
        checkbox: "rounded-xs",
        indeterminate: "rounded-xs",
      },
    },
    size: {
      medium: {
        checkbox: "max-h-4 min-h-4 max-w-4 min-w-4",
        indeterminateContainer: "min-h-4 min-w-4",
      },
      large: {
        checkbox: "max-h-5 min-h-5 max-w-5 min-w-5",
        indeterminateContainer: "min-h-5 min-w-5",
      },
    },
  },
  defaultVariants: {
    size: "medium",
    shape: "square",
  },
})

interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<typeof Root>, "onChange" | "checked">,
    VariantProps<typeof checkboxSlots> {
  checked?: CheckedState
  onChange?: (checked: CheckedState) => void
  labelPosition?: "before" | "after"
  children?: React.ReactNode
  rounded?: boolean
}

export function Checkbox({
  onChange,
  defaultChecked = false,
  shape = "square",
  rounded,
  size = "medium",
  labelPosition = "after",
  className,
  checked,
  children,
  ...props
}: CheckboxProps) {
  const resolvedShape = rounded ? "circular" : shape
  const [internalState, setInternalState] =
    useState<CheckedState>(defaultChecked)
  const styles = checkboxSlots({ shape: resolvedShape, size })

  useEffect(() => {
    if (checked !== undefined) {
      setInternalState(checked)
    }
  }, [checked])

  const checkboxNode = (
    <Root
      checked={checked === "indeterminate" ? undefined : checked}
      defaultChecked={defaultChecked}
      onCheckedChange={(nextChecked) => {
        const nextValue = nextChecked as CheckedState
        if (checked === undefined) {
          setInternalState(nextValue)
        }
        onChange?.(nextValue)
      }}
      className={styles.checkbox({ className: className as string })}
      {...props}
    >
      <Indicator className={styles.indicator()}>
        {internalState === "indeterminate" ? (
          <div className={styles.indeterminateContainer()}>
            <span className={styles.indeterminate()} />
          </div>
        ) : (
          internalState && <FaCheck />
        )}
      </Indicator>
    </Root>
  )

  if (!children) {
    return checkboxNode
  }

  return (
    <label className="flex items-center gap-2">
      {labelPosition === "before" && <span>{children}</span>}
      {checkboxNode}
      {labelPosition === "after" && <span>{children}</span>}
    </label>
  )
}
