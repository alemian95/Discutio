import { Head, Link, usePage } from '@inertiajs/react';
import { Breadcrumb, Category, PageProps, Thread } from '@/types';
import AppLayout from '@/Layouts/Themes/default/AppLayout';
import { Button } from '@/Components/Themes/default/ui/button';
import CategoryCard from '@/Components/Themes/default/CategoryCard';
import ThreadCard from '@/Components/Themes/default/ThreadCard';

export default function Dashboard(
    { categories, threads, category, breadcrumbs, canCreateThreads }
    :
    { categories: Category[], threads?: Thread[], category?: Category, breadcrumbs?: Category[], canCreateThreads: boolean }
) {

    const { auth } = usePage<PageProps>().props

    const completeBreadcrumbs: Breadcrumb[] = []

    completeBreadcrumbs.push({
        url: route('dashboard'),
        label: "Dashboard"
    })
    breadcrumbs?.forEach((b) => {
        completeBreadcrumbs.push({
            url: route('dashboard.category', b.code),
            label: b.name
        })
    })

    return (
        <AppLayout
            user={auth.user}
            breadcrumbs={completeBreadcrumbs}
            title={category? category.name : "Dashboard"}
        >
            <Head title={category?.name || "Dashboard"} />

            <div className="flex justify-between gap-6 mt-6">
                <div>
                    {
                        category
                        &&
                        breadcrumbs
                        &&
                        (
                            <Link href={breadcrumbs.length >= 2 ? route('dashboard.category', breadcrumbs[breadcrumbs.length - 2].code) : route('dashboard')}><Button variant={'secondary'}>&laquo; Back</Button></Link>
                        )
                    }
                </div>
                <div>
                    {canCreateThreads && <a href={`${route('threads.create')}${category ? `?category=${category.code}` : ""}`}><Button>New Thread</Button></a>}
                </div>
            </div>

            {
                (categories && categories.length)
                    ?
                    <div className="flex flex-col gap-4 mt-12">
                        {
                            categories.map((category, index) => {
                                return (
                                    <CategoryCard category={category} key={index} />
                                )
                            })
                        }
                    </div>
                    :
                    <></>
            }

            {
                (threads && threads.length)
                    ?
                    <div className="flex flex-col gap-4 mt-16">
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
                        No threads for this category
                    </div>
                    :
                    <></>
            }

        </AppLayout>
    );
}
