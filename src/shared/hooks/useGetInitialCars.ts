'use client';

import { useState, useEffect, useCallback } from 'react';
import { Car } from "@/src/shared/types/types";
import { supabase } from "@/src/shared/lib/supabase";
import type { Database } from "@/src/shared/types/supabase";

type CarRow = Database['public']['Tables']['cars']['Row'];
type CarImageRow = Database['public']['Tables']['car_images']['Row'];

export function useGetInitialCars() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadCars = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            if (!supabase) {
                setError("Нет подключения к базе данных");
                setCars([]);
                return;
            }

            const { data, error: supabaseError } = await supabase
                .from('cars')
                .select(`
                *,
                car_images (image_url, sort_order)
            `)
                .order('created_at', { ascending: false });

            if (supabaseError) {
                console.error('Supabase error:', supabaseError);
                setError(supabaseError.message);
                setCars([]);
                return;
            }

            // Полностью типизированное приведение без any
            const rawData = (data || []) as Array<
                Database['public']['Tables']['cars']['Row'] & {
                car_images: Array<Database['public']['Tables']['car_images']['Row']>;
            }
            >;

            const carsWithImages: Car[] = rawData.map((car) => ({
                id: car.id,
                brand: car.brand,
                model: car.model,
                year: car.year,
                price: car.price,
                mileage: car.mileage,
                type: car.type,
                fuel: car.fuel ?? undefined,
                transmission: car.transmission ?? undefined,

                images: [
                    // Изображения из связанной таблицы car_images
                    ...(car.car_images ?? [])
                        .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                        .map((img) => img.image_url),

                    // Старое одиночное поле image (для совместимости)
                    ...(car.image ? [car.image] : [])
                ].filter((url): url is string => typeof url === "string" && url.length > 0),
            }));

            setCars(carsWithImages);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Ошибка загрузки автомобилей';
            console.error('Ошибка загрузки автомобилей:', err);
            setError(message);
            setCars([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCars();
    }, [loadCars]);

    return {
        cars,
        loading,
        error,
        loadCars,
    };
}