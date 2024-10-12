import { Head, usePage } from '@inertiajs/react';
import { Config, PageProps } from '@/types';
import AppLayout from '@/Layouts/Themes/default/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/Themes/default/ui/tabs';
import { ConfigForm } from './Partials/ConfigForm';

export default function Index({ configs }: { configs: Config[] }) {

    const { auth } = usePage<PageProps>().props

    return (
        <AppLayout
            user={auth.user}
            breadcrumbs={[
                { label: 'Dashboard', url: route('dashboard') },
                { label: 'Configurations' },
            ]}
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
