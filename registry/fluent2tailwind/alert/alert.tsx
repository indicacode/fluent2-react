import { tv, VariantProps } from "tailwind-variants"

import { ComponentProps } from "react"

const alertVariants = tv({
  base: "relative w-full rounded-lg border border-border px-4 py-3 text-sm [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:text-foreground [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7",
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive:
        "border-destructive/50 text-destructive [&>svg]:text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const alertSlots = tv({
  slots: {
    title: "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
    description:
      "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
  },
})

const { title, description } = alertSlots()

function Alert({
  className,
  variant,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      role="alert"
      data-slot="alert"
      className={alertVariants({ variant, className })}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={title({ className })}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={description({ className })}
      {...props}
    />
  )
}

export { Alert, AlertDescription, AlertTitle }
