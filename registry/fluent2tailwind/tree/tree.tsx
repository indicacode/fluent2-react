"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { VariantProps } from "tailwind-variants"

import { treeSlots, treeStyles } from "./tree.styles"

const { root, item, row, expand, content, aside, actions } = treeStyles

type TreeContextValue = {
  openItems: string[]
  toggleOpen: (value: string) => void
  size?: "small" | "medium"
  appearance?: "subtle" | "transparent"
  selectedItems: string[]
  toggleSelect: (value: string) => void
  selectionMode?: "none" | "single" | "multiselect"
}

const TreeContext = React.createContext<TreeContextValue | null>(null)

export type TreeProps = React.ComponentProps<"ul"> &
  VariantProps<typeof treeSlots> & {
    openItems?: string[]
    defaultOpenItems?: string[]
    onOpenChange?: (items: string[]) => void
    selectionMode?: "none" | "single" | "multiselect"
    selectedItems?: string[]
    defaultSelectedItems?: string[]
    onSelectionChange?: (items: string[]) => void
  }

function Tree({
  openItems,
  defaultOpenItems,
  onOpenChange,
  selectedItems,
  defaultSelectedItems,
  onSelectionChange,
  selectionMode = "none",
  size,
  appearance,
  className,
  children,
  ...props
}: TreeProps) {
  const isControlled = openItems !== undefined
  const [internalOpen, setInternalOpen] = React.useState(defaultOpenItems ?? [])
  const currentOpen = isControlled ? openItems! : internalOpen

  const isSelectionControlled = selectedItems !== undefined
  const [internalSelected, setInternalSelected] = React.useState(
    defaultSelectedItems ?? []
  )
  const currentSelected = isSelectionControlled ? selectedItems! : internalSelected

  function toggleOpen(value: string) {
    const next = currentOpen.includes(value)
      ? currentOpen.filter((item) => item !== value)
      : [...currentOpen, value]

    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  function toggleSelect(value: string) {
    if (selectionMode === "none") return

    let next: string[] = []
    if (selectionMode === "single") {
      next = [value]
    } else {
      next = currentSelected.includes(value)
        ? currentSelected.filter((item) => item !== value)
        : [...currentSelected, value]
    }

    if (!isSelectionControlled) setInternalSelected(next)
    onSelectionChange?.(next)
  }

  return (
    <TreeContext.Provider
      value={{
        openItems: currentOpen,
        toggleOpen,
        size,
        appearance,
        selectionMode,
        selectedItems: currentSelected,
        toggleSelect,
      }}
    >
      <ul data-slot="tree" className={root({ size, appearance, className })} {...props}>
        {children}
      </ul>
    </TreeContext.Provider>
  )
}

export type TreeItemProps = React.ComponentProps<"li"> & {
  value: string
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  itemType?: "branch" | "leaf"
  expandIcon?: React.ReactNode
}

function TreeItem({
  value,
  defaultOpen,
  open,
  onOpenChange,
  itemType,
  expandIcon,
  className,
  children,
  ...props
}: TreeItemProps) {
  const context = React.useContext(TreeContext)
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)
  const isOpen = isControlled
    ? open!
    : context?.openItems.includes(value) ?? internalOpen

  const isBranch = itemType === "branch" || React.Children.count(children) > 1

  function toggle() {
    const next = !isOpen
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
    if (!isControlled) context?.toggleOpen(value)
  }

  const allChildren = React.Children.toArray(children)
  const layoutChild = allChildren[0]
  const nestedChildren = allChildren.slice(1)

  return (
    <li data-slot="tree-item" className={item({ className })} {...props}>
      {React.isValidElement(layoutChild)
        ? React.cloneElement(layoutChild as React.ReactElement, {
            "data-tree-item": value,
            onClick: () => {
              if (isBranch) toggle()
              context?.toggleSelect(value)
            },
            expandIcon,
            isBranch,
            isOpen,
          })
        : layoutChild}
      {isBranch && isOpen && nestedChildren.length > 0 && (
        <ul className="ml-4 flex flex-col gap-1">
          {nestedChildren}
        </ul>
      )}
    </li>
  )
}

export type TreeItemLayoutProps = React.ComponentProps<"div"> & {
  iconBefore?: React.ReactNode
  iconAfter?: React.ReactNode
  aside?: React.ReactNode
  actions?: React.ReactNode
  expandIcon?: React.ReactNode
  isBranch?: boolean
  isOpen?: boolean
}

function TreeItemLayout({
  className,
  iconBefore,
  iconAfter,
  aside: asideContent,
  actions: actionsContent,
  expandIcon,
  isBranch,
  isOpen,
  children,
  ...props
}: TreeItemLayoutProps) {
  const context = React.useContext(TreeContext)

  return (
    <div
      data-slot="tree-item-layout"
      className={row({
        size: context?.size,
        appearance: context?.appearance,
        selected: context?.selectedItems.includes(props["data-tree-item"]),
        className,
      })}
      {...props}
    >
      {isBranch && (
        <span className={expand({ size: context?.size })}>
          {expandIcon ?? (
            <ChevronRight className={isOpen ? "rotate-90" : ""} />
          )}
        </span>
      )}
      {iconBefore}
      <span className={content()}>{children}</span>
      {iconAfter}
      {asideContent && <span className={aside()}>{asideContent}</span>}
      {actionsContent && <span className={actions()}>{actionsContent}</span>}
    </div>
  )
}

export type TreeItemPersonaLayoutProps = TreeItemLayoutProps & {
  media?: React.ReactNode
  secondaryText?: React.ReactNode
}

function TreeItemPersonaLayout({
  media,
  secondaryText,
  children,
  ...props
}: TreeItemPersonaLayoutProps) {
  return (
    <TreeItemLayout
      {...props}
      iconBefore={media}
      aside={secondaryText}
    >
      {children}
    </TreeItemLayout>
  )
}

export type FlatTreeItem = {
  value: string
  label: React.ReactNode
  children?: FlatTreeItem[]
}

export type FlatTreeProps = Omit<TreeProps, "children"> & {
  items: FlatTreeItem[]
  renderItem?: (item: FlatTreeItem) => React.ReactNode
}

function FlatTree({ items, renderItem, ...props }: FlatTreeProps) {
  function renderItems(list: FlatTreeItem[]) {
    return list.map((item) => (
      <TreeItem key={item.value} value={item.value} itemType={item.children?.length ? "branch" : "leaf"}>
        {renderItem ? (
          renderItem(item)
        ) : (
          <TreeItemLayout>{item.label}</TreeItemLayout>
        )}
        {item.children ? renderItems(item.children) : null}
      </TreeItem>
    ))
  }

  return <Tree {...props}>{renderItems(items)}</Tree>
}

export function useHeadlessFlatTree({
  items,
  defaultOpenItems,
  openItems,
  onOpenChange,
}: {
  items: FlatTreeItem[]
  defaultOpenItems?: string[]
  openItems?: string[]
  onOpenChange?: (items: string[]) => void
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpenItems ?? [])
  const currentOpen = openItems ?? internalOpen

  function toggleOpen(value: string) {
    const next = currentOpen.includes(value)
      ? currentOpen.filter((item) => item !== value)
      : [...currentOpen, value]

    if (!openItems) setInternalOpen(next)
    onOpenChange?.(next)
  }

  return {
    items,
    openItems: currentOpen,
    toggleOpen,
  }
}

export {
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeItemPersonaLayout,
  FlatTree,
}
