import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { PropsWithChildren } from "react";

export default function Accordion({
    title,
    children,
}: PropsWithChildren<{ title: string }>) {
    return (
        <Disclosure as="div" className="p-6 bg-slate-100">
            <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 font-medium text-slate-900 group-data-[hover]:text-slate-900/80">
                    {title}
                </span>
                <span>
                    <svg
                        width="24px"
                        height="24px"
                        viewBox="-51.2 -51.2 1126.40 1126.40"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        transform="rotate(0)"
                        stroke="#000000"
                        strokeWidth="102.4"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke="#CCCCCC"
                            strokeWidth="4.096"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                                fill="#000000"
                            ></path>
                        </g>
                    </svg>
                </span>
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5 text-slate-900/50">
                {children}
            </DisclosurePanel>
        </Disclosure>
    );
}
