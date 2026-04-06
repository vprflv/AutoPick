// src/shared/lib/supabase.ts

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || supabaseUrl.trim() === '') {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL is missing or empty');
    // В dev-режиме кидаем ошибку, в production возвращаем заглушку, чтобы билд прошёл
    if (process.env.NODE_ENV === 'production') {
        console.warn('Running in production without Supabase URL - using dummy client');
        // Заглушка, чтобы билд не падал
        export const supabase = {
            from: () => ({ select: () => ({ data: [], error: null }) }),
        } as any;
        export default supabase;
        // eslint-disable-next-line no-restricted-exports
        export { supabase };
    } else {
        throw new Error('NEXT_PUBLIC_SUPABASE_URL is required. Check your .env.local and Railway Variables.');
    }
} else if (!supabaseKey || supabaseKey.trim() === '') {
    throw new Error('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY is required.');
}



// ==================== КЛИЕНТСКИЙ КЛИЕНТ ====================
// Используется в компонентах с 'use client'
export const supabase = createBrowserClient(supabaseUrl!, supabaseKey!);
// ==================== СЕРВЕРНЫЙ КЛИЕНТ ====================




export async function createServerSupabaseClient() {
    const { createServerClient } = await import('@supabase/ssr');
    const { cookies } = await import('next/headers');


    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options);
                        });
                    } catch {
                        // Игнорируем ошибки
                    }
                },
            },
        }
    );
}