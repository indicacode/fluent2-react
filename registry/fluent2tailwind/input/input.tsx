"use client"

import * as React from "react"
import { ComponentProps, type ReactNode } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const inputVariants = tv({
  slots: {
    root: "flex",
    label: "py-1 text-foreground",
    inputContainer:
      "relative flex w-full items-center gap-1 overflow-hidden rounded-[4px] px-2 text-muted-foreground shadow-xs outline-0 transition-all select-none",
    inputDecoration:
      "absolute bottom-0 left-[50%] z-10 h-full max-h-[0px] w-full max-w-[0px] translate-x-[-50%] scale-y-1 bg-primary text-primary-foreground transition-all",
    input:
      "h-full w-full border-none bg-transparent placeholder:text-muted-foreground outline-hidden select-text text-foreground",
  },
  variants: {
    variant: {
      outline: { inputContainer: "border-[1px] bg-background" },
      underline: {
        inputContainer: "border-b border-border bg-transparent",
      },
      filledLight: {
        inputContainer: "bg-background dark:bg-background/90",
      },
      filledDark: {
        inputContainer: "bg-secondary",
      },
    },
    orientation: {
      horizontal: { root: "flex-row gap-2" },
      vertical: { root: "flex-col" },
    },
    size: {
      sm: {
        inputContainer: "max-h-6 min-h-6 text-sm leading-6",
        input: "text-sm leading-6 placeholder:text-sm",
      },
      md: {
        inputContainer: "max-h-8 min-h-8 text-base leading-8",
        input: "text-base leading-8 placeholder:text-base",
      },
      lg: {
        inputContainer: "max-h-10 min-h-10 text-lg leading-10",
        input: "text-lg leading-10 placeholder:text-lg",
      },
    },
    disabled: {
      true: {
        inputContainer:
          "cursor-not-allowed bg-muted text-muted-foreground",
        input:
          "cursor-not-allowed text-muted-foreground placeholder:text-muted-foreground",
      },
    },
    state: {
      neutral: {
        inputContainer: "",
      },
      success: {
        inputContainer: "border-success",
      },
      fail: {
        label: "text-destructive dark:text-destructive",
        inputContainer: "border-destructive/80",
      },
      warning: {
        inputContainer: "border-warning",
      },
    },
    focus: {
      true: {
        inputDecoration: "max-h-[3px] max-w-full scale-y-[1.0]",
      },
    },
    active: {
      true: {
        inputDecoration: "max-h-[3px] max-w-full scale-y-[1.0] bg-border",
      },
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
    state: "neutral",
    orientation: "vertical",
  },
})

type InputProps = Omit<ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    containerClassName?: string
    helperText?: ReactNode
    labelText?: ReactNode
    iconOnly?: boolean
    required?: boolean
    error?: boolean
    children?: ReactNode
    orientation?: "horizontal" | "vertical"
    appearance?: "outline" | "underline" | "filledLight" | "filledDark"
  }

const { input, root, inputContainer, inputDecoration, label } = inputVariants()

function InputLeftAddon({ children }: { children: ReactNode }) {
  return <>{children}</>
}

function InputRightAddon({ children }: { children: ReactNode }) {
  return <>{children}</>
}

function Input({
  variant = "outline",
  appearance,
  containerClassName,
  state = "neutral",
  orientation = "vertical",
  iconOnly = false,
  size = "md",
  helperText,
  labelText,
  className,
  disabled,
  required = false,
  error,
  children,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [focus, setFocus] = React.useState(false)
  const [active, setActive] = React.useState(false)
  const inputId = React.useId()

  function handleMouseDown() {
    setActive(true)
  }

  function handleMouseUp() {
    setActive(false)
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    setFocus(true)
    onFocus?.(event)
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    setFocus(false)
    onBlur?.(event)
  }

  const RightAddon = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === InputRightAddon) {
      return React.cloneElement(child)
    }
  })

  const LeftAddon = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === InputLeftAddon) {
      return React.cloneElement(child)
    }
  })

  const inputState = error ? "fail" : state

  const resolvedVariant = appearance ?? variant

  return (
    <div className={root({ orientation })}>
      {labelText && (
        <label
          htmlFor={`input-${inputId}`}
          className={label({ state: inputState })}
        >
          {labelText} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <div>
        <div
          className={inputContainer({
            className: containerClassName,
            state: inputState,
            variant: resolvedVariant,
            disabled,
            active,
            focus,
            size,
          })}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {LeftAddon?.[0]}
          <div className={inputDecoration({ focus, active })} />
          <input
            data-slot="input"
            id={`input-${inputId}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className={input({
              className,
              variant: resolvedVariant,
              disabled,
              size,
            })}
            {...props}
          />
          {RightAddon?.[0]}
        </div>
        {helperText && (
          <p
            className={`text-xs text-muted-foreground ${
              inputState === "fail" ? "text-destructive dark:text-destructive" : ""
            }`}
          >
            {helperText}
          </p>
        )}
      </div>
    </div>
  )
}

Input.displayName = "Input"

export {
  Input,
  InputLeftAddon,
  InputRightAddon,
  inputVariants,
  type InputProps,
}
