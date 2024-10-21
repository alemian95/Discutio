import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"
import { useState } from "react"
import { Input } from "../ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { ChevronDownIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Pagination, PaginationContent, PaginationItem } from "../ui/pagination"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PaginationTable } from "./pagination/PaginationTable"

export type DataTableProps<T> = {
    data: T[]
    columns: ColumnDef<T>[]
    enableColumnsSelection?: boolean
    enableRowsSelection?: boolean
    enableTextFilter?: string
    isLoading: boolean
    error: string | null
    pageSize: number
}

export function DataTable<T>(props: DataTableProps<T>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const [ currentPage, setCurrentPage ] = useState(0)

    const data = props.data
    const columns = props.columns

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: {
                pageIndex: currentPage,
                pageSize: props.pageSize
            }
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                {
                    props.enableTextFilter
                    &&
                    <Input
                        placeholder={`Filter ${props.enableTextFilter}...`}
                        value={(table.getColumn(props.enableTextFilter!)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(props.enableTextFilter!)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                }
                {
                    props.enableColumnsSelection
                    &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDownIcon className="ml-1"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value: any) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
            <div className="border">
                <Table>
                    <TableHeader className="bg-primary">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-white font-semibold">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {
                            table.getRowCount() > 0
                                ?
                                (
                                    table.getRowModel().rows.map((row, index) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                            className={`${index % 2 === 0 ? "bg-sky-50" : "bg-white"}`}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="p-1">
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                )
                                :
                                (
                                    props.isLoading
                                        ?
                                        <tr><td>Caricamento ...</td></tr>
                                        :
                                        props.error
                                            ?
                                            <tr><td>{props.error}</td></tr>
                                            :
                                            <TableRow>
                                                <TableCell
                                                    colSpan={columns.length}
                                                    className="h-24 text-center"
                                                >
                                                    Nessun risultato
                                                </TableCell>
                                            </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                {
                    props.enableRowsSelection
                    &&
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} di{" "}
                        {table.getFilteredRowModel().rows.length} elemento(i) selezionato(i).
                    </div>
                }
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    // onClick={() => table.setPageIndex(0)}
                                    onClick={() => setCurrentPage(0)}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <DoubleArrowLeftIcon className="mr-1" />
                                    Prima
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button
                                    // onClick={() => table.previousPage()}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <ChevronLeft className="mr-1 w-4 h-4"/>
                                    Precedente
                                </Button>
                            </PaginationItem>
                            <PaginationTable table={table} />
                            <PaginationItem>
                                <Button
                                    // onClick={() => table.nextPage()}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={!table.getCanNextPage()}
                                >
                                    Successiva
                                    <ChevronRight className="ml-1 w-4 h-4"/>
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button
                                    // onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    onClick={() => setCurrentPage(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                >
                                    Ultima
                                    <DoubleArrowRightIcon className="ml-1" />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}
