import { Answer as AnswerType } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

export default function Answer({ answer } : { answer: AnswerType}) {

    const [ editEnable, setEditEnable ] = useState(false)

    const { data, setData, patch, processing, reset } = useForm({
        content: answer.content,
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('answers.update', { thread: answer.thread_id, answer: answer.id }), {
            onSuccess: () => {
                setEditEnable(false)
                reset('content')
            }
        })
    };

    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className='flex min-h-[200px]'>
                <div className="bg-blue-900/40 text-blue-950 flex justify-center items-center p-4 rounded-l-lg min-w-[160px]">
                    <b>{answer.author?.name}</b>
                </div>
                <div className='flex flex-col justify-between rounded-r-lg w-full'>
                    <div className='p-6 break-normal whitespace-pre'>
                        {
                            editEnable
                            ?
                            <form onSubmit={submit}>
                                <textarea
                                    rows={5}
                                    className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-900 dark:focus:border-blue-900 focus:ring-blue-900 dark:focus:ring-blue-900 rounded-md shadow-sm"
                                    onChange={(e) => setData('content', e.target.value)}
                                >
                                    {data.content}
                                </textarea>
                                <div className='p-2 px-4 space-x-4'>
                                    <span className='text-slate-600 cursor-pointer' onClick={() => setEditEnable(false)}><b>Cancel</b></span>
                                    <button className='text-blue-950 cursor-pointer'><b>Save</b></button>
                                </div>
                            </form>
                            :
                            answer.content
                        }
                    </div>
                    <div className='bg-slate-200 text-sm text-slate-700 flex justify-end'>
                        <div className='p-2'>{answer.human_created_at}</div>
                        {
                            answer.canUpdateAnswer
                            ?
                            (
                                editEnable
                                ?
                                <></>
                                :
                                <div className='p-2 px-4 border-l-2 border-slate-400'>
                                    <span className='text-blue-950 cursor-pointer' onClick={() => setEditEnable(true)}><b>Edit</b></span>
                                </div>
                            )
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
