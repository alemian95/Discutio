import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AuthLayout from '@/Layouts/Themes/default/AuthLayout';
import { Button } from '@/Components/Themes/default/ui/button';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-positive">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button disabled={processing}>Resend Verification Email</Button>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-primary"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
