import { Head, usePage } from '@inertiajs/react';
import { PageProps, Thread } from '@/types';
import AppLayout from '@/Layouts/Themes/default/AppLayout';
import ThreadCard from '@/Components/Themes/default/ThreadCard';

export default function Search(
    { threads, query }
    :
    {threads: Thread[], query: string }
) {

    const { auth } = usePage<PageProps>().props

    return (
        <AppLayout
            user={auth.user}
            breadcrumbs={[{ label: "Dashboard", url: route('dashboard') }, { label: "Search" }]}
            title={`Search results for: ${query}`}
            useCard={false}
            defaultSearchQuery={query}
        >
            <Head title={`Search results for: ${query}`} />

            <h2 className='mt-12 text-lg font-semibold'>Search results for: "{query}"</h2>

            {
                (threads && threads.length)
                    ?
                    <div className="flex flex-col gap-4 mt-8">
                        {
                            threads.map((thread, index) => {
                                return (
                                    <ThreadCard thread={thread} key={index} />
                                )
                            })
                        }
                    </div>
                    :
                    <></>
            }

            {
                (threads && threads.length == 0)
                    ?
                    <div className="p-6 flex flex-col gap-4 mt-12">
                        No results
                    </div>
                    :
                    <></>
            }

        </AppLayout>
    );
}
