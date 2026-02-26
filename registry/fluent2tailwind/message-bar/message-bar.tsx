"use client"

import * as React from "react"
import {
  CheckmarkCircle24Regular,
  ErrorCircle24Regular,
  Info24Regular,
  Warning24Regular,
} from "@fluentui/react-icons"
import { X } from "lucide-react"
import { tv, VariantProps } from "tailwind-variants"

const messageBar = tv({
  slots: {
    root:
      "flex w-full items-start gap-3 border px-3 py-2 text-sm text-foreground",
    icon: "mt-0.5 text-muted-foreground",
    body: "flex min-w-0 flex-1 flex-col gap-1",
    title: "font-semibold",
    actions: "ml-auto flex items-center gap-2",
    dismiss: "text-muted-foreground hover:text-muted-foreground",
  },
  variants: {
    intent: {
      info: { root: "border-border bg-muted", icon: "text-primary" },
      warning: {
        root: "border-warning bg-warning",
        icon: "text-warning-foreground",
      },
      error: {
        root: "border-destructive bg-destructive/10",
        icon: "text-destructive",
      },
      success: {
        root: "border-success bg-success",
        icon: "text-success-foreground",
      },
      neutral: { root: "border-border bg-background", icon: "text-muted-foreground" },
    },
    shape: {
      rounded: { root: "rounded-sm" },
      square: { root: "rounded-none" },
    },
    layout: {
      auto: { root: "flex-wrap" },
      singleline: { root: "items-center" },
      multiline: { root: "items-start" },
    },
  },
  defaultVariants: {
    intent: "info",
    shape: "rounded",
    layout: "auto",
  },
})

const { root, icon, body, title, actions, dismiss } = messageBar()

const defaultIcons: Record<string, React.ReactNode> = {
  info: <Info24Regular />,
  warning: <Warning24Regular />,
  error: <ErrorCircle24Regular />,
  success: <CheckmarkCircle24Regular />,
  neutral: <Info24Regular />,
}

export type MessageBarProps = React.ComponentProps<"div"> &
  VariantProps<typeof messageBar> & {
    icon?: React.ReactNode
    title?: React.ReactNode
    actions?: React.ReactNode
    dismissible?: boolean
    onDismiss?: () => void
    politeness?: "polite" | "assertive" | "off"
  }

function MessageBar({
  className,
  intent,
  shape,
  layout,
  icon: iconProp,
  title: titleProp,
  actions: actionsProp,
  dismissible = false,
  onDismiss,
  politeness,
  children,
  ...props
}: MessageBarProps) {
  const ariaLive = politeness ?? (intent === "error" ? "assertive" : "polite")

  return (
    <div
      data-slot="message-bar"
      role="status"
      aria-live={ariaLive}
      className={root({ intent, shape, layout, className })}
      {...props}
    >
      <span data-slot="message-bar-icon" className={icon({ intent })}>
        {iconProp ?? defaultIcons[intent ?? "info"]}
      </span>
      <div data-slot="message-bar-body" className={body()}>
        {titleProp && (
          <div data-slot="message-bar-title" className={title()}>
            {titleProp}
          </div>
        )}
        {children}
      </div>
      {(actionsProp || dismissible) && (
        <div data-slot="message-bar-actions" className={actions()}>
          {actionsProp}
          {dismissible && (
            <button
              type="button"
              onClick={onDismiss}
              className={dismiss()}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function MessageBarActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-bar-actions"
      className={actions({ className })}
      {...props}
    />
  )
}

function MessageBarTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-bar-title"
      className={title({ className })}
      {...props}
    />
  )
}

export { MessageBar, MessageBarActions, MessageBarTitle }
