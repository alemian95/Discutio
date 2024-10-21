import { DataTable } from "@/Components/Themes/default/datatable/Datatable"
import { SortableColumnHeader } from "@/Components/Themes/default/datatable/headers/SortableColumnHeader"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/Themes/default/ui/dialog"
import { Badge } from "@/Components/Themes/default/ui/badge"
import { Button } from "@/Components/Themes/default/ui/button"
import { Checkbox } from "@/Components/Themes/default/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/Themes/default/ui/dropdown-menu"
import { Input } from "@/Components/Themes/default/ui/input"
import { Label } from "@/Components/Themes/default/ui/label"
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs"
import AppLayout from "@/Layouts/Themes/default/AppLayout"
import { PageProps, User } from "@/types"
import { Head, useForm, usePage } from "@inertiajs/react"
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

    const [ selectedBanUser, setSelectedBanUser ] = useState<User|Partial<User>|null>(null)

    const { data: banFormData, setData: setBanFormData } = useForm({
        user_id: selectedBanUser?.id || undefined,
        now: true,
        from: "",
        forever: false,
        until: ""
    })

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
                                <>
                                    <DropdownMenuLabel>Ban Actions</DropdownMenuLabel>
                                    <DropdownMenuItem className="cursor-pointer" onClick={() => { setSelectedBanUser(row.original); setBanFormData('user_id', row.original.id); setBanModalOpen(true)}}>Create Ban Instance</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Ban History</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Extend Ban</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Terminate Ban</DropdownMenuItem>
                                </>
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
            title={`User Management`}
            useCard={true}
        >
            <Head title={`User Management`} />

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
                <Dialog open={banModelOpen} onOpenChange={setBanModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to ban {selectedBanUser?.name}?</DialogTitle>
                            <DialogDescription>This action will create a new Ban Instance for this user.</DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="now">From now</Label>
                                    <Checkbox name="now" id="now" checked={banFormData.now} onCheckedChange={(e) => setBanFormData('now', e.valueOf() as boolean)} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label htmlFor="from">Or select date</Label>
                                    <Input name="from" id="from" type="datetime-local" value={banFormData.from} onChange={(e) => setBanFormData('from', e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-1">
                                    <Label htmlFor="forever">Until forever</Label>
                                    <Checkbox name="forever" id="forever" checked={banFormData.forever} onCheckedChange={(e) => setBanFormData('forever', e.valueOf() as boolean)} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label htmlFor="until">Or select date</Label>
                                    <Input name="until" id="until" type="datetime-local" value={banFormData.until} onChange={(e) => setBanFormData('until', e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <pre>{JSON.stringify(banFormData, null, 2)}</pre>
                        <DialogFooter>
                            <Button>Cancel</Button>
                            <Button>Confirm</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            }

        </AppLayout>
    );
}
