import { Slot } from "@/components/slot"
import { ComponentProps, type MouseEvent, ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    icon?: ReactNode
    iconPosition?: "before" | "after"
    iconOnly?: boolean
    appearance?: "primary" | "secondary" | "outline" | "subtle" | "transparent"
    isDisabled?: boolean
    disabledFocusable?: boolean
  }

export const buttonVariants = tv({
  base: "text-md flex cursor-pointer items-center justify-center px-3 py-1 font-medium transition-colors data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 data-[disabled=true]:active:border-inherit",
  variants: {
    variant: {
      primary:
        "bg-primary text-primary-foreground duration-400 hover:bg-primary/90 active:bg-primary/80 " +
        " data-[disabled=true]:bg-muted data-[disabled=true]:text-muted-foreground data-[disabled=true]:active:border-transparent data-[selected=true]:before:bg-background",
      secondary:
        "bg-secondary text-secondary-foreground before:border-border hover:bg-secondary/90 active:bg-secondary/80 data-[disabled=true]:bg-muted data-[disabled=true]:text-muted-foreground data-[selected=true]:before:bg-foreground",
      outline:
        "border-primary data-[disabled=true]:active:border-primary border-2 shadow-xs before:border-primary active:border-primary active:before:border-primary data-[selected=true]:before:bg-foreground " +
        " data-[disabled=false]:hover:bg-muted text-primary",
      transparent:
        "data-[selected=true]:text-primary bg-transparent active:before:bg-primary data-[selected=true]:before:bg-primary " +
        " data-[disabled=false]:hover:text-primary hover:before:border-0 hover:before:bg-primary",
      subtle:
        "bg-transparent before:border-border active:before:bg-primary data-[disabled=false]:active:bg-secondary data-[selected=true]:bg-secondary " +
        " data-[disabled=false]:hover:bg-muted data-[selected=true]:before:border-0 data-[selected=true]:before:bg-primary" +
        " hover:before:border-0 hover:before:bg-primary text-foreground",
    },
    toggle: {
      true: "aspect-square w-fit before:rounded-full before:border-2 before:p-2 before:content-['']",
    },
    shape: {
      rounded: "rounded-[4px]",
      circular: "rounded-full",
      square: "rounded-none",
    },
    size: {
      default: "h-9 py-1",
      sm: "h-8 text-xs",
      lg: "h-10 px-8",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: {
    shape: "rounded",
    variant: "primary",
    size: "default",
  },
})

function handleToggle(event: MouseEvent<HTMLElement>, disabled: boolean | undefined): void {
  const { dataset } = event.currentTarget
  if (disabled) return // Prevent toggling if the button is disabled
  if (dataset.toggle === "true") {
    dataset.selected = dataset.selected === "true" ? "false" : "true"
  }
}

function Button({
  disabled = false,
  onClick = () => {},
  asChild = false,
  toggle = false,
  icon = false,
  iconPosition = "before",
  iconOnly = false,
  appearance,
  className,
  children,
  variant,
  shape,
  size,
  disabledFocusable = false,
  ...props
}: ButtonProps) {
  console.assert(
    !(toggle && children !== undefined),
    "You cannot pass children to a toggle button. Children:" + children
  )

  const Comp = asChild ? Slot : "button"

  const resolvedVariant = variant ?? appearance
  const isDisabled = disabled || props["aria-disabled"] === true

  return (
    <Comp
      data-slot="button"
      aria-disabled={disabledFocusable ? true : isDisabled}
      data-disabled={isDisabled.toString()}
      data-selected="false"
      data-toggle={toggle ? "true" : "false"} // Ensure proper data-toggle value
      disabled={disabledFocusable ? false : disabled}
      onClick={(event) => {
        if (!isDisabled) {
          handleToggle(event as MouseEvent<HTMLElement>, isDisabled)
          onClick(event as MouseEvent<HTMLButtonElement>)
        }
      }}
      className={buttonVariants({
        variant: resolvedVariant,
        shape,
        toggle,
        size,
        className,
      })}
      {...props}
    >
      {/* Render icon if provided and button is not toggle */}
      {!toggle && !!icon && iconPosition === "before" && <span>{icon}</span>}
      {!toggle && !iconOnly && children}
      {!toggle && !!icon && iconPosition === "after" && <span>{icon}</span>}
    </Comp>
  )
}

export { Button }
export default Button
