import { tv } from "tailwind-variants"

export const carouselSlots = tv({
  slots: {
    root: "relative",
    content: "overflow-hidden",
    contentInner: "flex",
    item: "min-w-0 shrink-0 grow-0 basis-full",
    previous: "absolute size-8 rounded-full",
    next: "absolute size-8 rounded-full",
  },
  variants: {
    orientation: {
      horizontal: {
        contentInner: "-ml-4",
        item: "pl-4",
        previous: "top-1/2 -left-12 -translate-y-1/2",
        next: "top-1/2 -right-12 -translate-y-1/2",
      },
      vertical: {
        contentInner: "-mt-4 flex-col",
        item: "pt-4",
        previous: "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        next: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
      },
    },
    whitespace: {
      none: {
        contentInner: "gap-0",
        item: "p-0",
      },
      sm: {
        contentInner: "-ml-2",
        item: "pl-2",
      },
      md: {
        contentInner: "-ml-4",
        item: "pl-4",
      },
      lg: {
        contentInner: "-ml-6",
        item: "pl-6",
      },
    },
  },
})

export const carouselStyles = carouselSlots()
