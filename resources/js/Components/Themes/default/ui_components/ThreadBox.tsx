import { Thread } from "@/types";
import { Link } from "@inertiajs/react";

export function ThreadBox({ thread }: { thread: Thread }) {
    return (
        <>
            <div className="flex flex-col">
                <div className="bg-indigo-50 font-semibold text-indigo-600 p-2 border-b-2 border-indigo-400 rounded-t-md">
                    <Link href={route("threads.show", thread.id)}>
                        {thread.title}
                    </Link>
                </div>
                <div className="bg-slate-50 py-2 px-4 rounded-b-md">
                    <p>{thread.content?.slice(0, 100)}</p>
                </div>
            </div>
        </>
    );
}
