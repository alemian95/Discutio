import AuthenticatedLayout from '@/Layouts/Themes/tailwindui/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Answer, Category, PageProps, Thread } from '@/types';
import React from 'react';
import AnswerForm from '@/Components/Themes/tailwindui/ui_components/AnswerForm';
import AnswerBox from '@/Components/Themes/tailwindui/ui_components/Answer';
import { truncate } from '@/lib/utils';
import SecondaryButton from '@/Components/Themes/tailwindui/SecondaryButton';

export default function Show(
    { thread, breadcrumbs, canAnswerThread, canUpdateThread, answers }
    :
    {
        thread: Thread,
        breadcrumbs: Category[],
        canAnswerThread: boolean,
        canUpdateThread: boolean,
        answers: Answer[],
    }
) {

    const { auth } = usePage<PageProps>().props

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex flex-row gap-4'>
                    <Link
                        key={0}
                        href={route('dashboard')}
                        className='font-semibold text-blue-950'
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
                                        className='font-semibold text-blue-950'
                                    >
                                        <span>{category.name}</span>
                                    </Link>
                                </React.Fragment>
                            )
                        })
                    }
                    <span>&raquo;</span>
                    <span className='font-semibold'>{truncate(thread.title, 30)}</span>
                </div>
            }
        >
            <Head title={thread.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="mb-6">
                        <Link href={route('dashboard.category', thread.category!.code)}><SecondaryButton>&laquo; Back</SecondaryButton></Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='flex min-h-[200px]'>
                        <div className="bg-blue-950 text-blue-100 flex justify-center items-center p-4 rounded-l-lg min-w-[160px]">
                                <b>{thread.author?.name}</b>
                            </div>
                            <div className='flex flex-col justify-between rounded-r-lg w-full'>
                                <div>
                                    <div className='py-2 px-6 font-semibold text-lg bg-slate-50'>{thread.title}</div>
                                    {/* <hr /> */}
                                    <div className='pb-6 pt-2 px-6 break-normal whitespace-pre'>{thread.content}</div>
                                </div>
                                <div className='bg-slate-200 text-sm text-blue-950 flex justify-end'>
                                    <div className='p-2'>{thread.human_created_at}</div>
                                    {
                                        canUpdateThread
                                        &&
                                        <div className='p-2 px-4 border-l-2 border-slate-400'>
                                            <Link className='text-blue-950' href={route('threads.edit', thread.id)}><b>Edit</b></Link>
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

                    <div className="flex flex-col gap-8 mt-16">
                        {
                            answers.map((answer, index) => {
                                return (
                                    <AnswerBox key={index} answer={answer} />
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
