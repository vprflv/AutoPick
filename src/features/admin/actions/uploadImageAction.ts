'use server';



import {createServerSupabaseClient} from "@/src/shared/lib/supabase";

export async function uploadCarImage(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
        const supabase = await createServerSupabaseClient();

        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const filePath = `cars/${fileName}`;

        // Загружаем файл в Storage
        const { error: uploadError } = await supabase.storage
            .from('car-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (uploadError) throw uploadError;

        // Получаем публичную ссылку
        const { data: publicUrlData } = supabase.storage
            .from('car-images')
            .getPublicUrl(filePath);

        return {
            success: true,
            url: publicUrlData.publicUrl,
        };

    } catch (err: any) {
        return {
            success: false,
            error: err.message || 'Не удалось загрузить изображение'
        };
    }
}