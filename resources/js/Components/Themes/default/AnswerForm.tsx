"use client"

import { FormEventHandler, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Answer, Thread } from "@/types";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function AnswerForm({ thread, answer } : { thread: Thread, answer?: Answer }) {

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        content: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('answers.store', { thread }), {
            onSuccess: () => {
                reset()
                setShowAnswerForm(false)
            }
        })
    };

    const [ showAnswerForm, setShowAnswerForm ] = useState(false)

    return (
        <>
            <div className="flex flex-row justify-end gap-4">
                {
                    showAnswerForm && ! answer
                        ?
                        <form onSubmit={submit} className="w-full">
                            <div className='w-full'>
                                { errors.content && <Label className="mt-2 text-destructive">{errors.content}</Label> }
                                <Textarea name='content' value={data.content} className="bg-white border-none" onChange={(e) => setData('content', e.currentTarget.value)} />
                                <div className='flex justify-end gap-2 mt-2'>
                                    <Button variant='ghost' className='w-auto' onClick={() => setShowAnswerForm(false)}>Cancel</Button>
                                    <Button onClick={() => setShowAnswerForm(true)}>Insert</Button>
                                </div>
                            </div>
                        </form>
                        :
                        <Button onClick={() => setShowAnswerForm(true)}>Answer</Button>
                }
            </div>
        </>
    )
}
