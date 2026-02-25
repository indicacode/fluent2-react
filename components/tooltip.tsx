"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { ComponentProps, ReactElement, ReactNode } from "react"
import { tv } from "tailwind-variants"

type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root> &
  React.HtmlHTMLAttributes<"div"> & {
    content: ReactNode
    appearance?: "normal" | "inverted"
    hideDelay?: number
    onVisibleChange?: (visible: boolean) => void
    positioning?: ComponentProps<typeof TooltipPrimitive.Positioner>["side"]
    relationship: "label" | "description" | "inaccessible"
    showDelay?: number
    visible?: boolean
    withArrow?: boolean
    shouldRenderTooltip?: boolean
    arrowClassName?: string
    arrowRef?: React.Ref<HTMLDivElement>
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
  const triggerRender =
    children && typeof children !== "string" && typeof children !== "number"
      ? (children as ReactElement)
      : undefined

  return (
    <TooltipPrimitive.Provider
      delay={showDelay}
      closeDelay={hideDelay}
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
          render={triggerRender}
          ref={triggerRef as React.RefObject<HTMLButtonElement>}
        >
          {!triggerRender ? children : null}
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          {shouldRenderTooltip && (
            <TooltipPrimitive.Positioner side={positioning} sideOffset={4}>
              <TooltipPrimitive.Popup
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
              </TooltipPrimitive.Popup>
            </TooltipPrimitive.Positioner>
          )}
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default Tooltip
