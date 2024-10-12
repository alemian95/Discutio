import { Button } from "@/Components/Themes/default/ui/button";
import { Checkbox } from "@/Components/Themes/default/ui/checkbox";
import { Input } from "@/Components/Themes/default/ui/input";
import { Label } from "@/Components/Themes/default/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/Themes/default/ui/select";
import { Config } from "@/types";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export function ConfigForm({ configs }: { configs: Config[] }) {

    const initialValues: any = {}

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
                                    <td className='w-1/2'><Label>{config.keyLabel}</Label></td>
                                    <td className='w-1/2'>
                                        {

                                            config.options.length > 0
                                            ?
                                            (
                                                <Select defaultValue={data[config.key]} onValueChange={(e) => setData(config.key, e.valueOf())}>
                                                    <SelectTrigger className='w-auto'>
                                                        <SelectValue placeholder="Select value" />
                                                    </SelectTrigger>
                                                    <SelectContent className='border-none'>
                                                        {
                                                            config.options.map((option) => {
                                                                return (
                                                                    <SelectItem key={option.id} value={option.value}>{option.valueLabel}</SelectItem>
                                                                )
                                                            })
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            )
                                            :
                                            config.type === 'integer'
                                                ?
                                                <Input className='w-auto' type="number" name={config.key} value={data[config.key]} onChange={(e) => setData(config.key, e.currentTarget.value)} />
                                                :
                                                config.type === 'boolean'
                                                    ?
                                                    <Checkbox name={config.key} checked={data[config.key]} onCheckedChange={(e) => setData(config.key, e.valueOf())} />
                                                    :
                                                    <Input className='w-auto' name={config.key} value={data[config.key]} onChange={(e) => setData(config.key, e.currentTarget.value)} />
                                        }
                                    </td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>

            <div className="flex justify-end">
                <Button>Save</Button>
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
    )
}
