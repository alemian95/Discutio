import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import clsx from 'clsx'

const items = [
    { id: 1, name: "Tom Cook" },
    { id: 2, name: "Wade Cooper" },
    { id: 3, name: "Tanya Fox" },
    { id: 4, name: "Arlene Mccoy" },
    { id: 5, name: "Devon Webb" },
];

export function Select() {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<NoInfer<{ id: number; name: string; }> | null>(items[0]);

    const filtered =
        query === ""
            ? items
            : items.filter((item) => {
                  return item.name.toLowerCase().includes(query.toLowerCase());
              });

    return (
        <Combobox
            value={selected}
            onChange={(value) => setSelected(value)}
            onClose={() => setQuery("")}
        >
            <div className="relative">
                <ComboboxInput
                    className={clsx(
                        "w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                    displayValue={(item : { id: number; name: string; }) => item?.name}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    DOWNICON
                </ComboboxButton>
            </div>

            <ComboboxOptions
                anchor="bottom"
                transition
                className={clsx(
                    "w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                    "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                )}
            >
                {filtered.map((item) => (
                    <ComboboxOption
                        key={item.id}
                        value={item}
                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                    >
                        CHECKICON
                        <div className="text-sm/6 text-white">
                            {item.name}
                        </div>
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    );
}
