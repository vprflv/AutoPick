
import { createBrowserClient } from '@supabase/ssr';




// ====================== КЛИЕНТСКИЙ КЛИЕНТ ======================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim();

if(!supabaseUrl || !supabaseKey){
    console.log('нет переменных окружения')
}

export const supabase = createBrowserClient(supabaseUrl, supabaseKey!);

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