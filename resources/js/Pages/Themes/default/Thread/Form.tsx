import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Category, PageProps, Thread } from '@/types';
import PrimaryButton from '@/Components/Themes/default/PrimaryButton';
import TextInput from '@/Components/Themes/default/TextInput';
import { FormEventHandler } from 'react';

export default function Form( { categories, thread } : { categories: Category[], thread?: Thread } ) {

    const { auth } = usePage<PageProps>().props

    const { data, setData, post, patch, processing, errors } = useForm({
        category: thread?.category?.code || '',
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
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">New Thread</h2>}
        >
            <Head title="New Thread" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">

                            <div>
                                <pre>
                                    <pre>{JSON.stringify({ data }, null,'  ')}</pre>
                                    <pre>{JSON.stringify({ errors }, null,'  ')}</pre>
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
                                    <TextInput value={data.title} onChange={(e) => setData('title', e.currentTarget.value)} />
                                    <textarea value={data.content} onChange={(e) => setData('content', e.currentTarget.value)} className='rounded-md border border-slate-400'></textarea>
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
