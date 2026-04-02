'use server'

import {CreateCarData} from "@/src/shared/types/types";
import {createServerSupabaseClient} from "@/src/shared/lib/supabse";

export async function addCarAction(data: CreateCarData) {
    try {
        const supabase = await createServerSupabaseClient();

        // Создаём автомобиль
        const { data: newCar, error: carError } = await supabase
            .from('cars')
            .insert({
                brand: data.brand,
                model: data.model,
                year: data.year,
                price: data.price,
                mileage: data.mileage,
                type: data.type,
                fuel: data.fuel,
                transmission: data.transmission,
            })
            .select()
            .single();

        if (carError || !newCar) {
            return { success: false, error: carError?.message || 'Не удалось создать автомобиль' };
        }

        // Сохраняем изображения
        if (data.images && data.images.length > 0) {
            const imageInserts = data.images.map((image_url, index) => ({
                car_id: newCar.id,
                image_url,
                sort_order: index,
            }));

            const { error: imagesError } = await supabase
                .from('car_images')
                .insert(imageInserts);

            if (imagesError) {
                console.error('Ошибка сохранения изображений:', imagesError);
                // Не откатываем создание автомобиля, только логируем
            }
        }

        return {
            success: true,
            message: 'Автомобиль успешно добавлен!',
            data: newCar,
        };

    } catch (err: any) {
        console.error('addCarAction error:', err);
        return {
            success: false,
            error: err.message || 'Произошла ошибка при добавлении автомобиля',
        };
    }
}