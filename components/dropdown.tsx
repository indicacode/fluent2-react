"use client"

import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/command"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import * as React from "react"
import { FaCheck } from "react-icons/fa"
import { PiCaretDown, PiCheck, PiX } from "react-icons/pi"
import { dropdownVariants } from "./dropdown.styles"

type DropdownVariantProps = Parameters<typeof dropdownVariants>[0]

type DropdownProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
  DropdownVariantProps & {
    onOptionSelect?: (option: string[]) => void
    onOpenChange?: (open: boolean) => void
    multiselect?: boolean
    defaultSelectedOptions?: string[]
    selectedOptions?: string[]
    appearance?: "outline" | "underline" | "filled-darker" | "filled-lighter"
    clearable?: boolean
    showClearButton?: boolean
    defaultOpen?: boolean
    disableAutoFocus?: boolean
    inlinePopup?: boolean
    size?: "small" | "medium" | "large"
    placeholder?: string
    placeholderVisible?: boolean
    activeDescendantController?: string
    open?: boolean
  }

function Dropdown({
  defaultValue = "",
  className,
  children,
  placeholder = "Select an option",
  appearance = "outline",
  disabled = false,
  size = "medium",
  multiselect = false,
  clearable = false,
  showClearButton,
  defaultSelectedOptions = [],
  selectedOptions,
  defaultOpen = false,
  open: controlledOpen,
  onOptionSelect,
  onOpenChange,
  inlinePopup = false,
  placeholderVisible = true,
  activeDescendantController,
  ...props
}: DropdownProps) {
  // Support controlled/uncontrolled open and selection states.
  const isOpenControlled = controlledOpen !== undefined
  const isSelectionControlled = selectedOptions !== undefined

  const [open, setOpen] = React.useState<boolean>(
    isOpenControlled ? controlledOpen : defaultOpen
  )
  const [value, setValue] = React.useState<string[]>(() => {
    if (isSelectionControlled) return selectedOptions ?? []
    if (defaultSelectedOptions.length > 0) return defaultSelectedOptions
    return defaultValue ? [String(defaultValue)] : []
  })

  const isMultiselect = multiselect

  React.useEffect(() => {
    if (isOpenControlled) {
      setOpen(controlledOpen)
    }
  }, [controlledOpen, isOpenControlled])

  React.useEffect(() => {
    if (isSelectionControlled) {
      setValue(selectedOptions ?? [])
    }
  }, [isSelectionControlled, selectedOptions])

  function handleOpenChange(nextOpen: boolean) {
    if (!isOpenControlled) {
      setOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  function handleValueChange(nextValue: string[]) {
    if (!isSelectionControlled) {
      setValue(nextValue)
    }
    onOptionSelect?.(nextValue)
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<OptionProps>(child)) {
      return React.cloneElement(child, {
        setValue: handleValueChange,
        setOpen: handleOpenChange,
        isMultiSelect: isMultiselect,
        selectedValue: value,
      })
    }
    return child
  })

  const resolvedShowClearButton = showClearButton ?? clearable
  const displayText =
    value.length > 0
      ? value.join(", ")
      : placeholderVisible
        ? placeholder
        : ""
  const triggerClassName = [
    dropdownVariants({ appearance, disabled, size }),
    "relative z-10 flex w-full items-center justify-between gap-2 rounded-md text-muted-foreground",
    !placeholder ? "h-10" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <PopoverPrimitive.Trigger
        disabled={disabled}
        render={
          <button
            role="combobox"
            aria-expanded={open}
            aria-activedescendant={activeDescendantController}
            className={triggerClassName}
          >
            <span className="max-w-full truncate text-start">{displayText}</span>
            <div
              className={`absolute bottom-0 left-0 z-30 h-[1px] w-full bg-border`}
            />
            <div
              className={`bg-primary absolute bottom-0 z-30 h-[2px] transition-all ${
                open ? "left-0 w-full" : "left-1/2 w-0"
              }`}
            />
            {resolvedShowClearButton && !multiselect && value.length > 0 && (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  handleOpenChange(false)
                  handleValueChange([])
                }}
                className="absolute right-3 z-[999] text-foreground"
              >
                <PiX />
              </div>
            )}
            {(!clearable || value.length === 0 || multiselect) && (
              <PiCaretDown
                className={`z-[999] ml-2 shrink-0 ${disabled ? "text-muted-foreground" : "text-foreground"}`}
              />
            )}
          </button>
        }
      />

      {inlinePopup ? (
        <PopoverPrimitive.Positioner align="start" sideOffset={4}>
          <PopoverPrimitive.Popup className="z-50 p-0">
            <Command className="rounded-md bg-background px-1 py-1 shadow-xl">
              <CommandGroup>{childrenWithProps}</CommandGroup>
            </Command>
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      ) : (
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Positioner align="start" sideOffset={4}>
            <PopoverPrimitive.Popup className="z-50 p-0">
              <Command className="rounded-md bg-background px-1 py-1 shadow-xl">
                <CommandGroup>{childrenWithProps}</CommandGroup>
              </Command>
            </PopoverPrimitive.Popup>
          </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
      )}
    </PopoverPrimitive.Root>
  )
}

type OptionProps = {
  disabled?: boolean
  value?: string
  text?: string
  setValue?: (value: string[]) => void
  setOpen?: (open: boolean) => void
  selectedValue?: string[]
  isMultiSelect?: boolean
  children?: React.ReactNode
}

function Option({
  disabled = false,
  value,
  text,
  children,
  setValue,
  setOpen,
  selectedValue = [],
  isMultiSelect,
}: OptionProps) {
  const string = value || text || children?.toString() || ""

  const isSelected = selectedValue.includes(string)

  return (
    <CommandItem
      key={string}
      value={string}
      onSelect={() => {
        if (disabled) return
        if (isMultiSelect) {
          if (isSelected) {
            setValue?.(selectedValue.filter((v) => v !== string))
          } else {
            setValue?.([...selectedValue, string])
          }
        } else {
          setValue?.([string])
          setOpen?.(false)
        }
      }}
      className={`relative flex items-center justify-start gap-2 px-8 py-2 hover:cursor-pointer ${
        disabled ? "text-muted-foreground" : "text-foreground hover:bg-muted"
      }`}
    >
      {isMultiSelect ? (
        <div
          className={`absolute left-2 flex max-h-4 min-h-4 max-w-4 min-w-4 items-center justify-center rounded-xs border border-border p-1 text-sm text-primary-foreground shadow-sm dark:border-border ${
            isSelected ? "bg-primary" : ""
          }`}
        >
          {isSelected && <FaCheck className="max-h-2 max-w-2" />}
        </div>
      ) : (
        isSelected &&
        !isMultiSelect && (
          <PiCheck className="absolute left-2 h-4 w-4 text-wrap text-foreground" />
        )
      )}
      <span className="text-wrap">{children || text || string}</span>
    </CommandItem>
  )
}

type OptionGroupProps = {
  label?: string
  children?: React.ReactNode
  setValue?: (value: string[]) => void
  setOpen?: (open: boolean) => void
  selectedValue?: string[]
}

function OptionGroup({
  label,
  setValue,
  setOpen,
  selectedValue: value,
  children,
}: OptionGroupProps) {
  const heading = label?.toString() || "Options"
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<OptionProps>(child)) {
      return React.cloneElement(child, {
        setValue,
        setOpen,
        selectedValue: value,
      })
    }
    return child
  })
  return <CommandGroup heading={heading}>{childrenWithProps}</CommandGroup>
}

export { Dropdown, Option, OptionGroup }
