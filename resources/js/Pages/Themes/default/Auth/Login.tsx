import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/Themes/default/AuthLayout';
import { Label } from '@/Components/Themes/default/ui/label';
import { Input } from '@/Components/Themes/default/ui/input';
import { Checkbox } from '@/Components/Themes/default/ui/checkbox';
import { Button } from '@/Components/Themes/default/ui/button';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

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
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    { errors.email && <Label className="mt-2 text-destructive">{errors.email}</Label> }
                </div>

                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    { errors.password && <Label className="mt-2 text-destructive">{errors.password}</Label> }
                </div>

                <div className="block mt-4">
                    <Label className="flex items-center gap-2">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onCheckedChange={(e) => setData('remember', e.valueOf() as boolean)}
                        />
                        <span>Remember me</span>
                    </Label>
                </div>

                <div className="flex flex-col gap-4 items-center mt-4">

                    <Button className="ms-4" disabled={processing}>
                        Log in
                    </Button>

                    {
                        canResetPassword
                        &&
                        <Link href={route('password.request')} className='text-sm text-primary'>Forgot your password?</Link>
                    }

                    <Link href={route('register')} className='text-sm text-primary'>Don't have an account?</Link>

                </div>
            </form>
        </AuthLayout>
    );
}
