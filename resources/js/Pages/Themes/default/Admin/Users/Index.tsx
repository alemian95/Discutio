import { DataTable } from "@/Components/Themes/default/datatable/Datatable"
import { SortableColumnHeader } from "@/Components/Themes/default/datatable/headers/SortableColumnHeader"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/Themes/default/ui/alert-dialog"
import { Badge } from "@/Components/Themes/default/ui/badge"
import { Button } from "@/Components/Themes/default/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/Themes/default/ui/dropdown-menu"
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs"
import AppLayout from "@/Layouts/Themes/default/AppLayout"
import { PageProps, User } from "@/types"
import { Head, usePage } from "@inertiajs/react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"

export default function Index(
    { users, canBanUsers }
    :
    { users: User[], canBanUsers: boolean }
) {

    const { auth } = usePage<PageProps>().props

    const { breadcrumbs: completeBreadcrumbs, append: appendBreadcrumb, reset: resetBreadcrumb } = useBreadcrumbs()

    const [ banModelOpen, setBanModalOpen ] = useState(false)

    useEffect(() => {
        resetBreadcrumb()
        appendBreadcrumb({ label: "Admin", url: route('dashboard') })
        appendBreadcrumb({ label: "Users" })
    }, [users])

    const columns: ColumnDef<Partial<User>>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={
        //                 table.getIsAllPageRowsSelected() ||
        //                 (table.getIsSomePageRowsSelected() && "indeterminate")
        //             }
        //             onCheckedChange={(value: any) => { table.toggleAllPageRowsSelected(!!value); toggleAllSelectedRows(!!value) }}
        //             aria-label="Select all"
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value: any) => { row.toggleSelected(!!value); toggleSelectedRows(row.original.id!) }}
        //             aria-label="Select row"
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "name",
            header: ({ column }) => <SortableColumnHeader column={column} label="Name" />,
            cell: ({ row }) => (
                <div>{row.original.name}</div>
            ),
        },
        {
            accessorKey: "email",
            header: ({ column }) => <SortableColumnHeader column={column} label="Email" />,
            cell: ({ row }) => (
                <div>{row.original.email}</div>
            ),
        },
        {
            accessorKey: "threads",
            header: ({ column }) => <SortableColumnHeader column={column} label="Threads" />,
            cell: ({ row }) => (
                <div onClick={() => alert('ciao')}>{row.original.threads?.length}</div>
            )
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => <SortableColumnHeader column={column} label="Registered At" />,
            // cell: ({ row }) => <DateTimeFormatter date={row.original.created_at!} format="year/month/date"/>,
            cell: ({ row }) => <div>{row.original.short_human_created_at}</div>
        },
        {
            accessorKey: "role",
            header: ({ column }) => <SortableColumnHeader column={column} label="Role" />,
            cell: ({ row }) => <div>{row.original.roles!.length ? row.original.roles![0].name : '-'}</div>,
        },
        {
            accessorKey: "status",
            header: ({ column }) => <SortableColumnHeader column={column} label="Status" />,
            cell: ({ row }) => row.original.is_banned ?
                <Badge variant='destructive'>Banned {row.original.human_banned_until ? `until ${row.original.human_banned_until}` : `permanently`}</Badge>
                :
                <Badge variant='positive'>Active</Badge>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const or = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Apri menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => navigator.clipboard.writeText(or.email!)}>Copy email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {
                                canBanUsers
                                &&
                                <DropdownMenuItem className="cursor-pointer" onClick={() => setBanModalOpen(true)}>Create Ban Instance</DropdownMenuItem>
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return (
        <AppLayout
            user={auth.user}
            breadcrumbs={completeBreadcrumbs}
            title={`User list`}
            useCard={true}
        >
            <Head title={`User list`} />

            <DataTable
                data={users}
                columns={columns}
                enableColumnsSelection={true}
                enableTextFilter="name"
                enableRowsSelection={false}
                isLoading={false}
                error={null}
                pageSize={20}
            />

            {
                canBanUsers
                &&
                <AlertDialog open={banModelOpen} onOpenChange={setBanModalOpen}>
                    {/* <AlertDialogTrigger>

                    </AlertDialogTrigger> */}
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>This action will create a new Ban Instance for this user. This means that the user will be banned from all services. You can also use the "Ban" button in the top right corner of the page to ban users.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            }

        </AppLayout>
    );
}
