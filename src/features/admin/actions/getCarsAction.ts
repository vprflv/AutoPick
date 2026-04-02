
import {Car} from "@/src/shared/types/types";
import {createServerSupabaseClient} from "@/src/shared/lib/supabse";

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