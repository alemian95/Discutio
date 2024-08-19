import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Category {
    id: number;
    code: string;
    name: string;
    parent?: Category;
    children?: Category[];
    threads?: Thread[];
    threads_count?: number;
}

export interface Thread {
    id: number;
    title?: string;
    content?: string;
    category_id?: number | null;
    category?: Category;
    created_at?: string;
    updated_at?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
