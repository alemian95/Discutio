"use client"

import { FormEventHandler, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import { useForm } from "@inertiajs/react";
import { Answer, Thread } from "@/types";
import InputError from "../InputError";

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
                                { errors.content && <InputError message={errors.content} className="mt-2" /> }
                                <textarea name='content' value={data.content} onChange={(e) => setData('content', e.currentTarget.value)} className='w-full rounded-md border border-slate-400'></textarea>
                                <div className='flex justify-end gap-2'>
                                    <SecondaryButton className='w-auto' onClick={() => setShowAnswerForm(false)}>Cancel</SecondaryButton>
                                    <PrimaryButton onClick={() => setShowAnswerForm(true)}>Insert</PrimaryButton>
                                </div>
                            </div>
                        </form>
                        :
                        <PrimaryButton onClick={() => setShowAnswerForm(true)}>Answer</PrimaryButton>
                }
            </div>
        </>
    )
}
