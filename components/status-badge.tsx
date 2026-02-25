import { tv, VariantProps } from "tailwind-variants" //--------------------types--------------------//
//--------------------types--------------------//

type StatusBadgeProps = VariantProps<typeof statusBadge> & {
  className?: string
  outOfOffice?: boolean
}

//--------------------------------------------//

const statusBadge = tv({
  base: "absolute right-0 bottom-0 aspect-square rounded-full",
  variants: {
    variant: {
      default: "rounded-full",
    },
    size: {
      sm: "h-2 w-2", // 12px
      md: "h-3 w-3", // 16px
      lg: "right-0.5 bottom-0.5 h-4 w-4", // 20px
      // icon: "h-1 w-1",
    },
    status: {
      online: "bg-success",
      offline: "bg-border",
      away: "bg-warning",
      busy: "bg-error",
      "do-not-disturb": "bg-destructive",
    },
    outOfOffice: {
      true: "ring-2 ring-background",
    },
    shape: {
      circular: "rounded-full",
      rounded: "rounded-md",
      square: "rounded-none",
    },
    appearance: {
      filled: "bg-opacity-100",
      ghost: "bg-opacity-0",
      outline: "border border-current",
      tint: "bg-opacity-50",
    },
    iconPosition: {
      before: "flex-row-reverse",
      after: "flex-row",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

export function StatusBadge({
  status = "offline",
  appearance = "filled",
  iconPosition = "before",
  shape = "circular",
  size,
  variant = "default",
  className,
  outOfOffice = false,
}: StatusBadgeProps) {
  return (
    <div
      className={statusBadge({
        status,
        appearance,
        iconPosition,
        shape,
        size,
        variant,
        outOfOffice,
        className,
      })}
    />
  )
}
