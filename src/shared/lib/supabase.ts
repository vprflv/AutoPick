// src/shared/lib/supabase.ts

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || supabaseUrl.trim() === '') {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL is missing or empty in build time');
    throw new Error(
        'NEXT_PUBLIC_SUPABASE_URL is required. ' +
        'Please check your Railway Variables or .env.local file.'
    );
}

if (!supabaseKey || supabaseKey.trim() === '') {
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