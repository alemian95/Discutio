import { useState, PropsWithChildren } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Breadcrumb as BreadcrumbType, PageProps, User } from "@/types";
import ApplicationLogo from "@/Components/Themes/tailwindui/ApplicationLogo";
import { HomeIcon, PackageIcon, SettingsIcon, Shield, SidebarIcon, UserIcon } from "lucide-react";
import { NavLink } from "@/Components/Themes/default/NavLink";
import { UserMenu } from "./partials/UserMenu";
import { NavigationMenu } from "./partials/NavigationMenu";
import { Alert } from "@/Components/Themes/default/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/Themes/default/ui/card";

export default function AppLayout({
    children,
    breadcrumbs,
    useCard = true,
    title
}: PropsWithChildren<{
    user?: User;
    breadcrumbs?: BreadcrumbType[];
    useCard?: boolean,
    title?: string
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
                            {
                                auth.canViewAdmin &&
                                <NavLink
                                    label="Administration"
                                    url={'#'}
                                    icon={
                                        <Shield className="w-8 h-8 text-primary" />
                                    }
                                />
                            }
                            {
                                auth.canViewConfigs &&
                                <NavLink
                                    label="Configuration"
                                    url={route("configs.index")}
                                    icon={
                                        <SettingsIcon className="w-8 h-8 text-primary" />
                                    }
                                />
                            }
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
                            <SidebarIcon />
                        </div>
                    </div>
                    <div>
                        <UserMenu user={auth.user} />
                    </div>
                </div>

                <div className="pt-12 md:pt-0">

                    {
                        auth.user && auth.user.email_verified_at == null
                        &&
                        <Alert className="bg-primary text-primary-foreground">
                            {
                                !verificationSent
                                    ?
                                    <>
                                        <p>Your account has not been verified yet. Please check your emails and follow the istructions.</p>
                                        <p>If you didn't received the email, <span className='cursor-pointer underline text-secondary' onClick={resendVerification}>click here</span> and we will send you another one.</p>
                                    </>
                                    :
                                    <>
                                        <p>Another email has been sent to your inbox. Please check it and follow the instructions.</p>
                                    </>
                            }
                        </Alert>
                    }

                    {
                        useCard
                        ?
                        <Card className="border-none shadow-sm max-w-7xl mx-auto p-4 bg-white rounded-none md:rounded-lg mt-6">
                            { title && <CardHeader className="font-bold text-xl">{ title} </CardHeader> }
                            <CardContent>
                                {children}
                            </CardContent>
                        </Card>
                        :
                        <>{ children }</>
                    }
                </div>
            </div>
        </div>
    );
}
