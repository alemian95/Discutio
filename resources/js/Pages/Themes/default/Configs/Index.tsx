import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import PrimaryButton from '@/Components/Themes/default/PrimaryButton';
import { FormEventHandler } from 'react';
import Checkbox from '@/Components/Themes/default/Checkbox';
import TextInput from '@/Components/Themes/default/TextInput';
import { Transition } from '@headlessui/react';

type Config = {
    id: number
    created_at: string
    updated_at: string
    group: string
    key: string
    value: string
    type: string
    keyLabel: string
    options: Option[]
}

type Option = {
    id: number
    created_at: string
    updated_at: string
    config_id: number
    value: string
    valueLabel: string
}

export default function Index({ configs } : { configs : Config[] }) {

    const { auth } = usePage<PageProps>().props

    const initialValues : any = {}

    configs.forEach(config => {
        if (config.type === 'boolean') {
            initialValues[config.key] = config.value === '0' ? false : true
        }
        else {
            initialValues[config.key] = config.value
        }
    })

    const { data, setData, post, processing, recentlySuccessful } = useForm(initialValues)

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('configs.update.all'), data)
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className='flex flex-row gap-4'>
                        <Link
                            key={0}
                            href={route('dashboard')}
                            className='font-semibold text-blue-950'
                        >
                            <span>Dashboard</span>
                        </Link>
                        <span>&raquo;</span>
                        <span className='font-semibold'>Configurations</span>
                    </div>
                </>
            }
        >
            <Head title="Configurations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

                        <form onSubmit={submit}>
                            <table className='w-full'>
                                <thead className='w-full'>
                                    <tr className='w-full'>
                                        <th className='w-1/2'>
                                            Configuration
                                        </th>
                                        <th className='w-1/2'>
                                            Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='w-full'>
                                {
                                    configs.map((config, index) => {

                                        return (
                                            <tr key={index} className='w-full'>
                                                <td className='w-1/2'>{config.keyLabel}</td>
                                                <td className='w-1/2'>
                                                {

                                                    config.options.length > 0
                                                    ?
                                                    (
                                                        <select className='border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-900 dark:focus:border-blue-900 focus:ring-blue-900 dark:focus:ring-blue-900 rounded-md shadow-sm' defaultValue={data[config.key]} name={config.key} onChange={(e) => setData(config.key, e.currentTarget.value)}>
                                                            {
                                                                config.options.map((option) => {
                                                                    return (
                                                                        <option key={option.id} value={option.value}>{option.valueLabel}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    )
                                                    :
                                                    config.type === 'integer'
                                                    ?
                                                    <TextInput type="number" name={config.key} value={data[config.key]} onChange={(e) => setData(config.key, e.currentTarget.value)} />
                                                    :
                                                    config.type === 'boolean'
                                                    ?
                                                    <Checkbox type="checkbox" name={config.key} checked={data[config.key]} onChange={(e) => setData(config.key, e.currentTarget.checked)} />
                                                    :
                                                    <TextInput name={config.key} value={data[config.key]} onChange={(e) => setData(config.key, e.currentTarget.value)} />
                                                }
                                                </td>
                                            </tr>
                                        )

                                    })
                                }
                                </tbody>
                            </table>

                            <div className="flex justify-end">
                                <PrimaryButton>Save</PrimaryButton>
                            </div>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out duration-5000"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out duration-1000"
                                leaveTo="opacity-0"
                            >
                                <div className="w-full rounded-lg bg-green-700 text-white p-4 my-4 font-semibold">Configuration saved successfully</div>
                            </Transition>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
