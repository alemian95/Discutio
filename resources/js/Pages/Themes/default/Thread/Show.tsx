import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Category, PageProps, Thread } from '@/types';
import React from 'react';
import AnswerForm from '@/Components/Themes/default/ui_components/AnswerForm';

export default function Show( { thread, breadcrumbs, canAnswerThread, canUpdateThread } : { thread: Thread, breadcrumbs: Category[], canAnswerThread: boolean, canUpdateThread: boolean } ) {

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
                                <div className='bg-slate-200 text-sm text-slate-600 flex justify-end'>
                                    <div className='p-2'>{thread.human_created_at}</div>
                                    {
                                        canUpdateThread
                                        &&
                                        <div className='p-2 px-4 border-l-2 border-slate-400'>
                                            <Link className='text-indigo-600' href={route('threads.edit', thread.id)}><b>Edit</b></Link>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 mt-16">
                        <hr />
                        {
                            canAnswerThread
                            &&
                            <>
                                <AnswerForm thread={thread} />
                                <hr />
                            </>
                        }
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
