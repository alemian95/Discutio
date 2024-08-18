import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Category, PageProps } from '@/types';
import { useEffect, useState } from 'react';
import Accordion from '@/Components/Themes/default/Accordion';
import axios from 'axios';

export default function Dashboard( { categories } : { categories: Category[] } ) {

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
                        {/* <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div> */}
                        {/* <div className="p-6 text-gray-900 dark:text-gray-100">
                            <pre>
                                { JSON.stringify(categories, null, 2) }
                            </pre>
                        </div> */}
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {
                                categories.map((category, index) => {
                                    return (
                                        <Accordion key={index} title={category.name}>
                                            <p>{category.code}</p>
                                            <p>Threads: <span>{category.threads?.length}</span></p>
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
