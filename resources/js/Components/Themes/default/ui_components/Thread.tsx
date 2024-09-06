import { Thread as ThreadType } from "@/types";
import { Link } from "@inertiajs/react";

export default function Thread({ thread }: { thread: ThreadType }) {
    return (
        <>
            <div className="flex flex-col shadow-md rounded-md">
                <div
                    className="bg-indigo-100 px-2 font-semibold border-b-2 border-indigo-400 text-indigo-600 rounded-t-md flex justify-between items-center"
                >
                    <div className="p-1">
                        <Link href={route("threads.show", thread.id)}>
                            {thread.title}
                        </Link>
                    </div>
                    <div className="flex text-sm">
                        <div className="border-l-2 border-indigo-400 p-2">Answers: {thread.answers_count} </div>
                        <div className="border-l-2 border-indigo-400 p-2">Author: {thread.author?.name} </div>
                        {/* <span>|</span> */}
                        <div className="border-l-2 border-indigo-400 p-2">{ thread.human_created_at }</div>
                    </div>
                </div>
                <div className="bg-slate-50 py-2 px-4 rounded-b-md text-sm text-slate-600">
                    <p>{ thread.content.length > 100 ? thread.content.slice(0, 100) + "..." : thread.content }</p>
                </div>
            </div>
        </>
    );
}
