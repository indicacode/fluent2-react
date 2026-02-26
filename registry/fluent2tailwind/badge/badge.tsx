import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

type badgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeSlots> & {
    asChild?: boolean
    as?: "div"
    icon?: ReactNode
    iconPosition?: "before" | "after"
  }

const badgeSlots = tv({
  slots: {
    root:
      "inline-flex items-center gap-1 font-semibold transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:outline-hidden",
  },
  variants: {
    appearance: {
      filled: { root: "shadow-sm" },
      ghost: { root: "!bg-transparent !text-foreground" },
      outline: { root: "border !border-border !bg-transparent !text-foreground" },
      tint: { root: "border !border-border !bg-muted !text-foreground" },
    },
    size: {
      tiny: { root: "h-2 min-w-2 px-[0.2rem] py-[1px] text-[0.30rem]" },
      "extra-small": { root: "h-3 min-w-3 px-[0.3rem] text-[0.45rem]" },
      small: { root: "h-4 min-w-4 px-[0.4rem] py-[0.025] text-[0.60rem]" },
      medium: { root: "h-5 min-w-5 px-[0.5rem] py-[0.125] text-[0.75rem]" },
      large: { root: "h-6 min-w-6 px-[0.6rem] py-[0.225] text-[0.9rem]" },
      "extra-large": {
        root: "h-7 min-w-7 px-[0.7rem] py-[0.325] text-[1.05rem]",
      },
    },
    shape: {
      square: { root: "rounded-none" },
      rounded: { root: "rounded-md" },
      circular: { root: "rounded-full" },
    },
    color: {
      brand: {
        root: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      danger: {
        root:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      important: {
        root: "bg-warning text-warning-foreground hover:bg-warning/90",
      },
      informative: {
        root: "bg-info text-info-foreground hover:bg-info/90",
      },
      severe: {
        root: "bg-error text-error-foreground hover:bg-error/90",
      },
      subtle: {
        root: "bg-secondary text-foreground hover:bg-secondary/90",
      },
      success: {
        root: "bg-success text-success-foreground hover:bg-success/90",
      },
      warning: {
        root: "bg-warning text-warning-foreground hover:bg-warning/90",
      },
    },
  },
  defaultVariants: {
    color: "brand",
    size: "medium",
    shape: "circular",
  },
})

const { root: badgeVariants } = badgeSlots()

function Badge({
  className,
  appearance,
  asChild = false,
  size,
  shape,
  children,
  color,
  icon,
  iconPosition = "before",
  as = "div",
  ...props
}: badgeProps) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={badgeVariants({ appearance, size, shape, color, className })}
      {...props}
    >
      {iconPosition === "before" ? icon : ""}
      {children}
      {iconPosition === "after" ? icon : ""}
    </Comp>
  )
}

export { Badge, badgeVariants }
