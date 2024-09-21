import { Answer as AnswerType } from "@/types";
import { Link } from "@inertiajs/react";

export default function Answer({ answer } : { answer: AnswerType}) {
    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className='flex min-h-[200px]'>
                <div className="bg-blue-300 text-blue-900 flex justify-center items-center p-4 rounded-l-lg min-w-[160px]">
                    <b>{answer.author?.name}</b>
                </div>
                <div className='flex flex-col justify-between rounded-r-lg w-full'>
                    <div className='p-6 break-normal whitespace-pre'>{answer.content}</div>
                    <div className='bg-slate-200 text-sm text-slate-600 flex justify-end'>
                        <div className='p-2'>{answer.human_created_at}</div>
                        {
                            answer.canUpdateAnswer
                            &&
                            <div className='p-2 px-4 border-l-2 border-slate-400'>
                                <Link className='text-blue-900' href={route('threads.edit', answer.id)}><b>Edit</b></Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
