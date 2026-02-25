"use client"

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import * as React from "react"
import { ReactElement } from "react"

import { buttonVariants } from "@/components/button"
import { tv } from "tailwind-variants"

const alertDialogSlots = tv({
  slots: {
    overlay:
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-foreground/50",
    content:
      "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
    header: "flex flex-col gap-2 text-center sm:text-left",
    footer: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
    title: "text-lg font-semibold",
    description: "text-muted-foreground text-sm",
  },
})

const { overlay, content, header, footer, title, description } =
  alertDialogSlots()

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  asChild = false,
  nativeButton,
  children,
  ...props
}: Omit<React.ComponentProps<typeof AlertDialogPrimitive.Trigger>, "render"> & {
  asChild?: boolean
  children?: React.ReactNode
}) {
  const resolvedRender =
    asChild && React.isValidElement(children)
      ? (children as ReactElement)
      : undefined
  const isNonButtonIntrinsicElement =
    React.isValidElement(resolvedRender) &&
    typeof resolvedRender.type === "string" &&
    resolvedRender.type !== "button"
  const resolvedNativeButton =
    nativeButton ?? (resolvedRender ? !isNonButtonIntrinsicElement : true)

  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      nativeButton={resolvedNativeButton}
      render={resolvedRender}
      {...props}
    >
      {!resolvedRender ? children : null}
    </AlertDialogPrimitive.Trigger>
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
}: React.ComponentProps<typeof AlertDialogPrimitive.Backdrop>) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={overlay({ className: className as string })}
    />
  )
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Popup>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        className={content({ className: className as string })}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={header({ className: className as string })}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={footer({ className: className as string })}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={title({ className: className as string })}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={description({ className: className as string })}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Close>) {
  return (
    <AlertDialogPrimitive.Close
      className={buttonVariants({ className: className as string })}
      {...props}
    />
  )
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Close>) {
  return (
    <AlertDialogPrimitive.Close
      className={buttonVariants({ variant: "outline", className })}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
