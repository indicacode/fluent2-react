import React from "react"
import { tv } from "tailwind-variants"

const linkVariants = tv({
  base: "text-foreground",
  variants: {
    appearance: {
      default: "text-primary",
      subtle: "",
    },
    disabled: {
      true: "cursor-not-allowed text-muted-foreground",
      false: "hover:underline",
    },
    disabledFocusable: {
      true: "focus:ring-0 focus:outline-none",
      false: "",
    },
    inline: { true: "inline underline", false: "" },
  },
  defaultVariants: {
    appearance: "default",
    disabled: false,
    disabledFocusable: false,
  },
})

type Tags = "a" | "button" | "span"

type PolymorphicProps<T extends React.ElementType> = {
  as?: T
} & LinkProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof LinkProps | "as">

type LinkProps = React.ComponentPropsWithoutRef<"a"> & {
  appearance?: "default" | "subtle"
  disabled?: boolean
  disabledFocusable?: boolean
  inline?: boolean
  href?: string | undefined
}

function Link({
  as,
  appearance,
  disabled,
  disabledFocusable,
  inline,
  href,
  children,
  className,
  onClick,
  ...props
}: PolymorphicProps<Tags>) {
  const isDisabled = disabled ?? false
  const isDisabledFocusable = disabledFocusable ?? false
  const isVisuallyDisabled = isDisabled || isDisabledFocusable
  const shouldBlockInteraction = isDisabled && !isDisabledFocusable
  const Component = (shouldBlockInteraction && "p") || as || "a"

  const handleClick = (event: React.MouseEvent) => {
    if (isVisuallyDisabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    onClick?.(event as React.MouseEvent<HTMLAnchorElement>)
  }

  return (
    <Component
      href={shouldBlockInteraction ? undefined : href}
      className={linkVariants({
        appearance,
        disabled: isVisuallyDisabled,
        disabledFocusable,
        inline,
        className: [className, isDisabledFocusable ? "opacity-100" : ""].join(
          " "
        ),
      })}
      aria-disabled={isVisuallyDisabled || undefined}
      tabIndex={isDisabledFocusable ? 0 : undefined}
      role={isDisabledFocusable && Component === "p" ? "link" : undefined}
      onClick={handleClick}
      {...(props as any)}
    >
      {children}
    </Component>
  )
}

export default Link
