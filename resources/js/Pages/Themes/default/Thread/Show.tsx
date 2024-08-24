import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps, Thread } from '@/types';

export default function Show( { thread } : { thread: Thread } ) {

    const { auth } = usePage<PageProps>().props

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Thread</h2>}
        >
            <Head title="Thread" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">

                            <div>
                                <pre>{JSON.stringify(thread, null, 2)}</pre>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
