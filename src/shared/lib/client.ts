import {createBrowserClient} from "@supabase/ssr";

export const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY   // ← лучше использовать ANON_KEY
);
