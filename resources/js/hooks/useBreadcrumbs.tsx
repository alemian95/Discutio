import { truncate } from "@/lib/utils";
import { Breadcrumb, PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export function useBreadcrumbs() {

    const { config } = usePage<PageProps>().props

    const [ breadcrumbs, setBreadcrumbs ] = useState<Breadcrumb[]>([])

    const reset = () => {
        setBreadcrumbs([])
    }

    const append = ({ label, url } : { label : string, url? : string }) => {
        const breadcrumb = { label: truncate(label, config.text.cut_breadcrumbs_text_after_n_characters), url }
        setBreadcrumbs((breadcrumbs) => [...breadcrumbs, breadcrumb])
    }

    return { breadcrumbs, append, reset }
}
