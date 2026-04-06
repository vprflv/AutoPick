// src/shared/lib/supabase.ts

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        'Missing Supabase environment variables. ' +
        'Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY'
    );
}



// ==================== КЛИЕНТСКИЙ КЛИЕНТ ====================
// Используется в компонентах с 'use client'
export const supabase = createBrowserClient(supabaseUrl, supabaseKey)
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