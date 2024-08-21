import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Category, PageProps } from '@/types';
import Accordion from '@/Components/Themes/default/Accordion';
import PrimaryButton from '@/Components/Themes/default/PrimaryButton';
import Dropdown from '@/Components/Themes/default/Dropdown';
import { Select } from '@/Components/Themes/default/Select';

export default function Form( { categories } : { categories: Category[] } ) {

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

                            <Select />

                            <textarea className='rounded-md border border-slate-400'></textarea>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
