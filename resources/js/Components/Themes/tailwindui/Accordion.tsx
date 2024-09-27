import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { PropsWithChildren, useState } from "react";

export default function Accordion({
    title,
    children,
}: PropsWithChildren<{ title: string }>) {

    const [ open, setOpen ] = useState(false);

    return (
        <Disclosure as="div" className="bg-slate-50 rounded-md shadow-md">
            <DisclosureButton onClick={() => setOpen(!open)} className="group flex w-full items-center justify-between p-2 bg-blue-50 shadow-sm shadow-blue-100 border-b-2 border-blue-400">
                <span className="text-md font-semibold text-blue-900 group-data-[hover]:text-blue-900/80">
                    {title}
                </span>
                <span className={open ? "transform rotate-90 transition-all" : ""}>
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
            <DisclosurePanel className=" p-4 mt-2 text-md text-slate-900/50">
                {children}
            </DisclosurePanel>
        </Disclosure>
    );
}
