import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Link } from "@inertiajs/react";
import { ReactNode } from "react";

export function NavLink({ label, url, icon } : { label: string, url: string, icon: ReactNode }) {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger>
                    <Link href={ url }>
                        { icon }
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <span>{ label }</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
