import ApplicationLogo from '@/Components/Themes/tailwindui/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-dvh flex flex-col justify-center gap-8 items-center">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-24 h-24 fill-current" />
                </Link>
            </div>

            <div className="w-full sm:max-w-lg sm:rounded-lg p-8 bg-white shadow-md">
                {children}
            </div>
        </div>
    );
}
