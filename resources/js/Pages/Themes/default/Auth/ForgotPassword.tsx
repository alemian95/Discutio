import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AuthLayout from '@/Layouts/Themes/default/AuthLayout';
import { Input } from '@/Components/Themes/default/ui/input';
import { Button } from '@/Components/Themes/default/ui/button';
import { Label } from '@/Components/Themes/default/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-slate-500">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-positive">{status}</div>}

            <form onSubmit={submit}>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('email', e.target.value)}
                />

                { errors.email && <Label className='mt-2 text-destructive'>{errors.email}</Label> }

                <div className="flex flex-col items-center mt-4">
                    <Button className="ms-4" disabled={processing}>Email Password Reset Link</Button>
                </div>
            </form>
        </AuthLayout>
    );
}
