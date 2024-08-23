import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Category, PageProps } from '@/types';
import { Select } from '@/Components/Themes/default/Select';
import PrimaryButton from '@/Components/Themes/default/PrimaryButton';
import TextInput from '@/Components/Themes/default/TextInput';
import { setDefaultHighWaterMark } from 'stream';
import { FormEventHandler } from 'react';

export default function Form( { categories } : { categories: Category[] } ) {

    const { auth } = usePage<PageProps>().props

    const { data, setData, post, processing, errors, reset } = useForm({
        category: '',
        title: '',
        content: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('threads.store'), {
            onFinish: () => alert('created'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">

                            <div>
                                <pre>
                                    <pre>{JSON.stringify({ data, setData }, null,'   ')}</pre>
                                </pre>
                            </div>

                            <form onSubmit={submit}>
                                <div>
                                    <select onChange={(e) => setData('category', e.currentTarget.value)}>
                                        <option value="">Select Category</option>
                                        {
                                            categories.map(category => {
                                                return (
                                                    <option value={category.code}>{category.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div>
                                    <TextInput onChange={(e) => setData('title', e.currentTarget.value)} />
                                    <textarea  onChange={(e) => setData('content', e.currentTarget.value)} className='rounded-md border border-slate-400'></textarea>
                                </div>

                                <div>
                                    <PrimaryButton disabled={processing}>Inserisci</PrimaryButton>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
