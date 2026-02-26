"use client"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronRight } from "lucide-react"
import { ComponentProps, ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

// Used in accordionTrigger
const Root = AccordionPrimitive.Root
const Item = AccordionPrimitive.Item
const Header = AccordionPrimitive.Header
const Trigger = AccordionPrimitive.Trigger
const Content = AccordionPrimitive.Panel

type AccordionTriggerProps = ComponentProps<typeof Trigger> &
  VariantProps<typeof accordionSlots> & {
    icon?: ReactNode
    as?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  }

const accordionSlots = tv({
  slots: {
    rootStyles: "flex flex-col gap-3",
    accordionItemStyles: "relative flex flex-col gap-1",

    // ---group--- //
    headerStyles: "flex items-center bg-transparent",
    triggerStyles:
      "flex flex-1 items-center gap-2 text-sm font-medium text-foreground transition-all [&[data-panel-open]>svg]:rotate-90",
    iconStyles:
      "h-4 w-4 shrink-0 text-foreground transition-transform duration-200",
    // ---group--- //

    contentStyles:
      "data-[closed]:animate-accordion-up data-[open]:animate-accordion-down overflow-hidden bg-transparent text-sm text-foreground",
  },
  variants: {
    position: {
      right: { triggerStyles: "flex-row-reverse justify-between" },
      left: { iconStyles: "" },
    },
    inline: {
      true: {
        headerStyles: "inline",
      },
    },
    size: {
      sm: {
        triggerStyles: "text-xs",
        iconStyles: "h-3 w-3",
      },
      md: {
        triggerStyles: "text-sm",
        iconStyles: "h-4 w-4",
      },
      lg: {
        triggerStyles: "text-lg",
        iconStyles: "h-6 w-6",
      },
      xl: {
        triggerStyles: "text-xl",
        iconStyles: "h-8 w-8",
      },
    },
  },
  defaultVariants: {
    position: "right",
    size: "md",
  },
})

const {
  rootStyles,
  accordionItemStyles,
  headerStyles,
  triggerStyles,
  iconStyles,
  contentStyles,
} = accordionSlots({
  // size,
})
type AccordionProps = Omit<
  ComponentProps<typeof Root>,
  "value" | "defaultValue" | "onValueChange" | "multiple"
> & {
  openItems?: string[]
  defaultOpenItems?: string[]
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  multiple?: boolean
  collapsible?: boolean
  navigation?: "linear" | "circular"
  onToggle?: (openItems: string[]) => void
}

function Accordion({
  className,
  children,
  openItems,
  defaultOpenItems,
  type = "single",
  defaultValue: legacyDefaultValue,
  multiple = false,
  collapsible = false,
  navigation,
  onToggle,
  ...props
}: AccordionProps) {
  const isMultiple = type === "multiple" || multiple
  const value = openItems
    ? isMultiple
      ? openItems
      : openItems[0]
    : undefined
  const defaultValue = defaultOpenItems ?? legacyDefaultValue
  const resolvedDefaultValue = defaultValue
    ? isMultiple
      ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue])
      : (Array.isArray(defaultValue) ? defaultValue[0] : defaultValue)
    : undefined

  return (
    <Root
      multiple={isMultiple}
      value={value as ComponentProps<typeof Root>["value"]}
      defaultValue={resolvedDefaultValue as ComponentProps<typeof Root>["defaultValue"]}
      onValueChange={(nextValue) => {
        const nextItems = Array.isArray(nextValue)
          ? nextValue
          : nextValue
            ? [nextValue]
            : []
        onToggle?.(nextItems)
      }}
      data-navigation={navigation}
      {...props}
      className={rootStyles({ className: className as string })}
    >
      {children}
    </Root>
  )
}

function AccordionItem({ className, ...props }: ComponentProps<typeof Item>) {
  // const [size] = getcontext()
  return <Item className={accordionItemStyles({ className: className as string })} {...props} />
}

function AccordionTrigger({
  className,
  as = "div",
  inline = false,
  icon,
  position,
  size,
  children,
  ...props
}: AccordionTriggerProps) {
  const validTags = ["div", "h1", "h2", "h3", "h4", "h5", "h6"]
  const isValid = validTags.includes(as)
  const HeaderTag = isValid ? as : "h3"
  console.assert(isValid, 'Invalid "as" prop. Must be ' + validTags.join(", "))

  return (
    <Header
      className={headerStyles({ inline })}
      render={<HeaderTag />}
    >
      <Trigger
        className={triggerStyles({
          className: className as string,
          size,
          position,
        })}
        {...props}
      >
        {icon ? icon : <ChevronRight className={iconStyles({ size })} />}
        {children}
      </Trigger>
    </Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <Content className={contentStyles({ className: className as string })} {...props}>
      <div className={contentStyles({ className: className as string })}>{children}</div>
    </Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
