// src/shared/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim();

const dummySupabase = {
    from: () => ({
        select: () => ({
            eq: () => ({
                single: () => Promise.resolve({ data: null, error: null })
            }),
            order: () => ({
                single: () => Promise.resolve({ data: [], error: null })
            })
        }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
    }),
};

const client = (!supabaseUrl || !supabaseKey)
    ? dummySupabase
    : createBrowserClient(supabaseUrl, supabaseKey);

export const supabase = client;
export default supabase;