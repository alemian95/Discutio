import { useRef, FormEventHandler } from 'react';
import InputError from '@/Components/Themes/tailwindui/InputError';
import InputLabel from '@/Components/Themes/tailwindui/InputLabel';
import PrimaryButton from '@/Components/Themes/tailwindui/PrimaryButton';
import TextInput from '@/Components/Themes/tailwindui/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Label } from '@/Components/Themes/default/ui/label';
import { Input } from '@/Components/Themes/default/ui/input';
import { Button } from '@/Components/Themes/default/ui/button';

export default function UpdatePasswordForm({ className = '' }: { className?: string }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Update Password</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <Label htmlFor="current_password">Current Password</Label>

                    <Input
                        id="email"
                        className="mt-1 block w-full"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        required
                    />

                    { errors.current_password && <Label className="mt-2 text-destructive">{errors.current_password}</Label> }
                </div>

                <div>
                    <Label htmlFor="password">New Password</Label>

                    <Input
                        id="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    { errors.password && <Label className="mt-2 text-destructive">{errors.password}</Label> }
                </div>

                <div>
                    <Label htmlFor="password_confirmation">Confirm Password</Label>

                    <Input
                        id="password_confirmation"
                        className="mt-1 block w-full"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    { errors.password_confirmation && <Label className="mt-2 text-destructive">{errors.password_confirmation}</Label> }
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
