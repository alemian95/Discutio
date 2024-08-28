import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Category, PageProps, Thread } from '@/types';
import PrimaryButton from '@/Components/Themes/default/PrimaryButton';

export default function Dashboard( { categories, threads, category, breadcrumbs, canCreateThreads } : { categories: Category[], threads?: Thread[], category?: Category, breadcrumbs?: Category[], canCreateThreads: boolean } ) {

    const { auth } = usePage<PageProps>().props

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            {
                breadcrumbs?.length
                &&
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
                                <p>Here goes the breadcrumbs</p>
                                <pre>{JSON.stringify(breadcrumbs, null,'  ')}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                categories.length
                &&
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 flex justify-end">
                                { canCreateThreads && <a href={`${route('threads.create')}${category ? `?category=${category.code}` : ""}`}><PrimaryButton>New Thread +</PrimaryButton></a> }
                            </div>
                            <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
                                {
                                    categories.map((category, index) => {
                                        return (
                                            <>
                                                <div className='flex flex-col' key={index}>
                                                    <div className='bg-indigo-50 font-semibold text-indigo-600 p-2 border-b-2 border-indigo-400'><Link href={route('dashboard.category', category.code)}>{category.name}</Link></div>
                                                    <div className='bg-slate-50 py-2 px-4'>
                                                        <p>{category.code}</p>
                                                        <p>Threads: <span>{category.threads_count}</span></p>
                                                        <p>Last Thread: <span>{ category.last_thread ? <Link className='text-indigo-700' href={route('threads.show', category.id)}>{category.last_thread.title}</Link> : "No Threads inside this category"}</span></p>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                threads?.length
                &&
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
                                <p>Here goes category threads</p>
                                <pre>
                                    { JSON.stringify(threads, null, 2) }
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </AuthenticatedLayout>
    );
}
