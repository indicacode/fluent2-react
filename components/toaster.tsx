"use client"

import { useMediaQuery } from "@/utils/use-media-query"

import { useToast } from "@/components/use-toast"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastIcon,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastProps,
} from "./toast"

type ToastItem = ReturnType<typeof useToast>["toasts"][number]
type ToastVariant = NonNullable<ToastProps["variant"]>

export function Toaster() {
  const { toasts } = useToast()

  const isMobile = useMediaQuery(["(max-width: 640px)"], {
    ssr: true,
    fallback: [false],
  })[0]

  return (
    <ToastProvider>
      {toasts.map((toast: ToastItem) => {
        const {
          multiline = false,
          description,
          variant,
          action,
          title,
          id,
          ...props
        } = toast as ToastItem & { multiline?: boolean }

        const iconVariant: ToastVariant = variant ?? "info"
        const showActionInline = !multiline && !isMobile
        const showActionStacked = multiline || isMobile

        return (
          <Toast variant={variant} key={id} {...props}>
            <div className="flex w-full items-center gap-2">
              <ToastIcon variant={iconVariant} />
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
              {showActionInline && action}
              <ToastClose />
            </div>
            {/* Action moves to a second row when space is limited */}
            {showActionStacked && (
              <div className="flex w-full gap-2">
                <div className="flex w-full" />
                {action}
              </div>
            )}
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
