import { Head, useForm, usePage } from '@inertiajs/react';
import { Category, PageProps, Thread } from '@/types';
import { FormEventHandler } from 'react';
import InputError from '@/Components/Themes/tailwindui/InputError';
import AppLayout from '@/Layouts/Themes/default/AppLayout';
import { Textarea } from '@/Components/Themes/default/ui/textarea';
import { Input } from '@/Components/Themes/default/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/Themes/default/ui/select';
import { Button } from '@/Components/Themes/default/ui/button';
import { Label } from '@/Components/Themes/default/ui/label';

export default function Form({ category, categories, thread, breadcrumbs }: { category?: string, categories: Category[], thread?: Thread, breadcrumbs: Category[] }) {

    const { auth } = usePage<PageProps>().props

    const { data, setData, post, patch, processing, errors } = useForm({
        category: category || thread?.category?.code || '',
        title: thread?.title || '',
        content: thread?.content || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (thread) {
            patch(route('threads.update', { thread: thread.id }));
        }
        else {
            post(route('threads.store'));
        }
    };

    return (
        <AppLayout
            user={auth.user}
            title={thread? `Edit Thread: ${thread.title}` : 'New Thread'}
        >
            <Head title="New Thread" />

            <form onSubmit={submit} className='flex flex-col space-y-6'>
                <div>
                    <Select disabled={thread ? true : false} defaultValue={data.category} onValueChange={(e) => setData('category', e.valueOf())}>
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className='border-none'>
                            {
                                categories.map((category) => {
                                    return (
                                        <SelectItem key={category.id} value={category.code}>{category.name}</SelectItem>
                                    )
                                })
                            }
                        </SelectContent>
                    </Select>
                    {errors.category && <Label className="text-destructive">{errors.category}</Label>}
                </div>

                <div>
                    <Input name='title' value={data.title} onChange={(e) => setData('title', e.currentTarget.value)} />
                    {errors.title && <Label className="text-destructive">{errors.title}</Label>}
                </div>

                <div>
                    <Textarea name='content' rows={6} value={data.content} onChange={(e) => setData('content', e.currentTarget.value)}/>
                    {errors.content && <Label className="text-destructive">{errors.content}</Label>}
                </div>

                <div>
                    <Button disabled={processing}>{thread ? "Save" : "Create"}</Button>
                </div>
            </form>
        </AppLayout>
    );
}
