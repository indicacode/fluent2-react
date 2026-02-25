import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { useState } from "react"

interface UseDataTableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  enableSorting?: boolean
  enableFiltering?: boolean
  enablePagination?: boolean
  enableColumnVisibility?: boolean
  enableRowSelection?: boolean
  initialState?: {
    sorting?: SortingState
    filtering?: ColumnFiltersState
    columnVisibility?: VisibilityState
    rowSelection?: RowSelectionState
    pagination?: {
      pageIndex: number
      pageSize: number
    }
  }
}

export function useDataTable<TData, TValue>({
  data,
  columns,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableColumnVisibility = true,
  enableRowSelection = false,
  initialState = {},
}: UseDataTableProps<TData, TValue>) {
  // State slices are kept separate so features can be toggled independently.
  const [sorting, setSorting] = useState<SortingState>(
    initialState.sorting || []
  )
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    initialState.filtering || []
  )
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialState.columnVisibility || {}
  )
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    initialState.rowSelection || {}
  )
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: initialState.pagination?.pageIndex || 0,
    pageSize: initialState.pagination?.pageSize || 10,
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      // Disable pagination state entirely when pagination is off.
      pagination: enablePagination ? { pageIndex, pageSize } : undefined,
    },
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
    onColumnVisibilityChange: enableColumnVisibility
      ? setColumnVisibility
      : undefined,
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    onPaginationChange: enablePagination ? setPagination : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    // Enable manual control for server-side operations if needed
    manualPagination: false,
    manualSorting: false,
    manualFiltering: false,
  })

  return table
}
