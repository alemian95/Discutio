import { Column } from "@tanstack/react-table";

export function ColumnHeader<T>(props: {
    column: Column<Partial<T>, unknown>
    label: string
    className?: string
}) {
    return (
        <div className={`${'flex gap-1 items-center'} ${props.className}`}
        >
            {props.label}
        </div>
    )
}
