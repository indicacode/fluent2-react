import { tv } from "tailwind-variants"

export const dropdownVariants = tv({
  variants: {
    size: {
      small: "px-2 py-1 text-sm",
      medium: "px-3 py-2 text-base",
      large: "px-5 py-3 text-xl",
    },
    disabled: {
      true: "cursor-not-allowed opacity-50",
      false: "hover:cursor-pointer",
    },
    appearance: {
      outline: "border border-border",
      underline: "",
      "filled-darker": "bg-muted",
      "filled-lighter": "bg-background",
      "filled-darker-shadow": "bg-muted shadow-2xl",
      "filled-lighter-shadow": "bg-background shadow-2xl",
    },
  },
  defaultVariants: { size: "medium", appearance: "outline" },
})
