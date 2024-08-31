import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Category, PageProps, Thread } from '@/types';

export default function Show( { thread, breadcrumbs } : { thread: Thread, breadcrumbs: Category[] } ) {

    const { auth } = usePage<PageProps>().props

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex flex-row gap-4'>
                    <Link
                        key={0}
                        href={route('dashboard')}
                        className='font-semibold text-indigo-600'
                    >
                        <span>Dashboard</span>
                    </Link>
                    {
                        breadcrumbs && breadcrumbs.length &&
                        breadcrumbs.map((category, index) => {
                            return (
                                <>
                                    <span>&raquo;</span>
                                    <Link
                                        key={category.id}
                                        href={route('dashboard.category', category.code)}
                                        className='font-semibold text-indigo-600'
                                    >
                                        <span>{category.name}</span>
                                    </Link>
                                </>
                            )
                        })
                    }
                    <span>&raquo;</span>
                    <Link
                        key={breadcrumbs.length}
                        href={route('threads.show', thread.id)}
                        className='font-semibold text-indigo-600'
                    >
                        <span>{thread.title}</span>
                    </Link>
                </div>
            }
        >
            <Head title={thread.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='flex min-h-[200px]'>
                            <div className="bg-indigo-200 flex items-center p-4 rounded-l-lg">
                                <b>{thread.author?.name}</b>
                            </div>
                            <div className='flex flex-col justify-between rounded-r-lg w-full'>
                                <div className='p-6 break-normal whitespace-pre'>{thread.content}</div>
                                <div className='bg-slate-200 p-2 text-sm text-slate-600'>{thread.human_created_at}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
