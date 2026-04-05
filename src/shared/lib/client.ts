import {createBrowserClient} from "@supabase/ssr";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        'Отсутствуют переменные окружения Supabase. ' +
        'Проверьте NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY'
    );
}

export const client = createBrowserClient(
    supabaseUrl,
    supabaseKey
);