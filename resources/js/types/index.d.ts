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
    children_count?: number;
    threads?: Thread[];
    threads_count?: number;
    last_thread?: Thread | null;
}

export interface Thread {
    id: number;
    title: string;
    content: string;
    category_id?: number;
    author_id?: number;
    category?: Category;
    created_at?: string;
    updated_at?: string;
    author?: User;
    human_created_at?: string;
    answers?: Answer[];
    answers_count?: number;
}

export interface Answer {
    id: number;
    content?: string;
    thread_id?: number;
    author_id?: number;
    created_at?: string;
    updated_at?: string;
    thread?: Thread;
    author?: User;
    human_created_at?: string;
    canUpdateAnswer?: boolean;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        canViewConfigs: boolean;
    };
    ziggy: Config & { location: string };
};
