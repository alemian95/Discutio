import { Category } from "@/types";
import { Link } from "@inertiajs/react";

export function CategoryBox({ category }: { category: Category }) {
    return (
        <>
            <div className="flex flex-col">
                <div className="bg-indigo-50 font-semibold text-indigo-600 p-2 border-b-2 border-indigo-400 rounded-t-md">
                    <Link href={route("dashboard.category", category.code)}>
                        {category.name}
                    </Link>
                </div>
                <div className="bg-slate-50 py-2 px-4 rounded-b-md">
                    <p>{category.code}</p>
                    <p>
                        Threads: <span>{category.threads_count}</span>
                    </p>
                    <p>
                        Last Thread:{" "}
                        <span>
                            {category.last_thread ? (
                                <Link
                                    className="text-indigo-700"
                                    href={route(
                                        "threads.show",
                                        category.last_thread.id
                                    )}
                                >
                                    {category.last_thread.title}
                                </Link>
                            ) : (
                                "No Threads inside this category"
                            )}
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}
