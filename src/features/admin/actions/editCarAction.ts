'use server';

import { CreateCarData } from "@/src/shared/types/types";
import {createServerSupabaseClient} from "@/src/shared/lib/supabase";


export async function editCarAction(carId: number, data: CreateCarData) {

    try {
        const supabase = await createServerSupabaseClient();

        const { error: carError } = await supabase
            .from('cars')
            .update({
                brand: data.brand,
                model: data.model,
                year: data.year,
                price: data.price,
                mileage: data.mileage,
                type: data.type,
                fuel: data.fuel,
                transmission: data.transmission,
                updated_at: new Date().toISOString(),
            })
            .eq('id', carId);

        if (carError) {
            return {
                success: false,
                error: carError.message || 'Не удалось обновить данные автомобиля',
            };
        }


        const { error: deleteError } = await supabase
            .from('car_images')
            .delete()
            .eq('car_id', carId);


        // 3. Добавляем новые изображения
        if (data.images && data.images.length > 0) {
            const validImages = data.images.filter(url => url && url.trim() !== '');

            const imageInserts = validImages.map((image_url, index) => ({
                car_id: carId,
                image_url: image_url.trim(),
                sort_order: index,
            }));

            const { error: imagesError } = await supabase
                .from('car_images')
                .insert(imageInserts);

            if (imagesError) {
                return {
                    success: false,
                    error: `Автомобиль обновлён, но фото не сохранились: ${imagesError.message}`,
                };
            }
        }

        return {
            success: true,
            message: 'Автомобиль успешно обновлён!',
        };

    } catch (err: any) {
        return {
            success: false,
            error: err.message || 'Произошла неожиданная ошибка',
        };
    }
}