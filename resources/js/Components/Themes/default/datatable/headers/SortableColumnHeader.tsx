import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

export function SortableColumnHeader<T>(props: {
    column: Column<Partial<T>, unknown>
    label: string
    className?: string
}) {
    return (
        <div className={`${'flex gap-1 items-center cursor-pointer'} ${props.className}`}
            onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
        >
            {props.label}
            {props.column.getIsSorted() === "asc" && <CaretDownIcon />}
            {props.column.getIsSorted() === "desc" && <CaretUpIcon />}
        </div>
    )
}
