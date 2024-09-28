import { useState, PropsWithChildren, ReactNode } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import ApplicationLogo from '@/Components/Themes/tailwindui/ApplicationLogo';
import { DashboardIcon, DashIcon } from '@radix-ui/react-icons';
import { BoxIcon, HomeIcon, PackageIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/Components/Themes/default/ui/tooltip';

export default function AppLayout({ user, header, children }: PropsWithChildren<{ user?: User, header?: ReactNode }>) {

    const { post } = useForm({})
    const [ verificationSent, setVerificationSent ] = useState(false)

    const { auth } = usePage<PageProps>().props

    function resendVerification() {
        post(route('verification.send'), {
            onSuccess() {
                setVerificationSent(true)
            }
        })
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
        <div className='min-h-dvh'>

            <div className='hidden md:block bg-white w-16 fixed top-0 left-0 bottom-0 shadow'>
                <div className="flex flex-col h-full justify-between p-4">
                    <div className='flex flex-col gap-4 items-center'>
                        <Link href={route('dashboard')} className='mb-2'><ApplicationLogo className='w-10 h-10' /></Link>

                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={route('dashboard')}><HomeIcon className='w-8 h-8 text-primary' /></Link>
                                </TooltipTrigger>
                                <TooltipContent side='right'>
                                    <p>Dashboard</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={route('dashboard')}><PackageIcon className='w-8 h-8 text-primary' /></Link>
                                </TooltipTrigger>
                                <TooltipContent side='right'>
                                    <p>My Contents</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div>here admin menu</div>
                </div>
            </div>

            <div className='md:ml-16'>
                { children }
            </div>
        </div>
    )
}
