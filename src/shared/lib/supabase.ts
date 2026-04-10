
import { createBrowserClient } from '@supabase/ssr';




// ====================== КЛИЕНТСКИЙ КЛИЕНТ ======================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

console.log('=== SUPABASE CLIENT INIT ===');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'OK' : 'MISSING');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ? 'OK' : 'MISSING');
console.log('===========================');

const dummySupabase = {
    from: (table: string) => ({
        select: (columns?: string) => ({
            eq: (column: string, value: any) => ({
                single: () => Promise.resolve({ data: null, error: null }),
            }),
            order: (column: string, options?: any) => ({
                single: () => Promise.resolve({ data: [], error: null }),
            }),
        }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
    }),
};

export const supabase = (!supabaseUrl || !supabaseKey)
    ? dummySupabase
    : createBrowserClient(supabaseUrl, supabaseKey!);

export default supabase;

// ====================== СЕРВЕРНЫЙ КЛИЕНТ (для админки) ======================
export async function createServerSupabaseClient() {
    const { createServerClient } = await import('@supabase/ssr');
    const { cookies } = await import('next/headers');

    const cookieStore = await cookies();

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase server credentials are missing. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY');
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