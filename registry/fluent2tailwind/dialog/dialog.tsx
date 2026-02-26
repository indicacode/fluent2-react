"use client"

import {
  Close,
  Content,
  Description,
  type DialogOverlayProps,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog"
import {
  Children,
  cloneElement,
  ComponentProps,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react"
import { tv } from "tailwind-variants"

const dialogSlots = tv({
  slots: {
    overlay:
      "fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    content:
      "fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 text-sm text-foreground shadow-lg duration-200 sm:rounded-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
    header: "flex flex-col space-y-2 text-center sm:text-left",
    footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    title: "text-xl leading-none font-semibold tracking-tight",
    description: "text-sm text-muted-foreground",
  },
})

const { overlay, content, header, footer, title, description } = dialogSlots()

type DialogProps = ComponentProps<typeof Root> & {
  children: ReactNode
  nonmodal?: boolean
}

type DialogContentProps = ComponentProps<typeof Content> & {
  nonmodal?: boolean
  className?: string
}

export function DialogTrigger({ ...props }: ComponentProps<typeof Trigger>) {
  return <Trigger data-slot="dialog-trigger" {...props} />
}

export function DialogPortal({ ...props }: ComponentProps<typeof Portal>) {
  return <Portal data-slot="dialog-portal" {...props} />
}

export function DialogClose({ ...props }: ComponentProps<typeof Close>) {
  return <Close data-slot="dialog-close" {...props} />
}

export function Dialog({ children, nonmodal, ...props }: DialogProps) {
  return (
    <Root data-slot="dialog" {...props}>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<DialogContentProps>, {
            nonmodal,
          })
        }
        return child
      })}
    </Root>
  )
}

export function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <Overlay
      data-slot="dialog-overlay"
      className={overlay({ className })}
      {...props}
    />
  )
}

export function DialogContent({
  className,
  onInteractOutside,
  nonmodal,
  children,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <Content
        data-slot="dialog-content"
        onInteractOutside={(e) => {
          if (nonmodal) {
            e.preventDefault()
            e.stopPropagation()
          }
          onInteractOutside?.(e)
        }}
        className={content({ className })}
        {...props}
      >
        {children}
      </Content>
    </DialogPortal>
  )
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={header({ className })}
      {...props}
    />
  )
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={footer({ className })}
      {...props}
    />
  )
}

export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof Title>) {
  return (
    <Title
      data-slot="dialog-title"
      className={title({ className })}
      {...props}
    />
  )
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof Description>) {
  return (
    <Description
      data-slot="dialog-description"
      className={description({ className })}
      {...props}
    />
  )
}
