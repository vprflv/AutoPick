
'use server';

// import {revalidatePath} from "next/cache";
import {createServerSupabaseClient} from "@/src/shared/lib/supabase";

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

        // revalidatePath('/admin');
        // revalidatePath('/');

        return { success: true, message: 'Автомобиль удалён' };

    }catch(err:any){
        return { success: false, error: err.message };
    }
}
