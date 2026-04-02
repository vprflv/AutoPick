'use server';


import {Car, CreateCarData, NewCar} from "@/src/shared/types/types";
import {createServerSupabaseClient} from "@/src/shared/lib/supabse";
import {revalidatePath} from "next/cache";




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
        console.error('Upload error:', err);
        return {
            success: false,
            error: err.message || 'Не удалось загрузить изображение'
        };
    }
}


// add cars

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


// get cars


export async function getCarsAction() {
    const supabase = await createServerSupabaseClient();
    try {
        const { data, error } = await supabase
            .from('cars')
            .select(`
                *,
                car_images (
                    image_url,
                    sort_order
                )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Ошибка получения автомобилей:', error);
            return {
                success: false,
                error: error.message,
                data: [] as Car[]
            };
        }
        const carsWithImages: Car[] = (data || []).map((car: any) => {
            // Сортируем фото по sort_order
            const sortedImages = car.car_images
                ? car.car_images
                    .sort((a: any, b: any) => a.sort_order - b.sort_order)
                    .map((img: any) => img.image_url)
                : [];

            return {
                ...car,
                images: sortedImages.length > 0 ? sortedImages : [car.image], // fallback на старое поле image
                car_images: undefined
            };
        });

        return {
            success: true,
            data: carsWithImages,
            error: null
        };


    }catch (error: any) {
        console.error('Server Action getCarsAction error:', error);
        return {
            success: false,
            error: error.message || 'Не удалось загрузить автомобили',
            data: [] as Car[]
        };
    }
}

// edit

export async function editCarAction(carId: number, data: CreateCarData) {
    try {
        const supabase = await createServerSupabaseClient();

        // 1. Обновляем основную информацию автомобиля
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
                error: carError.message || 'Не удалось обновить автомобиль',
            };
        }

        // 2. Удаляем старые изображения из таблицы car_images
        await supabase
            .from('car_images')
            .delete()
            .eq('car_id', carId);

        // 3. Добавляем новые изображения
        if (data.images && data.images.length > 0) {
            const imageInserts = data.images.map((image_url, index) => ({
                car_id: carId,
                image_url,
                sort_order: index,
            }));

            const { error: imagesError } = await supabase
                .from('car_images')
                .insert(imageInserts);

            if (imagesError) {
                console.error('Ошибка при обновлении изображений:', imagesError);
            }
        }

        return {
            success: true,
            message: 'Автомобиль успешно обновлён!',
        };

    } catch (err: any) {
        console.error('editCarAction error:', err);
        return {
            success: false,
            error: err.message || 'Произошла ошибка при редактировании',
        };
    }
}


// delete

export async function deleteCarAction(carId: number) {
    const supabase = await createServerSupabaseClient();
    try {
        const { error } = await supabase
            .from('cars')
            .delete()
            .eq('id', carId);

        if (error) {
            return { success: false, error: error.message };
        }

        revalidatePath('/admin');
        revalidatePath('/');

        return { success: true, message: 'Автомобиль удалён' };

    }catch(err:any){
        return { success: false, error: err.message };
    }
}







