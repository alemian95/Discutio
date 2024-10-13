import { useRef, useState, FormEventHandler } from 'react';
import DangerButton from '@/Components/Themes/tailwindui/DangerButton';
import InputError from '@/Components/Themes/tailwindui/InputError';
import InputLabel from '@/Components/Themes/tailwindui/InputLabel';
import Modal from '@/Components/Themes/tailwindui/Modal';
import SecondaryButton from '@/Components/Themes/tailwindui/SecondaryButton';
import TextInput from '@/Components/Themes/tailwindui/TextInput';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/Themes/default/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/Themes/default/ui/alert-dialog';
import { Label } from '@/Components/Themes/default/ui/label';
import { Input } from '@/Components/Themes/default/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/Themes/default/ui/dialog';

export default function DeleteUserForm({ className = '' }: { className?: string }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => {
                passwordInput.current?.focus()
                setOpen(true)
            },
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    const [ open, setOpen ] = useState(false)

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Delete Account</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before
                    deleting your account, please download any data or information that you wish to retain.
                </p>
            </header>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild><Button type='button' variant='destructive' onClick={() => reset()}>Delete Account</Button></AlertDialogTrigger>
                <AlertDialogContent>
                    <form onSubmit={deleteUser} className="py-6">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Once your account is deleted, all of its resources and data will be permanently deleted. Please
                                enter your password to confirm you would like to permanently delete your account.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="mt-6">
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-3/4"
                                autoFocus={true}
                                placeholder="Password"
                            />

                            { errors.password && <Label className="mt-2 text-destructive">{errors.password}</Label> }
                        </div>
                        <AlertDialogFooter className='mt-4'>
                            <AlertDialogCancel type='button' onClick={() => reset()}>Cancel</AlertDialogCancel>
                            <AlertDialogAction type='submit'>Continue</AlertDialogAction>
                            {/* <Button type='submit'>Continue</Button> */}
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>


                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
            </Modal>
        </section>
    );
}
