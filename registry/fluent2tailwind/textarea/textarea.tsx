import { ComponentProps, useId, useState } from "react"
import { tv, VariantProps } from "tailwind-variants"

export type TextareaProps = ComponentProps<"textarea"> &
  VariantProps<typeof inputVariants> & {
    labelText: string
    error: boolean
    appearance?: "focus" | "outline" | "filledDark" | "filledLight"
  }

const inputVariants = tv({
  slots: {
    root:
      "relative z-10 flex flex-col overflow-hidden before:absolute before:bottom-0 before:left-[50%] before:scale-y-1 " +
      " before:w-full before:translate-x-[-50%] before:bg-primary before:transition-all before:content-['']",
    label: "text-lg font-bold text-foreground",
    textarea:
      "flex w-full resize-none rounded-md border bg-transparent px-4 py-2 text-clip " +
      " text-sm shadow-xs transition-colors duration-200 placeholder:text-muted-foreground focus:border-b-primary" +
      " focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 text-foreground",
  },
  variants: {
    variant: {
      focus: { textarea: "border-b-[2px] border-border" },
      outline: { textarea: "border-[1px] bg-transparent" },
      filledDark: { textarea: "bg-secondary" },
      filledLight: { textarea: "bg-background" },
    },
    size: {
      sm: { textarea: "min-h-16 w-full" },
      md: { textarea: "min-h-24 w-full" },
      lg: { textarea: "min-h-32 w-full" },
    },
    resize: {
      none: { textarea: "resize-none" },
      vertical: { textarea: "resize-y" },
      horizontal: { textarea: "resize-x" },
      both: { textarea: "resize" },
    },
    error: {
      true: {
        root: "before:h-0 before:w-0",
        textarea: "border border-destructive",
      },
      false: {
        root: "relative z-10 h-fit before:h-full before:max-h-[0px]",
      },
    },
    focus: {
      true: {
        root: "before:h-[3px] before:max-w-full before:scale-y-[1.0]",
      },
    },
    active: {
      true: {
        root: "before:max-h-[3px] before:max-w-full before:scale-y-[1.0] before:bg-border",
      },
    },
  },
  defaultVariants: {
    resize: "none",
  },
})
const { textarea, label, root } = inputVariants()

export function Textarea({
  className,
  labelText,
  variant,
  appearance,
  size,
  resize,
  error = false,
  ...props
}: TextareaProps) {
  const [focus, setFocus] = useState(false)
  const [active, setActive] = useState(false)

  function handleFocus() {
    setFocus(true)
  }

  function handleBlur() {
    setFocus(false)
  }

  function handleMouseDown() {
    setActive(true)
  }

  function handleMouseUp() {
    setActive(false)
  }
  //-------------------------------------------------------------//
  const uid = useId()

  const resolvedVariant = appearance ?? variant

  return (
    <div className={root({ error: error, focus: focus, active: active })}>
      <label htmlFor={uid} className={label()}>
        {labelText}
      </label>
      <textarea
        data-slot="textarea"
        id={uid}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={textarea({
          className,
          variant: resolvedVariant,
          size,
          resize,
          error,
          focus,
          active,
        })}
        {...props}
      />
    </div>
  )
}
