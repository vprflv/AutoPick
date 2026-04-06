// src/shared/lib/supabase.ts
console.warn('Supabase client disabled for build safety');

const dummyClient = {
    from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
    }),
};

export const supabase = dummyClient as any;
export default supabase;