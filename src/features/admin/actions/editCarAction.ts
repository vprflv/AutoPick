'use server';

import { CreateCarData } from "@/src/shared/types/types";
import { createServerSupabaseClient } from "@/src/shared/lib/supabse";

export async function editCarAction(carId: number, data: CreateCarData) {
    console.log('=== editCarAction START ===');
    console.log('Car ID:', carId);
    console.log('Received data images count:', data.images?.length || 0);
    console.log('Images:', data.images);

    try {
        const supabase = await createServerSupabaseClient();
        console.log('Supabase client created successfully');

        // 1. Обновляем автомобиль
        console.log('Updating car data...');
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
            console.error('Car update FAILED:', carError);
            return {
                success: false,
                error: carError.message || 'Не удалось обновить данные автомобиля',
            };
        }

        console.log('Car updated successfully');

        // 2. Удаляем старые изображения
        console.log('Deleting old images...');
        const { error: deleteError } = await supabase
            .from('car_images')
            .delete()
            .eq('car_id', carId);

        if (deleteError) {
            console.error('Delete images error (non-critical):', deleteError);
        } else {
            console.log('Old images deleted successfully');
        }

        // 3. Добавляем новые изображения
        if (data.images && data.images.length > 0) {
            const validImages = data.images.filter(url => url && url.trim() !== '');
            console.log('Valid images to insert:', validImages.length);

            const imageInserts = validImages.map((image_url, index) => ({
                car_id: carId,
                image_url: image_url.trim(),
                sort_order: index,
            }));

            console.log('Inserting images:', imageInserts);

            const { error: imagesError } = await supabase
                .from('car_images')
                .insert(imageInserts);

            if (imagesError) {
                console.error('Insert images FAILED:', imagesError);
                return {
                    success: false,
                    error: `Автомобиль обновлён, но фото не сохранились: ${imagesError.message}`,
                };
            } else {
                console.log('Images inserted successfully!');
            }
        } else {
            console.log('No new images to insert');
        }

        console.log('=== editCarAction SUCCESS ===');
        return {
            success: true,
            message: 'Автомобиль успешно обновлён!',
        };

    } catch (err: any) {
        console.error('=== editCarAction CRITICAL ERROR ===');
        console.error(err);
        return {
            success: false,
            error: err.message || 'Произошла неожиданная ошибка',
        };
    }
}