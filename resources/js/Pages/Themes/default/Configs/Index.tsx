import { Head, usePage } from '@inertiajs/react';
import { Config, PageProps } from '@/types';
import AppLayout from '@/Layouts/Themes/default/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/Themes/default/ui/tabs';
import { ConfigForm } from './Partials/ConfigForm';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useEffect } from 'react';

export default function Index({ configs }: { configs: Config[] }) {

    const { auth } = usePage<PageProps>().props

    const { breadcrumbs: completeBreadcrumbs, append: appendBreadcrumb, reset: resetBreadcrumb } = useBreadcrumbs()

    useEffect(() => {
        resetBreadcrumb()
        appendBreadcrumb({ label: "Dashboard", url: route('dashboard')})
        appendBreadcrumb({ label: "Configuration"})
    }, [ configs ])

    return (
        <AppLayout
            user={auth.user}
            breadcrumbs={completeBreadcrumbs}
            title='Configurations'
        >
            <Head title="Configurations" />

            <Tabs defaultValue="text">
                <TabsList className='w-full'>
                    <TabsTrigger value="text" className='font-bold w-full'>Text</TabsTrigger>
                    <TabsTrigger value="datetime"  className='font-bold w-full'>Date and Time Formatting</TabsTrigger>
                </TabsList>
                <TabsContent value="text"><ConfigForm configs={configs.filter(config => config.group === 'text')} /></TabsContent>
                <TabsContent value="datetime"><ConfigForm configs={configs.filter(config => config.group === 'datetime')} /></TabsContent>
            </Tabs>

        </AppLayout>
    );
}
