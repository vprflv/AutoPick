'use server';


import {Car, CreateCarData, NewCar} from "@/src/shared/types/types";
import {createServerSupabaseClient} from "@/src/shared/lib/supabse";
import {revalidatePath} from "next/cache";
const supabase = createServerSupabaseClient();


// add cars

export async function addCarAction(data: NewCar & { images: string[] }) {
    try {
        const { data:carData, error:carError  } = await supabase
            .from('cars')
            .insert({
                brand: data.brand.trim(),
                model: data.model.trim(),
                year: data.year,
                price: data.price,
                mileage: data.mileage,
                type: data.type,
                fuel: data.fuel?.trim() || null,
                transmission: data.transmission?.trim() || null,
            })
            .select()
            .single();

        if (carError) {
            console.error('Ошибка добавления автомобиля:', carError);
            return { success: false, error: carError.message };
        }
        if (!carData) {
            return { success: false, error: 'Не удалось создать автомобиль' };
        }

        if (data.images && data.images.length > 0) {
            const imageInserts = data.images
                .filter(url => url.trim() !== '')
                .map((image_url, index) => ({
                    car_id: carData.id,
                    image_url: image_url.trim(),
                    sort_order: index,
                }));

            if (imageInserts.length > 0) {
                const {error: imagesError} = await supabase
                    .from('car_images')
                    .insert(imageInserts);

                if (imagesError) {
                    console.error('Ошибка добавления фотографий:', imagesError);
                    // Не прерываем процесс, если фото не добавились
                }
            }
        }

        revalidatePath('/admin');
        revalidatePath('/');
        revalidatePath('/cars');

        return {
            success: true,
            message: 'Автомобиль успешно добавлен!',
            data: carData
        };

    }catch (err:any){
        console.error('Server Action error:', err);
        return {
            success: false,
            error: err.message || 'Произошла неизвестная ошибка'
        };
    }

}


// get cars


export async function getCarsAction() {
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
    try{
        const { data: carData, error: carError } = await supabase
            .from('cars')
            .update({
                brand: data.brand.trim(),
                model: data.model.trim(),
                year: data.year,
                price: data.price,
                mileage: data.mileage,
                type: data.type,
                fuel: data.fuel?.trim() || null,
                transmission: data.transmission?.trim() || null,
                updated_at: new Date().toISOString(),
            })
            .eq('id', carId)
            .select()
            .single();

        if (carError) throw carError;
        if (!carData) throw new Error('Автомобиль не найден');


        const { error: deleteError } = await supabase
            .from('car_images')
            .delete()
            .eq('car_id', carId);

        if (deleteError) {
            console.error('Ошибка удаления старых фото:', deleteError);
        }

        if (data.images && data.images.length > 0) {
            const imageInserts = data.images
                .filter(url => url.trim() !== '')
                .map((image_url, index) => ({
                    car_id: carId,
                    image_url: image_url.trim(),
                    sort_order: index,
                }))
            if (imageInserts.length > 0) {
                const { error: imagesError } = await supabase
                    .from('car_images')
                    .insert(imageInserts);

                if (imagesError) {
                    console.error('Ошибка добавления новых фото:', imagesError);
                }
            }
        }

        // Обновляем кэш
        revalidatePath('/admin');
        revalidatePath('/');
        revalidatePath(`/cars/${carId}`);

        return {
            success: true,
            message: 'Автомобиль успешно обновлён!',
            data: carData
        };


    }catch(err:any){
        console.error('Server Action editCarAction error:', err);
        return {
            success: false,
            error: err.message || 'Не удалось обновить автомобиль'
        };
    }
}


// delete

export async function deleteCarAction(carId: number) {
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







