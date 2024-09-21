import { Category as CategoryType } from "@/types";
import { Link } from "@inertiajs/react";

export default function Category({ category }: { category: CategoryType }) {
    return (
        <>
            <div className="flex flex-col shadow-md rounded-md">
                <div className="bg-blue-900/20 font-semibold text-blue-900 p-2 border-b-2 border-blue-900 rounded-t-md">
                    <Link href={route("dashboard.category", category.code)}>
                        {category.name}
                    </Link>
                </div>
                <div className="bg-slate-50 py-2 px-4 rounded-b-md">
                    <p>{category.code}</p>
                    { category.children_count! > 0 ? <p>Subcategories: <span>{category.children_count}</span></p> : <></> }
                    <p>Threads: <span>{category.threads_count}</span></p>
                    <p>
                        Last Thread:{" "}
                        <span>
                            {category.last_thread ? (
                                <Link
                                    className="text-blue-900"
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
