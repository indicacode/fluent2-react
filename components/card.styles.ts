import { tv } from "tailwind-variants"

export const cardSlots = tv({
  slots: {
    card: "relative flex h-fit w-full flex-col overflow-hidden rounded-md border shadow-md",
    cardSpacing: "flex flex-col",
    cardHeader: "flex w-fit items-center gap-3",
    cardHeaderImage: "aspect-square h-full w-full object-cover",
    cardTitle: "font-semibold text-foreground",
    cardDescription: "text-sm text-muted-foreground",
    cardContent: "",
    cardFooter: "flex gap-4",
  },
  variants: {
    size: {
      sm: { cardSpacing: "p-2" },
      md: { cardSpacing: "p-3" },
      lg: { cardSpacing: "p-4" },
      none: { cardSpacing: "p-0" },
    },
    variant: {
      filled: {
        card: "bg-background text-foreground hover:bg-muted",
      },
      "filled-alt": {
        card: "bg-muted hover:bg-secondary",
      },
      outline: {
        card: "border border-border shadow-none text-foreground hover:bg-muted",
      },
      subtle: {
        card: "border-none text-foreground shadow-none hover:cursor-pointer hover:bg-muted",
      },
      _unstiled: { card: "", cardContent: "" },
    },
    pressed: {
      true: {
        card: "border border-border",
      },
    },
    checked: {
      true: {
        card: "border border-border",
      },
    },
    selectable: {
      true: {
        card: "hover:cursor-pointer",
      },
    },

    orientation: {
      horizontal: {
        card: "flex bg-transparent p-0",
        cardSpacing: "flex flex-col",
        cardHeader: "",
        cardTitle: "",
        cardDescription: "",
        cardContent: "hidden",
        cardFooter: "hidden",
      },
      vertical: {
        card: "flex flex-col",
        cardSpacing: "flex-col gap-4",
        cardHeaderImage: "rounded-sm",
      },
    },
  },
  defaultVariants: {
    variant: "filled",
    orientation: "vertical",
    size: "sm",
  },
})

export const cardStyles = cardSlots()
