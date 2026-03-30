import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabasePublicKey) {
    throw new Error(
        'Отсутствуют переменные окружения Supabase. '
    );
}

export const supabase = createClient(supabaseUrl, supabasePublicKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
    realtime: {
        params: {
            eventsPerSecond: 10,
        },
    },
});


export const createServerSupabaseClient = () => {
    return createClient(supabaseUrl, supabasePublicKey, {
        cookies: {}, // в Server Actions можно передавать cookies
        auth: {
            persistSession: false,
        },
    });
};


