import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/Themes/default/ui/breadcrumb";
import { Breadcrumb as BreadcrumbType } from "@/types";
import { Link } from "@inertiajs/react";
import React from "react";

export function NavigationMenu({ breadcrumbs } : { breadcrumbs?: BreadcrumbType[] }) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs?.map((breadcrumb, index) => {
                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                {breadcrumb.url ? (
                                    <BreadcrumbPage>
                                        <Link href={breadcrumb.url}>{breadcrumb.label}</Link>
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbPage>
                                        {breadcrumb.label}
                                    </BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                            {index === breadcrumbs.length - 1 ? null : (
                                <BreadcrumbSeparator />
                            )}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
