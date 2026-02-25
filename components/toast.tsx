"use client"

import {
  ErrorCircle24Regular,
  Info24Regular,
  Warning24Regular,
} from "@fluentui/react-icons"
import {
  Toast as ToastPrimitive,
} from "@base-ui/react/toast"
import { X } from "lucide-react"
import { ComponentProps, HTMLAttributes, ReactElement } from "react"
import { tv, VariantProps } from "tailwind-variants"

const ToastProvider = ToastPrimitive.Provider
const Root = ToastPrimitive.Root
const Viewport = ToastPrimitive.Viewport
const Title = ToastPrimitive.Title
const Description = ToastPrimitive.Description
const Close = ToastPrimitive.Close
const Action = ToastPrimitive.Action
type RadixToastProps = ComponentProps<typeof Root>
type ToastActionProps = ComponentProps<typeof Action>
type ToastCloseProps = ComponentProps<typeof Close>
type ToastDescriptionProps = ComponentProps<typeof Description>
type ToastTitleProps = ComponentProps<typeof Title>
type ToastViewportProps = ComponentProps<typeof Viewport>

const toastVariants = tv({
  slots: {
    toast:
      "group pointer-events-auto relative flex w-full flex-col items-center gap-2 overflow-hidden rounded-sm p-4 shadow-md transition-all " +
      "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]" +
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[swipe=move]:transition-none" +
      "data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full",
    toastViewport:
      "fixed top-0 z-100 flex max-h-screen min-w-fit flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]",
    toastAction:
      "ring-offset-background hover:bg-secondary focus:ring-ring group-[.destructive]:border-muted/40 hover:group-[.destructive]:border-destructive/30 bg-background text-foreground " +
      "hover:group-[.destructive]:bg-destructive hover:group-[.destructive]:text-destructive-foreground focus:group-[.destructive]:ring-destructive" +
      "inline-flex h-6 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors focus:outline-hidden" +
      "focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    toastClose:
      "text-foreground/50 hover:text-foreground top-2 right-2 rounded-md p-1 opacity-0 transition-opacity focus:opacity-100 " +
      "group-hover:opacity-100 group-[.destructive]:text-error-foreground hover:group-[.destructive]:text-error-foreground focus:ring-2 focus:outline-hidden" +
      "focus:group-[.destructive]:ring-error focus:group-[.destructive]:ring-offset-error",
    toastIcon: "",
    toastTitle: "text-sm font-semibold text-foreground",
    toastDescription: "text-sm text-muted-foreground opacity-90",
  },
  variants: {
    location: {
      topright: "",
      topleft: "",
      topcenter: "",
      bottomcenter: "",
      bottomleft: "",
      bottomright: "",
    },
    variant: {
      info: {
        toast: "border-border bg-info",
        toastIcon: "text-info-foreground",
        toastAction: "border-border text-foreground",
      },
      warning: {
        toast: "border-warning bg-warning",
        toastIcon: "text-warning-foreground",
        toastAction: "border-warning text-foreground",
      },
      error: {
        toast: "border-error bg-error",
        toastIcon: "text-error-foreground",
        toastAction: "border-error text-foreground",
      },
      success: {
        toast: "border-success bg-success",
        toastIcon: "text-success-foreground",
        toastAction: "border-success text-foreground",
      },
    },
    messageBar: {
      true: {
        toast: "min-w-full border",
      },
    },
  },
  defaultVariants: {
    variant: "info",
  },
})

const {
  toast,
  toastViewport,
  toastAction,
  toastClose,
  toastIcon,
  toastTitle,
  toastDescription,
} =
  toastVariants({})

const ToastIcon = ({ variant }: VariantProps<typeof toastIcon>) => {
  function currentIcon(variant?: string) {
    if (variant === "info") {
      return <Info24Regular />
    }
    if (variant === "warning") {
      return <Warning24Regular />
    }
    if (variant === "error") {
      return <ErrorCircle24Regular />
    }
  }

  return <span className={toastIcon({ variant })}> {currentIcon(variant)}</span>
}

type ToastProps = VariantProps<typeof toast> &
  RadixToastProps &
  HTMLAttributes<HTMLLIElement> & {
    appearance?: "info" | "warning" | "error" | "success"
  }

function Toast({
  className,
  variant,
  appearance,
  messageBar,
  ...props
}: ToastProps) {
  return (
    <Root
      className={toast({
        variant: variant ?? appearance,
        messageBar,
        className: className as string,
      })}
      {...props}
    />
  )
}

function ToastViewport({ className, ...props }: ToastViewportProps) {
  return <Viewport className={toastViewport({ className: className as string })} {...props} />
}

function ToastAction({ className, ...props }: ToastActionProps) {
  return (
    <Action
      className={toastAction({ className: className as string })}
      {...props}
    />
  )
}

function ToastClose({ className, ...props }: ToastCloseProps) {
  return (
    <Close
      className={toastClose({
        className: className as string,
      })}
      toast-close=""
      {...props}
    >
      <X className="h-4 w-4" />
    </Close>
  )
}

function ToastTitle({ className, ...props }: ToastTitleProps) {
  return (
    <Title
      className={toastTitle({ className: className as string })}
      {...props}
    />
  )
}

function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return (
    <Description
      className={toastDescription({ className: className as string })}
      {...props}
    />
  )
}

type ToastActionElement = ReactElement<typeof ToastAction>

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastIcon,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
}
