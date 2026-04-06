// src/shared/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr';
import { cookies } from 'next/headers'; // для серверного клиента

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim();

// ====================== КЛИЕНТСКИЙ КЛИЕНТ ======================
let supabase: any;

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase URL or Key is missing. Using dummy client.');
    supabase = {
        from: () => ({
            select: () => Promise.resolve({ data: [], error: null }),
            insert: () => Promise.resolve({ data: null, error: null }),
            update: () => Promise.resolve({ data: null, error: null }),
            delete: () => Promise.resolve({ data: null, error: null }),
        }),
    };
} else {
    supabase = createBrowserClient(supabaseUrl, supabaseKey);
}

export { supabase };
export default supabase;

// ====================== СЕРВЕРНЫЙ КЛИЕНТ ======================
export async function createServerSupabaseClient() {
    const { createServerClient } = await import('@supabase/ssr');
    const cookieStore = await cookies();

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase server client: URL or Key is missing');
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
                    console.error('Cookie set error:', err);
                }
            },
        },
    });
}