import { tv } from "tailwind-variants"

export const treeSlots = tv({
  slots: {
    root: "flex flex-col gap-1",
    item: "flex flex-col",
    row: "flex items-center gap-2 rounded-md px-2 py-1 text-sm",
    expand: "h-5 w-5 shrink-0 text-muted-foreground",
    content: "flex min-w-0 flex-1 items-center gap-2",
    aside: "ml-auto text-xs text-muted-foreground",
    actions: "ml-2 flex items-center gap-1",
  },
  variants: {
    size: {
      small: { row: "text-xs", expand: "h-4 w-4" },
      medium: { row: "text-sm", expand: "h-5 w-5" },
    },
    appearance: {
      subtle: { row: "hover:bg-muted" },
      transparent: { row: "hover:bg-transparent" },
    },
    selected: {
      true: { row: "bg-primary/10 text-primary" },
    },
  },
  defaultVariants: {
    size: "medium",
    appearance: "subtle",
  },
})

export const treeStyles = treeSlots()
