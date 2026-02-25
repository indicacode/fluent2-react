"use client"

import { Badge } from "@/components/badge"
import { Checkbox } from "@/components/checkbox"
import { CommandEmpty } from "@/components/customCommandEmpty"
import { CommandGroup, CommandItem } from "@/components/command"
import { X } from "lucide-react"
import * as React from "react"
import { Option } from "./combobox.types"

export function SelectedBadges({
  selected,
  badgeClassName,
  disabled,
  badgeClass,
  badgeIconClass,
  onUnselect,
}: {
  selected: Option[]
  badgeClassName?: string
  disabled?: boolean
  badgeClass: string
  badgeIconClass: string
  onUnselect: (option: Option) => void
}) {
  if (!selected.length) return null

  return (
    <div className="flex h-fit gap-1">
      {selected.map((option) => (
        <Badge
          key={option.value}
          className={`${badgeClass} ${badgeClassName ?? ""}`}
          data-fixed={option.fixed}
          data-disabled={disabled}
          onClick={() => onUnselect(option)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onUnselect(option)
            }
          }}
          onMouseDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
        >
          {option.label}
          <X className={badgeIconClass} />
        </Badge>
      ))}
    </div>
  )
}

export function CreatableItem({
  creatable,
  selected,
  inputValue,
  maxSelected,
  onMaxSelected,
  onChange,
  onSearch,
  debouncedSearchTerm,
  isLoading,
  setInputValue,
  setSelected,
}: {
  creatable: boolean
  selected: Option[]
  inputValue: string
  maxSelected: number
  onMaxSelected?: (maxLimit: number) => void
  onChange?: (options: Option[]) => void
  onSearch?: (value: string) => Promise<Option[]>
  debouncedSearchTerm: string
  isLoading: boolean
  setInputValue: (value: string) => void
  setSelected: (options: Option[]) => void
}) {
  if (!creatable) return null
  if (!inputValue.length) return null
  if (selected.some((item) => item.label === inputValue)) return null

  function Item() {
    return (
      <CommandItem
        value={inputValue}
        className="cursor-pointer"
        onMouseDown={(event) => {
          event.preventDefault()
          event.stopPropagation()
        }}
        onSelect={(value: string) => {
          if (selected.length >= maxSelected) {
            onMaxSelected?.(selected.length)
            return
          }
          setInputValue("")
          const newOptions = [...selected, { value, label: value }]
          setSelected(newOptions)
          onChange?.(newOptions)
        }}
      >{`Create "${inputValue}"`}</CommandItem>
    )
  }

  if (!onSearch && inputValue.length > 0) {
    return <Item />
  }

  if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
    return <Item />
  }

  return null
}

export function EmptyItem({
  emptyIndicator,
  onSearch,
  creatable,
  options,
}: {
  emptyIndicator?: React.ReactNode
  onSearch?: (value: string) => Promise<Option[]>
  creatable: boolean
  options: Record<string, Option[]>
}) {
  if (!emptyIndicator) return null

  if (onSearch && !creatable && Object.keys(options).length === 0) {
    return (
      <CommandItem value="-" disabled>
        {emptyIndicator}
      </CommandItem>
    )
  }

  return <CommandEmpty className="">{emptyIndicator}</CommandEmpty>
}

export function OptionsList({
  options,
  multiselect,
  selected,
  onSelectOption,
  onUnselect,
  commandItemClass,
}: {
  options: Record<string, Option[]>
  multiselect: boolean
  selected: Option[]
  onSelectOption: (option: Option) => void
  onUnselect: (option: Option) => void
  commandItemClass: (disabled?: boolean) => string
}) {
  return (
    <>
      {Object.entries(options).map(([key, dropdowns]) => (
        <CommandGroup className="h-full min-w-56 p-0" heading={key} key={key}>
          {dropdowns.map((option) => (
            <CommandItem
              disabled={option.disable}
              value={option.value}
              key={option.value}
              onMouseDown={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
              onSelect={() => {
                if (multiselect && selected.some((item) => item.value === option.value)) {
                  onUnselect(option)
                  return
                }
                onSelectOption(option)
              }}
              className={commandItemClass(option.disable)}
            >
              {multiselect && (
                <Checkbox
                  checked={selected.some((item) => item.value === option.value)}
                />
              )}
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      ))}
    </>
  )
}
