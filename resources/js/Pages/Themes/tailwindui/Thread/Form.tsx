import AuthenticatedLayout from '@/Layouts/Themes/tailwindui/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Category, PageProps, Thread } from '@/types';
import PrimaryButton from '@/Components/Themes/tailwindui/PrimaryButton';
import TextInput from '@/Components/Themes/tailwindui/TextInput';
import React, { FormEventHandler } from 'react';
import InputError from '@/Components/Themes/tailwindui/InputError';

export default function Form( { category, categories, thread, breadcrumbs } : { category?: string, categories: Category[], thread?: Thread, breadcrumbs: Category[] } ) {

    const { auth } = usePage<PageProps>().props

    const { data, setData, post, patch, processing, errors } = useForm({
        category: category || thread?.category?.code || '',
        title: thread?.title || '',
        content: thread?.content || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (thread) {
            patch(route('threads.update', { thread: thread.id }));
        }
        else {
            post(route('threads.store'));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex flex-row gap-4'>
                    <Link
                        key={0}
                        href={route('dashboard')}
                        className='font-semibold text-blue-900'
                    >
                        <span>Dashboard</span>
                    </Link>
                    {
                        breadcrumbs && breadcrumbs.length &&
                        breadcrumbs.map((category, index) => {
                            return (
                                <React.Fragment key={category.id}>
                                    <span>&raquo;</span>
                                    <Link
                                        href={route('dashboard.category', category.code)}
                                        className='font-semibold text-blue-900'
                                    >
                                        <span>{category.name}</span>
                                    </Link>
                                </React.Fragment>
                            )
                        })
                    }
                    <span>&raquo;</span>
                    {
                        thread
                        ?
                        <>
                            <Link
                                key={breadcrumbs.length}
                                href={route('threads.show', thread.id)}
                                className='font-semibold text-blue-900'
                            >
                                <span>{thread?.title}</span>
                            </Link>
                            <span>&raquo;</span>
                            <div className='font-semibold'>Edit</div>
                        </>
                        :
                        <div className='font-semibold'>New thread</div>
                    }
                </div>
            }
        >
            <Head title="New Thread" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">

                            <form onSubmit={submit} className='flex flex-col space-y-4'>
                                { errors.category && <InputError message={errors.category} className="mt-2" /> }
                                <select className='border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-900 dark:focus:border-blue-900 focus:ring-blue-900 dark:focus:ring-blue-900 rounded-md shadow-sm' value={data.category} onChange={(e) => setData('category', e.currentTarget.value)} disabled={thread ? true : false}>
                                    <option value="">Select Category</option>
                                    {
                                        categories.map(category => {
                                            return (
                                                <option key={category.id} value={category.code}>{category.name}</option>
                                            )
                                        })
                                    }
                                </select>

                                { errors.title && <InputError message={errors.title} className="mt-2" /> }
                                <TextInput name='title' value={data.title} onChange={(e) => setData('title', e.currentTarget.value)} />

                                { errors.content && <InputError message={errors.content} className="mt-2" /> }
                                <textarea name='content' value={data.content} onChange={(e) => setData('content', e.currentTarget.value)}
                                    className='border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-900 dark:focus:border-blue-900 focus:ring-blue-900 dark:focus:ring-blue-900 rounded-md shadow-sm'
                                ></textarea>

                                <div>
                                    <PrimaryButton disabled={processing}>{ thread ? "Save" : "Create" }</PrimaryButton>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
