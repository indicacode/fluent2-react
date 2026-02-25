import {
  Popover as PopoverPrimitive,
} from "@base-ui/react/popover"
import * as React from "react"
import { ComponentProps, ReactElement, useEffect, useRef, useState } from "react"
import { tv } from "tailwind-variants"

const Root = PopoverPrimitive.Root
const Trigger = PopoverPrimitive.Trigger
const Positioner = PopoverPrimitive.Positioner
const Portal = PopoverPrimitive.Portal
const Content = PopoverPrimitive.Popup
const Arrow = PopoverPrimitive.Arrow

const popoverSlots = tv({
  slots: {
    content:
      "rounded-sm bg-popover p-2 text-xs text-popover-foreground shadow-xl will-change-[transform,opacity] focus:outline-hidden" +
      " radix-state-closed:animate-out radix-state-closed:fade-out-0 radix-state-open:animate-in focus:ring-0" +
      " data-[side=bottom]:slide-in-from-top-2 radix-state-closed:zoom-out-95 radix-state-open:fade-in-0 radix-state-open:zoom-in-95" +
      " data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  },
  variants: {
    appearance: {
      normal: { content: "" },
      inverted: { content: "bg-foreground text-background" },
    },
    size: {
      small: { content: "text-xs p-2" },
      medium: { content: "text-sm p-3" },
      large: { content: "text-base p-4" },
    },
  },
  defaultVariants: {
    appearance: "normal",
    size: "medium",
  },
})

const { content } = popoverSlots()

type PopoverContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  openOnHover?: boolean
  openOnContext?: boolean
  inline?: boolean
  withArrow?: boolean
  size?: "small" | "medium" | "large"
  appearance?: "normal" | "inverted"
  positioning?: ComponentProps<typeof Positioner>["side"]
  mouseLeaveDelay?: number
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

export function Popover({
  open,
  defaultOpen,
  onOpenChange,
  openOnHover = false,
  openOnContext = false,
  closeOnScroll = false,
  closeOnIframeFocus = false,
  inline = false,
  trapFocus = false,
  withArrow = false,
  appearance = "normal",
  size = "medium",
  positioning = "bottom",
  mouseLeaveDelay = 0,
  ...props
}: React.ComponentProps<typeof Root> & {
  openOnHover?: boolean
  openOnContext?: boolean
  closeOnScroll?: boolean
  closeOnIframeFocus?: boolean
  inline?: boolean
  trapFocus?: boolean
  withArrow?: boolean
  appearance?: "normal" | "inverted"
  size?: "small" | "medium" | "large"
  positioning?: ComponentProps<typeof Positioner>["side"]
  mouseLeaveDelay?: number
}) {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen ?? false)
  const isOpen = isControlled ? open : internalOpen

  function setOpen(nextOpen: boolean) {
    if (!isControlled) {
      setInternalOpen(nextOpen)
    }
    ;(onOpenChange as ((open: boolean) => void) | undefined)?.(nextOpen)
  }

  useEffect(() => {
    if (!closeOnScroll || !isOpen) return
    function handleScroll() {
      setOpen(false)
    }
    window.addEventListener("scroll", handleScroll, true)
    return () => window.removeEventListener("scroll", handleScroll, true)
  }, [closeOnScroll, isOpen])

  useEffect(() => {
    if (!closeOnIframeFocus || !isOpen) return
    function handleBlur() {
      setOpen(false)
    }
    window.addEventListener("blur", handleBlur)
    return () => window.removeEventListener("blur", handleBlur)
  }, [closeOnIframeFocus, isOpen])

  return (
    <PopoverContext.Provider
      value={{
        open: isOpen,
        setOpen,
        openOnHover,
        openOnContext,
        inline,
        withArrow,
        size,
        appearance,
        positioning,
        mouseLeaveDelay,
      }}
    >
      <Root data-slot="popover" open={isOpen} onOpenChange={setOpen} modal={trapFocus} {...props} />
    </PopoverContext.Provider>
  )
}

export function PopoverTrigger({
  asChild = false,
  nativeButton,
  onPointerEnter,
  onPointerLeave,
  onContextMenu,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Trigger>, "render"> & {
  asChild?: boolean
  children?: React.ReactNode
}) {
  const context = React.useContext(PopoverContext)
  const leaveTimeout = useRef<number | null>(null)
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

  function clearLeaveTimeout() {
    if (leaveTimeout.current) {
      window.clearTimeout(leaveTimeout.current)
      leaveTimeout.current = null
    }
  }

  return (
    <Trigger
      data-slot="popover-trigger"
      onPointerEnter={(event) => {
        clearLeaveTimeout()
        if (context?.openOnHover) {
          context.setOpen(true)
        }
        onPointerEnter?.(event)
      }}
      onPointerLeave={(event) => {
        if (context?.openOnHover) {
          const delay = context.mouseLeaveDelay ?? 0
          leaveTimeout.current = window.setTimeout(() => {
            context.setOpen(false)
          }, delay)
        }
        onPointerLeave?.(event)
      }}
      onContextMenu={(event) => {
        if (context?.openOnContext) {
          event.preventDefault()
          context.setOpen(true)
        }
        onContextMenu?.(event)
      }}
      nativeButton={resolvedNativeButton}
      render={resolvedRender}
      {...props}
    >
      {!resolvedRender ? children : null}
    </Trigger>
  )
}

function PopoverAnchor({ ...props }: React.ComponentProps<typeof Positioner>) {
  return <Positioner data-slot="popover-anchor" {...props} />
}

export function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  asChild = false,
  container,
  withArrow,
  appearance,
  size,
  side,
  children,
  ...props
}: Omit<ComponentProps<typeof Content>, "render"> & {
  align?: ComponentProps<typeof Positioner>["align"]
  side?: ComponentProps<typeof Positioner>["side"]
  sideOffset?: number
  asChild?: boolean
  container?: HTMLElement
  withArrow?: boolean
  appearance?: "normal" | "inverted"
  size?: "small" | "medium" | "large"
}) {
  const context = React.useContext(PopoverContext)
  const resolvedInline = context?.inline
  const resolvedWithArrow = withArrow ?? context?.withArrow
  const resolvedAppearance = appearance ?? context?.appearance
  const resolvedSize = size ?? context?.size
  const resolvedSide = side ?? context?.positioning
  const resolvedRender =
    asChild && React.isValidElement(children)
      ? (children as ReactElement)
      : undefined

  const contentNode = (
    <Positioner align={align} side={resolvedSide} sideOffset={sideOffset}>
      <Content
        data-slot="popover-content"
        className={content({
          appearance: resolvedAppearance,
          size: resolvedSize,
          className: className as string,
        })}
        render={resolvedRender}
        {...props}
      >
        {!resolvedRender ? (
          <div className="relative">
            {children}
            {resolvedWithArrow && <Arrow className="fill-current" />}
          </div>
        ) : null}
      </Content>
    </Positioner>
  )

  if (resolvedInline) {
    return contentNode
  }

  return <Portal container={container}>{contentNode}</Portal>
}
