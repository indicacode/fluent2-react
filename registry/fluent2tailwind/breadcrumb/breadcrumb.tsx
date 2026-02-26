import { Slot } from "@radix-ui/react-slot"
import { MoreHorizontal } from "lucide-react"
import * as React from "react"
import { GoChevronRight } from "react-icons/go"

import { tv } from "tailwind-variants"

const breadcrumbSlots = tv({
  slots: {
    list:
      "text-muted-foreground flex flex-wrap items-center gap-1.5 break-words sm:gap-2.5",
    item: "inline-flex items-center gap-1.5",
    link: "hover:text-foreground transition-colors",
    page: "text-foreground font-semibold",
    separator: "",
    ellipsis: "flex size-9 items-center justify-center",
  },
  variants: {
    size: {
      small: { list: "text-sm", item: "text-sm", link: "text-sm", page: "text-sm" },
      medium: { list: "text-md", item: "text-md", link: "text-md", page: "text-md" },
      large: { list: "text-lg", item: "text-lg", link: "text-lg", page: "text-lg" },
    },
  },
  defaultVariants: {
    size: "medium",
  },
})

const { list, item, link, page, separator, ellipsis } = breadcrumbSlots()

function Breadcrumb({
  focusMode,
  ...props
}: React.ComponentProps<"nav"> & {
  focusMode?: "tab" | "arrow"
}) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      data-focus-mode={focusMode}
      {...props}
    />
  )
}

function BreadcrumbList({
  size,
  className,
  ...props
}: React.ComponentProps<"ol"> & { size?: "small" | "medium" | "large" }) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={list({ size, className })}
      {...props}
    />
  )
}

function BreadcrumbItem({
  size,
  className,
  ...props
}: React.ComponentProps<"li"> & { size?: "small" | "medium" | "large" }) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={item({ size, className })}
      {...props}
    />
  )
}

function BreadcrumbLink({
  size,
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "small" | "medium" | "large"
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={link({ size, className })}
      {...props}
    />
  )
}

function BreadcrumbPage({
  size,
  className,
  ...props
}: React.ComponentProps<"span"> & {
  size?: "small" | "medium" | "large"
}) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={page({ size, className })}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={separator({ className })}
      {...props}
    >
      {children ?? <GoChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={ellipsis({ className })}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
