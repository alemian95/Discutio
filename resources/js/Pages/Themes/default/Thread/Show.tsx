import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Category, PageProps, Thread } from '@/types';
import React, { FormEventHandler, useState } from 'react';
import PrimaryButton from '@/Components/Themes/default/PrimaryButton';
import SecondaryButton from '@/Components/Themes/default/SecondaryButton';

export default function Show( { thread, breadcrumbs, canAnswerThread } : { thread: Thread, breadcrumbs: Category[], canAnswerThread: boolean } ) {

    const { auth } = usePage<PageProps>().props

    const [ showAnswerForm, setShowAnswerForm ] = useState(false)

    const { data, setData, post, patch, processing, errors } = useForm({
        content: '',
        thread: thread.id
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('answers.store'));
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

                    <div className="flex flex-col gap-8 mt-16">
                        <hr />
                        {
                            canAnswerThread
                            &&
                            <>
                               <div className="flex flex-row gap-4 justify-end">
                                    {
                                        showAnswerForm
                                        ?
                                        <div className='w-full'>
                                            <pre className='font-mono'>
                                                { JSON.stringify(data, null, 2)}
                                            </pre>
                                            <textarea className='w-full rounded-md border border-slate-400'></textarea>
                                            <div className='flex justify-end gap-2'>
                                                <SecondaryButton className='w-auto' onClick={() => setShowAnswerForm(false)}>Cancel</SecondaryButton>
                                                <PrimaryButton onClick={() => setShowAnswerForm(true)}>Insert</PrimaryButton>
                                            </div>
                                        </div>
                                        :
                                        <PrimaryButton onClick={() => setShowAnswerForm(true)}>Answer</PrimaryButton>
                                    }
                                </div>
                                <hr />
                            </>
                        }
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
