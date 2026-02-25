"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { tv } from "tailwind-variants"

const Root = SeparatorPrimitive
type SeparatorProps = React.ComponentProps<typeof Root>

type AlignOrientationReturn =
  | "horizontal_center"
  | "horizontal_start"
  | "horizontal_end"
  | "vertical_center"
  | "vertical_start"
  | "vertical_end"

type DividerProps = SeparatorProps &
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "primary" | "subtle" | "brand" | "strong"
    orientation?: "horizontal" | "vertical"
    align?: "center" | "start" | "end"
    alignContent?: "center" | "start" | "end"
    appearance?: "primary" | "subtle" | "brand" | "strong"
    inset?: "sm" | "md" | "lg" | number
    vertical?: boolean
    dashed?: boolean
  }

const dividerSlots = tv({
  slots: {
    root: "flex gap-1 overflow-hidden",
    before: "shrink-0 border",
    after: "shrink-0 border",
  },
  variants: {
    dashed: {
      true: { before: "border-dashed", after: "border-dashed" },
    },
    variant: {
      primary: {
        before: "border-border",
        after: "border-border",
      },
      subtle: {
        before: "border-border/60",
        after: "border-border/60",
      },
      brand: { before: "border-primary", after: "border-primary" },
      strong: { before: "border-border", after: "border-border" },
    },
    align: {
      vertical_start: {
        root: "items-start",
        before: "min-h-[10%]",
        after: "min-h-full",
      },
      vertical_center: {
        root: "items-center",
        before: "min-h-full",
        after: "min-h-full",
      },
      vertical_end: {
        root: "items-end",
        before: "min-h-full",
        after: "min-h-[10%]",
      },
      horizontal_start: {
        root: "justify-start",
        before: "min-w-[10%]",
        after: "w-full",
      },
      horizontal_center: {
        root: "justify-center",
        before: "w-full",
        after: "w-full",
      },
      horizontal_end: {
        root: "justify-end",
        before: "w-full",
        after: "min-w-[10%]",
      },
      false: "",
    },
    orientation: {
      horizontal: {
        root: "h-fit w-full min-w-fit flex-row items-center",
        before: "max-h-[1px] min-h-[1px]",
        after: "max-h-[1px] min-h-[1px]",
      },
      vertical: {
        root: "h-full max-w-fit min-w-[1px] flex-col justify-center",
        before: "max-w-[1px] min-w-[1px]",
        after: "max-w-[1px] min-w-[1px]",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    align: "horizontal_center", // Changed default align to be generic
    orientation: "horizontal",
  },
})

function alignOrientation(
  align: "center" | "start" | "end",
  orientation: "horizontal" | "vertical"
): AlignOrientationReturn {
  return `${orientation}_${align}`
}

const { root, before, after } = dividerSlots()

export function Divider({
  orientation = "horizontal",
  variant = "primary",
  align = "center",
  alignContent,
  appearance,
  inset,
  vertical,
  dashed = false,
  className,
  children,
  ...props
}: DividerProps) {
  const resolvedOrientation = vertical ? "vertical" : orientation
  const resolvedAlign = alignContent ?? align
  const alignment = alignOrientation(resolvedAlign, resolvedOrientation)
  const resolvedVariant = appearance ?? variant
  const insetClass =
    typeof inset === "string"
      ? inset === "sm"
        ? "px-2"
        : inset === "lg"
          ? "px-6"
          : "px-4"
      : ""
  const insetStyle =
    typeof inset === "number"
      ? resolvedOrientation === "vertical"
        ? { paddingBlock: inset }
        : { paddingInline: inset }
      : undefined

  return (
    <Root
      className={root({
        align: alignment,
        orientation: resolvedOrientation,
        variant: resolvedVariant,
        className: `${className ?? ""} ${insetClass}`.trim(),
      })}
      style={insetStyle}
      {...props}
    >
      <span
        className={before({
          align: alignment,
          orientation: resolvedOrientation,
          dashed,
          variant: resolvedVariant,
        })}
      />
      <div className="flex shrink-0">{children}</div>
      <span
        className={after({
          align: alignment,
          orientation: resolvedOrientation,
          dashed,
          variant: resolvedVariant,
        })}
      />
    </Root>
  )
}
