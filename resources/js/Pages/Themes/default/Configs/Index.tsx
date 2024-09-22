import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import PrimaryButton from '@/Components/Themes/default/PrimaryButton';

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
                        {
                            configs.map((config, index) => {

                                if (config.options.length > 0) {
                                    return (
                                        <div key={index}>
                                            <label>{config.keyLabel}</label>
                                            <select defaultValue={config.value} name={config.key}>
                                                {
                                                    config.options.map((option) => {
                                                        const key = option.value || option;
                                                        return (
                                                            <option value={option.value}>{option.valueLabel}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    )
                                }

                                if (config.type === 'integer') {
                                    return (
                                        <div key={index}>
                                            <label>{config.keyLabel}</label>
                                            <input type="number" name={config.key} value={config.value} />
                                        </div>
                                    )
                                }

                                if (config.type === 'boolean') {
                                    return (
                                        <div key={index}>
                                            <label>{config.keyLabel}</label>
                                            <input type="checkbox" name={config.key} checked={config.value === "1" ? true : false } />
                                        </div>
                                    )
                                }

                                return (
                                    <div key={index}>
                                        <label>{config.keyLabel}</label>
                                        <input name={config.key} value={config.value}/>
                                    </div>
                                )

                            })
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
