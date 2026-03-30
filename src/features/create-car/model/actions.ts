'use server';


import {Car, NewCar} from "@/src/shared/types/types";
import {createServerSupabaseClient} from "@/src/shared/lib/supabse";
import {revalidatePath} from "next/cache";
const supabase = createServerSupabaseClient();


// add cars

export async function addCarAction(formData: Omit<Car, 'id'>) {
    try {
        const { data, error } = await supabase
            .from('cars')
            .insert({
                brand: formData.brand.trim(),
                model: formData.model.trim(),
                year: formData.year,
                price: formData.price,
                mileage: formData.mileage,
                image: formData.image.trim(),
                type: formData.type,
                fuel: formData.fuel?.trim() || null,
                transmission: formData.transmission?.trim() || null,
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return { success: false, error: error.message };
        }

        revalidatePath('/admin');
        revalidatePath('/');


        return {
            success: true,
            data,
            message: 'Автомобиль успешно добавлен!'
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
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Ошибка при получении автомобилей:', error);
            return {
                success: false,
                error: error.message,
                data: [] as Car[]
            };
        }

        return {
            success: true,
            data: data as Car[] || [],
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

export async function editCarAction(carId: number, formData: NewCar) {
    try{  const { data, error } = await supabase
        .from('cars')
        .update({
            brand: formData.brand.trim(),
            model: formData.model.trim(),
            year: formData.year,
            price: formData.price,
            mileage: formData.mileage,
            image: formData.image.trim(),
            type: formData.type,
            fuel: formData.fuel?.trim() || null,
            transmission: formData.transmission?.trim() || null,
            updated_at: new Date().toISOString(),   // вручную обновляем, если нет триггера
        })
        .eq('id', carId)
        .select()
        .single();

        if (error) {
            console.error('Ошибка редактирования:', error);
            return {
                success: false,
                error: error.message
            };
        }

        revalidatePath('/admin');
        revalidatePath('/');
        revalidatePath(`/cars/${carId}`);

        return {
            success: true,
            data: data as Car,
            message: 'Автомобиль успешно обновлён!'
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







