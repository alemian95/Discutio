import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Category, PageProps, Thread } from '@/types';
import PrimaryButton from '@/Components/Themes/default/PrimaryButton';
import TextInput from '@/Components/Themes/default/TextInput';
import React, { FormEventHandler } from 'react';

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
                        className='font-semibold text-indigo-600'
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
                                        className='font-semibold text-indigo-600'
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
                        <Link
                            key={breadcrumbs.length}
                            href={route('threads.show', thread.id)}
                            className='font-semibold text-indigo-600'
                        >
                            <span>{thread?.title}</span>
                        </Link>
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

                            <div>
                                <pre>
                                    <pre>{JSON.stringify({ data }, null,'  ')}</pre>
                                    <pre className='text-red-600'>{JSON.stringify({ errors }, null,'  ')}</pre>
                                </pre>
                            </div>

                            <form onSubmit={submit}>
                                <div>
                                    <select value={data.category} onChange={(e) => setData('category', e.currentTarget.value)} disabled={thread ? true : false}>
                                        <option value="">Select Category</option>
                                        {
                                            categories.map(category => {
                                                return (
                                                    <option key={category.id} value={category.code}>{category.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className='flex flex-col'>
                                    <TextInput name='title' value={data.title} onChange={(e) => setData('title', e.currentTarget.value)} />
                                    <textarea name='content' value={data.content} onChange={(e) => setData('content', e.currentTarget.value)} className='rounded-md border border-slate-400'></textarea>
                                </div>

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
