import * as TabsPrimitive from "@radix-ui/react-tabs"

import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const tabsSlots = tv({
  slots: {
    root: "flex flex-col gap-2",
    list:
      "inline-flex h-9 items-center justify-center rounded-lg bg-transparent p-1 text-muted-foreground",
    trigger:
      "inline-flex items-center justify-center px-3 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-foreground",
    content:
      "mt-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden text-foreground",
  },
})

const { root, list, trigger, content } = tabsSlots()

function Tabs({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={root({ className })}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={list({ className })}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  value,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      className={trigger({ className })}
      {...props}
    />
  )
}

function TabsContent({
  className,
  value,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      value={value}
      className={content({ className })}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
