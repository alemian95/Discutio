import { Category as CategoryType } from "@/types";
import { Link } from "@inertiajs/react";

export default function CategoryCard({ category }: { category: CategoryType }) {
    return (
        <>
            <div className="flex flex-col shadow-md rounded-md">
                <div className="bg-slate-300 text-primary font-semibold p-2 border-b-2 border-primary rounded-t-md">
                    <Link href={route("dashboard.category", category.code)}>
                        {category.name}
                    </Link>
                </div>
                <div className="bg-white py-2 px-4 rounded-b-md">
                    <div className="flex gap-6">
                        <p>Threads: <span className="font-bold">{category.threads_count}</span></p>
                        { category.children_count! > 0 ? <p>Subcategories: <span className="font-bold">{category.children_count}</span></p> : <></> }
                    </div>
                    <p className="mt-1">
                        Last Thread:{" "}
                        <span>
                            {category.last_thread ? (
                                <Link
                                    className="text-primary font-semibold"
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
