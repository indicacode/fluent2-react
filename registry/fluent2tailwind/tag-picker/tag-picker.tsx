"use client"

import Combobox from "@/registry/fluent2tailwind/combobox/combobox"
import { Option } from "@/registry/fluent2tailwind/combobox/combobox.types"
import * as React from "react"

export type TagPickerProps = React.ComponentProps<typeof Combobox> & {
  noPopover?: boolean
}

function TagPicker({
  multiselect = true,
  tags = true,
  noPopover = false,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: TagPickerProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)
  const resolvedOpen = noPopover ? true : open ?? internalOpen

  return (
    <Combobox
      multiselect={multiselect}
      tags={tags}
      open={resolvedOpen}
      onOpenChange={(nextOpen?: boolean) => {
        if (!noPopover) {
          setInternalOpen(nextOpen ?? !resolvedOpen)
        }
        onOpenChange?.()
      }}
      {...props}
    />
  )
}

export type UseTagPickerFilterOptions = {
  query: string
  options: Option[]
  noResultsMessage?: string
  filter?: (query: string, option: Option) => boolean
}

export function useTagPickerFilter({
  query,
  options,
  noResultsMessage = "No matches",
  filter,
}: UseTagPickerFilterOptions) {
  const filtered = React.useMemo(() => {
    const normalized = query.toLowerCase()
    return options.filter((option) =>
      filter
        ? filter(normalized, option)
        : option.label.toLowerCase().includes(normalized)
    )
  }, [query, options, filter])

  return {
    options: filtered,
    emptyMessage: filtered.length ? undefined : noResultsMessage,
  }
}

export { TagPicker }
