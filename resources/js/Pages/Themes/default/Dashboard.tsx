import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Category, PageProps } from '@/types';
import Accordion from '@/Components/Themes/default/Accordion';
import PrimaryButton from '@/Components/Themes/default/PrimaryButton';

export default function Dashboard( { categories, canCreateThreads } : { categories: Category[], canCreateThreads: boolean } ) {

    const { auth } = usePage<PageProps>().props

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 flex justify-end">
                            { canCreateThreads && <a href={route('threads.create')}><PrimaryButton>New Thread +</PrimaryButton></a> }
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
                            {
                                categories.map((category, index) => {
                                    return (
                                        <Accordion key={index} title={category.name}>
                                            <p>{category.code}</p>
                                            <p>Threads: <span>{category.threads_count}</span></p>
                                        </Accordion>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
