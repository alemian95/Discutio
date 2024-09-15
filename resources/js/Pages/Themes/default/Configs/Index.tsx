import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Index() {

    const { auth } = usePage<PageProps>().props

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className='flex flex-row gap-4'>
                        <Link
                            key={0}
                            href={route('dashboard')}
                            className='font-semibold text-indigo-600'
                        >
                            <span>Dashboard</span>
                        </Link>
                        <span>&raquo;</span>
                        <Link
                            key={0}
                            href={route('configs.index')}
                            className='font-semibold text-indigo-600'
                        >
                            <span>Configurations</span>
                        </Link>
                    </div>
                </>
            }
        >
            <Head title="Configurations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
