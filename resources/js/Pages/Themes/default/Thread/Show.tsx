import { Head, Link, usePage } from '@inertiajs/react';
import { Answer, Category, PageProps, Thread } from '@/types';
import AppLayout from '@/Layouts/Themes/default/AppLayout';
import AnswerForm from '@/Components/Themes/default/AnswerForm';
import { AnswerCard } from '@/Components/Themes/default/AnswerCard';
import { Button } from '@/Components/Themes/default/ui/button';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useEffect } from 'react';

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

    const { breadcrumbs: completeBreadcrumbs, append: appendBreadcrumb, reset: resetBreadcrumb } = useBreadcrumbs()

    useEffect(() => {
        resetBreadcrumb()
        appendBreadcrumb({ label: "Dashboard", url: route('dashboard')})
        breadcrumbs?.forEach((b) => {
            appendBreadcrumb({ url: route('dashboard.category', b.code), label: b.name })
        })
        appendBreadcrumb({ label: thread.title })
    }, [breadcrumbs])

    return (
        <AppLayout
            user={auth.user}
            useCard={false}
            breadcrumbs={completeBreadcrumbs}
        >
            <Head title={thread.title} />

            <div className="mb-6">
                <Link href={route('dashboard.category', thread.category!.code)}><Button variant='secondary'>&laquo; Back</Button></Link>
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
                            <AnswerCard key={index} answer={answer} />
                        )
                    })
                }
            </div>
        </AppLayout>
    );
}
