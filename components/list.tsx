import * as React from "react"
import { tv } from "tailwind-variants"

const listSlots = tv({
  slots: {
    list: "flex flex-col gap-1",
    item: "flex items-center",
  },
  variants: {
    navigationMode: {
      items: {},
      composite: {},
    },
    selected: {
      true: { item: "bg-accent text-primary" },
      false: {},
    },
  },
  defaultVariants: {},
})

type SelectionMode = "single" | "multiselect"

type ListContextValue = {
  selectionMode?: SelectionMode
  selectedItems: string[]
  updateSelection: (nextSelection: string[]) => void
}

const ListContext = React.createContext<ListContextValue | null>(null)

type ListProps = Omit<React.ComponentProps<"ul">, "ref"> & {
  as?: "div" | "ol" | "ul"
  navigationMode?: "items" | "composite"
  selectionMode?: "single" | "multiselect"
  selectedItems?: string[]
  defaultSelectedItems?: string[]
  onSelectionChange?: (selectedItems: string[]) => void
}
type ListItemProps = React.ComponentProps<"li"> & {
  value?: string
}

function List({
  as,
  navigationMode,
  selectionMode,
  selectedItems,
  defaultSelectedItems,
  onSelectionChange,
  children,
  className,
  ...props
}: ListProps) {
  const isControlled = selectedItems !== undefined
  const [internalSelection, setInternalSelection] = React.useState<string[]>(
    defaultSelectedItems ?? []
  )
  const currentSelection = isControlled
    ? selectedItems ?? []
    : internalSelection

  function updateSelection(nextSelection: string[]) {
    if (!isControlled) {
      setInternalSelection(nextSelection)
    }
    onSelectionChange?.(nextSelection)
  }

  const Comp = as ?? "ul"
  const { list } = listSlots({ navigationMode })

  return (
    <ListContext.Provider
      value={{
        selectionMode,
        selectedItems: currentSelection,
        updateSelection,
      }}
    >
      <Comp
        role={selectionMode ? "listbox" : undefined}
        aria-multiselectable={
          selectionMode === "multiselect" ? true : undefined
        }
        className={list({ className: className as string })}
        {...props}
      >
        {children}
      </Comp>
    </ListContext.Provider>
  )
}
function ListItem({ children, className, value, ...props }: ListItemProps) {
  const context = React.useContext(ListContext)
  const resolvedValue = value ?? ""
  const isSelectable = !!context?.selectionMode && resolvedValue.length > 0
  const isSelected = isSelectable
    ? context?.selectedItems.includes(resolvedValue)
    : false
  const { item } = listSlots({ selected: isSelected })

  function toggleSelection() {
    if (!context || !isSelectable) return
    if (context.selectionMode === "single") {
      context.updateSelection([resolvedValue])
      return
    }
    if (isSelected) {
      context.updateSelection(
        context.selectedItems.filter((item) => item !== resolvedValue)
      )
    } else {
      context.updateSelection([...context.selectedItems, resolvedValue])
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLLIElement>) {
    if (!isSelectable) return
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      toggleSelection()
    }
  }

  return (
    <li
      role={isSelectable ? "option" : undefined}
      aria-selected={isSelectable ? isSelected : undefined}
      tabIndex={isSelectable ? 0 : undefined}
      className={item({ className: className as string })}
      onClick={toggleSelection}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </li>
  )
}

export { List, ListItem }
