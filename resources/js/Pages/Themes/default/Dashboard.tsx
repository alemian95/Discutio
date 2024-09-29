import { Head, Link, usePage } from '@inertiajs/react';
import { Breadcrumb, Category, PageProps, Thread } from '@/types';
import CategoryBox from '@/Components/Themes/tailwindui/ui_components/Category';
import ThreadBox from '@/Components/Themes/tailwindui/ui_components/Thread';
import SecondaryButton from '@/Components/Themes/tailwindui/SecondaryButton';
import AppLayout from '@/Layouts/Themes/default/AppLayout';
import { Button } from '@/Components/Themes/default/ui/button';

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
                            <Link href={breadcrumbs.length >= 2 ? route('dashboard.category', breadcrumbs[breadcrumbs.length - 2].code) : route('dashboard')}><SecondaryButton>&laquo; Back</SecondaryButton></Link>
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
                                    <CategoryBox category={category} key={index} />
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
                                    <ThreadBox thread={thread} key={index} />
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
