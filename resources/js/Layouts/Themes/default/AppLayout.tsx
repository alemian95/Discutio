import React, { useState, PropsWithChildren, ReactNode } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Breadcrumb as BreadcrumbType, PageProps, User } from "@/types";
import ApplicationLogo from "@/Components/Themes/tailwindui/ApplicationLogo";
import { HomeIcon, PackageIcon, SidebarIcon, UserIcon } from "lucide-react";
import { NavLink } from "@/Components/Themes/default/NavLink";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/Themes/default/ui/breadcrumb";
import { Avatar, AvatarFallback } from "@/Components/Themes/default/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/Themes/default/ui/dropdown-menu";

export default function AppLayout({
    children,
    breadcrumbs,
}: PropsWithChildren<{
    user?: User;
    breadcrumbs?: BreadcrumbType[];
}>) {
    const { post } = useForm({});
    const [verificationSent, setVerificationSent] = useState(false);

    const { auth } = usePage<PageProps>().props;

    function resendVerification() {
        post(route("verification.send"), {
            onSuccess() {
                setVerificationSent(true);
            },
        });
    }

    return (
        // <>
        //     <div>
        //         { header }
        //     </div>
        //     <div>
        //         { children }
        //     </div>
        // </>
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
                    <div>here admin menu</div>
                </div>
            </div>

            <div className="md:ml-16 md:px-4 md:mt-2">
                <div className="fixed left-0 right-0 bg-white px-4 h-12 md:h-auto md:static md:bg-transparent md:p-2 flex justify-between items-center">
                    <div>
                        <div className="hidden md:block">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbs?.map((breadcrumb, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <BreadcrumbItem>
                                                    {breadcrumb.url ? (
                                                        <BreadcrumbLink
                                                            href={breadcrumb.url}
                                                        >
                                                            {breadcrumb.label}
                                                        </BreadcrumbLink>
                                                    ) : (
                                                        <BreadcrumbPage>
                                                            {breadcrumb.label}
                                                        </BreadcrumbPage>
                                                    )}
                                                </BreadcrumbItem>
                                                {index ===
                                                breadcrumbs.length - 1 ? null : (
                                                    <BreadcrumbSeparator />
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="md:hidden">
                            <SidebarIcon />
                        </div>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                    <AvatarFallback>
                                        {
                                            auth.user
                                            ?
                                            auth.user.email.charAt(0).toUpperCase()
                                            :
                                            <UserIcon />
                                        }
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="border-none">
                                {
                                    auth.user
                                    ?
                                    <>
                                        <DropdownMenuLabel>
                                            { auth.user.name }
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link href={route('profile.edit')}>Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive font-semibold">
                                            <Link href={route('logout')} method="post" as="button">Logout</Link>
                                        </DropdownMenuItem>
                                    </>
                                    :
                                    <>
                                        <DropdownMenuItem>
                                            <Link href={route('login')}>Login</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href={route('register')}>Register</Link>
                                        </DropdownMenuItem>
                                    </>
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="pt-12 md:pt-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
