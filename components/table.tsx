import { HTMLAttributes, TdHTMLAttributes } from "react"
import { tv } from "tailwind-variants"

//--------------------------------styles------------------------------------//
const tableSlots = tv({
  slots: {
    // ---group--- //
    tableRoot: "relative w-full overflow-x-auto",
    table: "w-full min-w-[500px] caption-bottom rounded-sm text-sm",
    // ---group--- //

    tableHeader: "[&_tr]:border-b-[2px]",

    tableBody: "py-1 [&_tr:last-child]:border-0",

    tableFoot:
      "border-t-[2px] border-border py-1 font-medium hover:bg-muted/50 last:[&>tr]:border-b-0",

    tableRow:
      "border-b-[2px] border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",

    tableHead:
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",

    tableCell:
      "p-2 py-1.5 whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",

    tableCaption: "mt-4 text-sm text-muted-foreground",
  },
  variants: {
    size: {},
  },
})

const {
  table,
  tableHeader,
  tableBody,
  tableFoot,
  tableRow,
  tableHead,
  tableCell,
  tableCaption,
  tableRoot,
} = tableSlots()
//--------------------------------styles------------------------------------//

type TableProps = HTMLAttributes<HTMLTableElement>

function Table({ className, ...props }: TableProps) {
  return (
    <div className={tableRoot()}>
      <table className={table({ className: className as string })} {...props} />
    </div>
  )
}

//-------------------------------------------------------------------------//

type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>

function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead className={tableHeader({ className: className as string })} {...props} />
}

//-------------------------------------------------------------------------//

type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>

function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody className={tableBody({ className: className as string })} {...props} />
}

//-------------------------------------------------------------------------//

type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>

function TableFooter({ className, ...props }: TableFooterProps) {
  return <tfoot className={tableFoot({ className: className as string })} {...props} />
}

//-------------------------------------------------------------------------//

type TableRowProps = HTMLAttributes<HTMLTableRowElement>

function TableRow({ className, ...props }: TableRowProps) {
  return <tr className={tableRow({ className: className as string })} {...props} />
}

//-------------------------------------------------------------------------//

type TableHeadProps = HTMLAttributes<HTMLTableCellElement>

function TableHead({ className, ...props }: TableHeadProps) {
  return <th className={tableHead({ className: className as string })} {...props} />
}

//-------------------------------------------------------------------------//

type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>

function TableCell({ className, ...props }: TableCellProps) {
  return <td className={tableCell({ className: className as string })} {...props} />
}

//-------------------------------------------------------------------------//

type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>

function TableCaption({ className, ...props }: TableCaptionProps) {
  return <caption className={tableCaption({ className: className as string })} {...props} />
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
}
