"use client"
import portalRoot from "@/utils/portal-root"
import { useDebounce } from "@/utils/useDebounce"
import { Command as CommandPrimitive } from "cmdk"
import { X } from "lucide-react"
import * as React from "react"
import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { tv } from "tailwind-variants"

import { Command, CommandItem, CommandList } from "@/registry/fluent2tailwind/command/command"
import {
  GroupOption,
  MultipleSelectorProps,
  MultipleSelectorRef,
  Option,
} from "./combobox.types"
import { Input } from "../input/input"
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover"
import {
  CreatableItem,
  EmptyItem,
  OptionsList,
  SelectedBadges,
} from "./combobox.parts"

function transferToGroupOption(options: Array<Option>, groupBy?: string) {
  if (options.length === 0) {
    return {}
  }

  if (!groupBy) {
    return {
      "": options,
    }
  }

  const groupOption: GroupOption = {}
  options.forEach((option) => {
    const key = (option[groupBy] as string) || ""
    if (!groupOption[key]) {
      groupOption[key] = []
    }
    groupOption[key].push(option)
  })
  return groupOption
}

//-----------------------------STYLES---------------------------------//
const combobox = tv({
  slots: {
    badge:
      "data-disabled:bg-muted data-disabled:text-muted-foreground data-disabled:hover:bg-muted data-fixed:bg-muted data-fixed:text-muted-foreground data-fixed:hover:bg-muted flex cursor-pointer items-center justify-center gap-1 rounded-full bg-primary py-1",
    badgeIcon: "text-muted-foreground hover:text-foreground h-3 w-3",
    commandList:
      "animate-in flex w-56 justify-start rounded-md border p-0.5 shadow-md outline-hidden",
    commandItem: "flex w-full cursor-pointer gap-1.5 rounded-none",
    commandRoot: "overflow-visible bg-transparent",
    input: "min-w-56 px-2",
    inputClearable: "absolute top-1/2 right-1 -translate-y-1/2",
  },
  variants: {
    disabled: {
      true: { commandItem: "text-muted-foreground cursor-default" },
    },
  },
})

const {
  badge,
  badgeIcon,
  commandItem,
  commandList,
  commandRoot,
  input,
  inputClearable,
} = combobox({})
//-----------------------------STYLES-------------------------------//

const Combobox = forwardRef<MultipleSelectorRef, MultipleSelectorProps>(
  (
    {
      defaultOptions: arrayDefaultOptions = [],
      maxSelected = Number.MAX_SAFE_INTEGER,
      triggerSearchOnFocus = false,
      hidePlaceholderWhenSelected,
      selectFirstItem = true,
      mountNode = portalRoot,
      options: arrayOptions,
      multiselect = false,
      clearable = false,
      creatable = false,
      loadingIndicator,
      selectedOptions,
      badgeClassName,
      emptyIndicator,
      onMaxSelected,
      onOpenChange,
      commandProps,
      tags = false,
      placeholder,
      defaultOpen,
      inputProps,
      className,
      onSearch,
      onChange,
      disabled,
      variant,
      groupBy,
      delay,
      size,
      open,
    }: MultipleSelectorProps,
    ref: Ref<MultipleSelectorRef>
  ) => {
    const [options, setOptions] = useState<GroupOption>(
      transferToGroupOption(arrayDefaultOptions, groupBy)
    )
    const [selected, setSelected] = useState<Option[]>(selectedOptions || [])
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const debouncedSearchTerm = useDebounce(inputValue, delay || 500)

    const inputRef = useRef<HTMLInputElement>(null)

    //------------------------------------------------------------------//

    useImperativeHandle(
      ref,
      () => ({
        selectedValue: [...selected],
        input: inputRef.current as HTMLInputElement,
      }),
      [selected]
    )

    //------------------------------------------------------------------//

    function handleUnselect(option: Option) {
      const newOptions = selected.filter((s) => s.value !== option.value)
      setSelected(newOptions)
      onChange?.(newOptions)
    }

    //------------------------------------------------------------------//

    useEffect(() => {
      if (selectedOptions) {
        setSelected(selectedOptions)
      }
    }, [selectedOptions])

    //----If `onSearch` is provided, do not trigger options updated.-----//
    useEffect(() => {
      if (!arrayOptions || onSearch) {
        return
      }
      const newOption = transferToGroupOption(arrayOptions || [], groupBy)
      if (JSON.stringify(newOption) !== JSON.stringify(options)) {
        setOptions(newOption)
      }
    }, [arrayDefaultOptions, arrayOptions, groupBy, onSearch, options])

    //------------------------------------------------------------------//

    useEffect(() => {
      const doSearch = async () => {
        setIsLoading(true)
        const res = await onSearch?.(debouncedSearchTerm)
        setOptions(transferToGroupOption(res || [], groupBy))
        setIsLoading(false)
      }

      const exec = async () => {
        if (!onSearch || !open) return

        if (triggerSearchOnFocus) {
          await doSearch()
        }

        if (debouncedSearchTerm) {
          await doSearch()
        }
      }

      void exec()
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus])

    //------------------------------------------------------------------//

    //---Avoid Creatable Selector freezing or lagging when paste a long string.---//
    function commandFilter() {
      if (commandProps?.filter) {
        return commandProps.filter
      }

      if (creatable) {
        return (value: string, search: string) => {
          return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1
        }
      }
      // Using default filter in `cmdk`. We don't have to provide it.
      return undefined
    }

    //------------------------------------------------------------------//

    function handleOptionSelect(option: Option) {
      if (!multiselect) {
        setInputValue(option.label)
        setSelected([option])
        return
      }
      if (selected.length >= maxSelected) {
        onMaxSelected?.(selected.length)
        return
      }
      const newOptions = [...selected, option]
      setSelected(newOptions)
      onChange?.(newOptions)
    }

    return (
      <Popover
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <div className="flex min-h-fit flex-col gap-1">
          {multiselect && tags && (
            <SelectedBadges
              selected={selected}
              badgeClassName={badgeClassName}
              disabled={disabled}
              badgeClass={badge({})}
              badgeIconClass={badgeIcon()}
              onUnselect={handleUnselect}
            />
          )}
          <Command
            onKeyDown={(e) => {
              if (
                e.key === "Backspace" &&
                !multiselect &&
                selected.length > 0
              ) {
                setSelected([])
                setInputValue("")
              }
            }}
            {...commandProps}
            className={commandRoot({ className: commandProps?.className })}
            shouldFilter={
              commandProps?.shouldFilter !== undefined
                ? commandProps.shouldFilter
                : !onSearch
            } // When onSearch is provided, we don't want to filter the options. You can still override it.
            filter={commandFilter()}
          >
            <PopoverTrigger className="relative">
              <Input
                className={input({ className })}
                disabled={disabled}
                value={inputValue}
                size={size}
                variant={variant}
                {...inputProps}
                ref={inputRef}
                onChange={(e) => {
                  if (!multiselect && selected.length > 0) {
                    return
                  }
                  setInputValue(e.target.value)
                  inputProps?.onChange?.(e)
                }}
                onBlur={(event) => {
                  inputProps?.onBlur?.(event)
                }}
                onFocus={(event) => {
                  triggerSearchOnFocus && onSearch?.(debouncedSearchTerm)
                  inputProps?.onFocus?.(event)
                }}
                placeholder={
                  hidePlaceholderWhenSelected && selected.length !== 0
                    ? ""
                    : placeholder
                }
              />
              {clearable && (
                <X
                  className={inputClearable()}
                  onClick={() => {
                    setSelected([])
                    setInputValue("")
                  }}
                />
              )}
            </PopoverTrigger>
            <CommandPrimitive.Input
              //@ts-ignore*
              value={inputValue}
              {...inputProps}
              hidden
            />
            <PopoverContent
              side="bottom"
              align="start"
              className="w-radix-popover-trigger"
              onOpenAutoFocus={(e) => e.preventDefault()}
              container={mountNode}
              autoFocus={false}
              asChild
            >
              <CommandList className={commandList()}>
                {isLoading ? (
                  <>{loadingIndicator}</>
                ) : (
                  <>
                    <EmptyItem
                      emptyIndicator={emptyIndicator}
                      onSearch={onSearch}
                      creatable={creatable}
                      options={options}
                    />
                    <CreatableItem
                      creatable={creatable}
                      selected={selected}
                      inputValue={inputValue}
                      maxSelected={maxSelected}
                      onMaxSelected={onMaxSelected}
                      onChange={onChange}
                      onSearch={onSearch}
                      debouncedSearchTerm={debouncedSearchTerm}
                      isLoading={isLoading}
                      setInputValue={setInputValue}
                      setSelected={setSelected}
                    />
                    {!selectFirstItem && (
                      <CommandItem value="-" className="hidden" />
                    )}
                    <OptionsList
                      options={options}
                      multiselect={multiselect}
                      selected={selected}
                      onSelectOption={handleOptionSelect}
                      onUnselect={handleUnselect}
                      commandItemClass={(disabled) =>
                        commandItem({ disabled })
                      }
                    />
                  </>
                )}
              </CommandList>
            </PopoverContent>
          </Command>
        </div>
      </Popover>
    )
  }
)

Combobox.displayName = "Combobox"
export default Combobox
