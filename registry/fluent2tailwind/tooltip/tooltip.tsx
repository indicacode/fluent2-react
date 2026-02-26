"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { ComponentProps, ReactNode } from "react"
import { tv } from "tailwind-variants"

type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root> &
  React.HtmlHTMLAttributes<"div"> & {
    content: ReactNode
    appearance?: "normal" | "inverted"
    hideDelay?: number
    onVisibleChange?: (visible: boolean) => void
    positioning?: ComponentProps<typeof TooltipPrimitive.Content>["side"]
    relationship: "label" | "description" | "inaccessible"
    showDelay?: number
    visible?: boolean
    withArrow?: boolean
    shouldRenderTooltip?: boolean
    arrowClassName?: string
    arrowRef?: React.Ref<SVGSVGElement>
    data?: unknown
    event?: "hover" | "click" | "focus"
    triggerRef?: React.Ref<Element>
  }

const tooltipSlots = tv({
  slots: {
    tooltipContent:
      "z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs shadow-md",
    tooltipArrow: "shadow-md",
  },
  variants: {
    appearance: {
      normal: {
        tooltipContent: "bg-popover text-popover-foreground",
        tooltipArrow: "fill-popover",
      },
      inverted: {
        tooltipContent: "bg-foreground text-background",
        tooltipArrow: "fill-foreground",
      },
    },
  },
  defaultVariants: { appearance: "normal" },
})

const { tooltipContent, tooltipArrow } = tooltipSlots({})

function Tooltip({
  content,
  appearance = "normal",
  positioning = "top",
  relationship = "label",
  showDelay = 250,
  hideDelay = 250,
  withArrow = false,
  shouldRenderTooltip = true,
  arrowClassName,
  arrowRef,
  data,
  event,
  triggerRef,
  onVisibleChange,
  className,
  children,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={showDelay}
      skipDelayDuration={hideDelay}
    >
      <TooltipPrimitive.Root
        onOpenChange={onVisibleChange}
        data-event={event}
        data-tooltip={data ? "true" : undefined}
        {...props}
      >
        <TooltipPrimitive.Trigger
          aria-label={
            relationship === "label" ? content?.toString() : undefined
          }
          aria-description={
            relationship === "description" ? content?.toString() : undefined
          }
          asChild
          ref={triggerRef as React.RefObject<HTMLButtonElement>}
        >
          {children}
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          {shouldRenderTooltip && (
            <TooltipPrimitive.Content
              side={positioning}
              sideOffset={4}
              className={tooltipContent({ appearance, className })}
            >
              {content}
              {withArrow && (
                <TooltipPrimitive.Arrow
                  ref={arrowRef}
                  className={tooltipArrow({
                    appearance,
                    className: arrowClassName,
                  })}
                />
              )}
            </TooltipPrimitive.Content>
          )}
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default Tooltip
