import { truncate } from "@/lib/utils";
import { Thread as ThreadType } from "@/types";
import { Link } from "@inertiajs/react";

export default function Thread({ thread }: { thread: ThreadType }) {
    return (
        <>
            <div className="flex flex-col shadow-md rounded-md">
                <div
                    className="bg-indigo-100 px-2 font-semibold border-b-2 border-indigo-400 text-indigo-600 rounded-t-md flex flex-col lg:flex-row lg:justify-between lg:items-center"
                >
                    <div className="p-4 lg:p-2 text-xl lg:text-base">
                        <Link href={route("threads.show", thread.id)}>
                            {truncate(thread.title, 30)}
                        </Link>
                    </div>
                    <div className="flex flex-col lg:flex-row text-md lg:text-sm">
                        <div className="border-indigo-400 p-2 lg:w-32 text-end">Answers: {thread.answers_count}</div>
                        <div className="border-indigo-400 p-2 lg:w-40 text-end">Author: {thread.author?.name}</div>
                        <div className="border-indigo-400 p-2 lg:w-48 text-end">{ thread.human_created_at }</div>
                    </div>
                </div>
                <div className="bg-slate-50 py-6 lg:py-2 px-4 rounded-b-md text-sm text-slate-600">
                    <p>{ thread.content.length > 100 ? thread.content.slice(0, 100) + "..." : thread.content }</p>
                </div>
            </div>
        </>
    );
}
