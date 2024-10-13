import { useState, PropsWithChildren, FormEventHandler } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Breadcrumb as BreadcrumbType, PageProps, User } from "@/types";
import ApplicationLogo from "@/Components/Themes/tailwindui/ApplicationLogo";
import {
    HomeIcon,
    PackageIcon,
    SearchIcon,
    SettingsIcon,
    Shield,
    SidebarIcon,
} from "lucide-react";
import { NavLink } from "@/Components/Themes/default/NavLink";
import { UserMenu } from "./partials/UserMenu";
import { NavigationMenu } from "./partials/NavigationMenu";
import { Alert } from "@/Components/Themes/default/ui/alert";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/Components/Themes/default/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/Themes/default/ui/sheet";
import { Input } from "@/Components/Themes/default/ui/input";
import { Button } from "@/Components/Themes/default/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Themes/default/ui/popover";

export default function AppLayout({
    children,
    breadcrumbs,
    useCard = true,
    title,
    defaultSearchQuery
}: PropsWithChildren<{
    user?: User;
    breadcrumbs?: BreadcrumbType[];
    useCard?: boolean;
    title?: string;
    defaultSearchQuery?: string;
}>) {
    const { post } = useForm({})

    const [verificationSent, setVerificationSent] = useState(false)

    const { auth } = usePage<PageProps>().props

    const { data: query, setData: setQuery, get } = useForm({
        query: defaultSearchQuery || ""
    })

    function resendVerification() {
        post(route("verification.send"), {
            onSuccess() {
                setVerificationSent(true);
            },
        });
    }

    const search: FormEventHandler = (e) => {
        e.preventDefault();
        get(route('search', query))
    }

    return (
        <div className="min-h-dvh">
            <div className="hidden md:block bg-white w-16 fixed top-0 left-0 bottom-0 shadow">
                <div className="flex flex-col h-full justify-between p-4">
                    <div className="flex flex-col gap-4 items-center">
                        <Link href={route("dashboard")} className="mb-2">
                            <ApplicationLogo className="w-10 h-10" />
                        </Link>

                        <NavLink
                            label="Dashboard"
                            url={route("dashboard")}
                            icon={<HomeIcon className="w-8 h-8 text-primary" />}
                        />
                        <NavLink
                            label="My Contents"
                            url={route("dashboard")}
                            icon={
                                <PackageIcon className="w-8 h-8 text-primary" />
                            }
                        />
                    </div>
                    <div>
                        <div className="flex flex-col gap-4 items-center">
                            {auth.canViewAdmin && (
                                <NavLink
                                    label="Administration"
                                    url={"#"}
                                    icon={
                                        <Shield className="w-8 h-8 text-primary" />
                                    }
                                />
                            )}
                            {auth.canViewConfigs && (
                                <NavLink
                                    label="Configuration"
                                    url={route("configs.index")}
                                    icon={
                                        <SettingsIcon className="w-8 h-8 text-primary" />
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:ml-16 md:px-4 md:mt-2">
                <div className="fixed left-0 right-0 bg-white px-4 h-12 shadow md:shadow-none md:h-auto md:static md:bg-transparent md:p-2 flex justify-between items-center">
                    <div>
                        <div className="hidden md:block">
                            <NavigationMenu breadcrumbs={breadcrumbs} />
                        </div>
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger><SidebarIcon className="w-6 h-6 text-primary" /></SheetTrigger>
                                <SheetContent side={'left'} className="h-full flex flex-col">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <ApplicationLogo className="w-12 h-12" />
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col justify-between pt-6 flex-1">
                                        <div className="flex flex-col gap-4">
                                            <Link href={route('dashboard')} className="flex flex-row justify-start items-center gap-4 text-primary p-2 w-full hover:bg-accent hover:text-accent-foreground rounded-md">
                                                <HomeIcon className="w-6 h-6" />
                                                <span>Dashboard</span>
                                            </Link>
                                            <Link href={route('dashboard')} className="flex flex-row justify-start items-center gap-4 text-primary p-2 w-full hover:bg-accent hover:text-accent-foreground rounded-md">
                                                <PackageIcon className="w-6 h-6" />
                                                <span>My Contents</span>
                                            </Link>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            {auth.canViewAdmin && (
                                                <Link href='#' className="flex flex-row justify-start items-center gap-4 text-primary p-2 w-full hover:bg-accent hover:text-accent-foreground rounded-md">
                                                    <Shield className="w-6 h-6" />
                                                    <span>Administration</span>
                                                </Link>
                                            )}
                                            {auth.canViewConfigs && (
                                                <Link href={route('configs.index')} className="flex flex-row justify-start items-center gap-4 text-primary p-2 w-full hover:bg-accent hover:text-accent-foreground rounded-md">
                                                    <SettingsIcon className="w-6 h-6" />
                                                    <span>Configurations</span>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end items-center gap-4">
                        <Popover>
                            <PopoverTrigger><Button variant={'ghost'} className="p-2 h-10 w-12 rounded-md"><SearchIcon className="h-4 w-4" /></Button></PopoverTrigger>
                            <PopoverContent className="w-full">
                                <form onSubmit={search} className="flex flex-row justify-end items-center gap-1">
                                    <Input className="bg-white min-w-64 h-10 shadow-none" type='text' placeholder='Search' value={query.query} onChange={(e) => setQuery('query', e.target.value)} />
                                    <Button variant={'ghost'}>Search</Button>
                                </form>
                            </PopoverContent>
                        </Popover>
                        <UserMenu user={auth.user} />
                    </div>
                </div>

                <div className="pt-12 md:pt-0">
                    {auth.user && auth.user.email_verified_at == null && (
                        <Alert className="bg-primary text-primary-foreground">
                            {!verificationSent ? (
                                <>
                                    <p>
                                        Your account has not been verified yet.
                                        Please check your emails and follow the
                                        istructions.
                                    </p>
                                    <p>
                                        If you didn't received the email,{" "}
                                        <span
                                            className="cursor-pointer underline text-secondary"
                                            onClick={resendVerification}
                                        >
                                            click here
                                        </span>{" "}
                                        and we will send you another one.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        Another email has been sent to your
                                        inbox. Please check it and follow the
                                        instructions.
                                    </p>
                                </>
                            )}
                        </Alert>
                    )}

                    {useCard ? (
                        <Card className="border-none shadow-sm max-w-7xl mx-auto p-4 bg-white rounded-none md:rounded-lg mt-6">
                            {title && (
                                <CardHeader className="font-bold text-xl">
                                    {title}{" "}
                                </CardHeader>
                            )}
                            <CardContent>{children}</CardContent>
                        </Card>
                    ) : (
                        <>{children}</>
                    )}
                </div>
            </div>
        </div>
    );
}
