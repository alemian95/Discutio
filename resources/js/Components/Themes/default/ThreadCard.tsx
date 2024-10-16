import { truncate } from "@/lib/utils";
import { PageProps, Thread as ThreadType } from "@/types";
import { Link, usePage } from "@inertiajs/react";

export default function ThreadCard({ thread }: { thread: ThreadType }) {

    const {config} = usePage<PageProps>().props

    return (
        <>
            <div className="flex flex-col shadow-md md:rounded-md">
                <div
                    className="bg-slate-300 px-2 font-semibold border-b-2 border-primary text-primary md:rounded-t-md flex flex-row justify-between items-end lg:items-center"
                >
                    <div className="p-4 lg:p-1 text-xl lg:text-base">
                        <Link href={route("threads.show", thread.id)}>
                            {truncate(thread.title, 20)}
                        </Link>
                        <span className="block lg:inline">
                            <span className="text-xs lg:ml-4"> from </span><span className="text-sm">{thread.author?.name}</span>
                        </span>
                    </div>
                    <div className="flex flex-col lg:flex-row text-sm">
                        <div className="p-1 lg:w-32 text-end">{thread.answers_count} answers</div>
                        <div className="p-1 lg:w-72 text-end">{ thread.human_created_at }</div>
                    </div>
                </div>
                <div className="bg-white py-6 lg:py-2 px-4 md:rounded-b-md text-sm text-slate-600">
                    <p>{ truncate(thread.content, config.text.cut_thread_preview_text_after_n_characters) }</p>
                </div>
            </div>
        </>
    );
}
