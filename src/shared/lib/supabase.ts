// src/shared/lib/supabase.ts

// ====================== КЛИЕНТСКИЙ КЛИЕНТ (для браузера) ======================
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim();

const dummyClient = {
    from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
    }),
};

export const supabase = (!supabaseUrl || !supabaseKey)
    ? dummyClient
    : createBrowserClient(supabaseUrl, supabaseKey);

export default supabase;

// ====================== СЕРВЕРНЫЙ КЛИЕНТ (только для Server Actions) ======================
export async function createServerSupabaseClient() {
    const { createServerClient } = await import('@supabase/ssr');
    const { cookies } = await import('next/headers');

    const cookieStore = await cookies();

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase server credentials are missing');
    }

    return createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options);
                    });
                } catch (err) {
                    console.error('Failed to set cookie:', err);
                }
            },
        },
    });
}