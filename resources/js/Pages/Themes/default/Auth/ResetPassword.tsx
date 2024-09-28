import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/Themes/tailwindui/GuestLayout';
import InputError from '@/Components/Themes/tailwindui/InputError';
import InputLabel from '@/Components/Themes/tailwindui/InputLabel';
import PrimaryButton from '@/Components/Themes/tailwindui/PrimaryButton';
import TextInput from '@/Components/Themes/tailwindui/TextInput';
import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/Themes/default/AuthLayout';
import { Button } from '@/Components/Themes/default/ui/button';
import { Input } from '@/Components/Themes/default/ui/input';
import { Label } from '@/Components/Themes/default/ui/label';

export default function ResetPassword({ token, email }: { token: string, email: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        readOnly={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    {errors.email && <Label className="mt-2 text-destructive">{errors.email}</Label>}
                </div>

                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    {errors.password && <Label className="mt-2 text-destructive">{errors.password}</Label>}
                </div>

                <div className="mt-4">
                    <Label htmlFor="password_confirmation">Confirm Password</Label>

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />

                    {errors.password_confirmation && <Label className="mt-2 text-destructive">{errors.password_confirmation}</Label>}
                </div>

                <div className="flex flex-col items-center mt-4">
                    <Button className="ms-4" disabled={processing}>Reset Password</Button>
                </div>
            </form>
        </AuthLayout>
    );
}
