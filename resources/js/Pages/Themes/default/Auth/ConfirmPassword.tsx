import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/Themes/tailwindui/GuestLayout';
import InputError from '@/Components/Themes/tailwindui/InputError';
import InputLabel from '@/Components/Themes/tailwindui/InputLabel';
import PrimaryButton from '@/Components/Themes/tailwindui/PrimaryButton';
import TextInput from '@/Components/Themes/tailwindui/TextInput';
import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/Themes/default/AuthLayout';
import { Label } from '@/Components/Themes/default/ui/label';
import { Input } from '@/Components/Themes/default/ui/input';
import { Button } from '@/Components/Themes/default/ui/button';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-slate-500">
                This is a secure area of the application. Please confirm your password before continuing.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    { errors.password && <Label className='mt-2 text-destructive'>{errors.password}</Label> }
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ms-4" disabled={processing}>Confirm</Button>
                </div>
            </form>
        </AuthLayout>
    );
}
