"use client"
import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { ComponentProps, ElementType, Fragment, ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

// Used in accordionTrigger

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
      "flex flex-1 items-center gap-2 text-sm font-medium text-foreground transition-all [&[data-state=open]>svg]:rotate-90",
    iconStyles:
      "h-4 w-4 shrink-0 text-foreground transition-transform duration-200",
    // ---group--- //

    contentStyles:
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden bg-transparent text-sm text-foreground",
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
  "type" | "value" | "defaultValue" | "onValueChange" | "collapsible"
> & {
  openItems?: string[]
  defaultOpenItems?: string[]
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
  multiple = false,
  collapsible = false,
  navigation,
  onToggle,
  ...props
}: AccordionProps) {
  const value = openItems
    ? multiple
      ? openItems
      : openItems[0]
    : undefined
  const defaultValue = defaultOpenItems
    ? multiple
      ? defaultOpenItems
      : defaultOpenItems[0]
    : undefined

  return (
    <Root
      type={multiple ? "multiple" : "single"}
      collapsible={!multiple && collapsible ? true : undefined}
      value={value as ComponentProps<typeof Root>["value"]}
      defaultValue={defaultValue as ComponentProps<typeof Root>["defaultValue"]}
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
      className={rootStyles({ className })}
    >
      {children}
    </Root>
  )
}

function AccordionItem({ className, ...props }: ComponentProps<typeof Item>) {
  // const [size] = getcontext()
  return <Item className={accordionItemStyles({ className })} {...props} />
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
  let Component: ElementType = Fragment

  const validTags = ["div", "h1", "h2", "h3", "h4", "h5", "h6"]
  const isValid = validTags.includes(as)
  if (isValid) {
    Component = as
  }
  console.assert(isValid, 'Invalid "as" prop. Must be ' + validTags.join(", "))

  return (
    <Header asChild={isValid} className={headerStyles({ inline })}>
      <Component>
        <Trigger
          className={triggerStyles({
            className,
            size,
            position,
          })}
          {...props}
        >
          {icon ? icon : <ChevronRightIcon className={iconStyles({ size })} />}
          {children}
        </Trigger>
      </Component>
    </Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <Content className={contentStyles({ className })} {...props}>
      <div className={contentStyles({ className })}>{children}</div>
    </Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
