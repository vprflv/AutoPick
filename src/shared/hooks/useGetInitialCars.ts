
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Car } from "@/src/shared/types/types";
import { supabase } from "@/src/shared/lib/supabase";

export function useGetInitialCars() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadCars = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);



            if (!supabase) {
                setError("Нет подключения к базе данных")
                return;
            }


            const result: any = await supabase
                .from('cars')
                .select(`
                    *,
                    car_images (image_url, sort_order)
                `)
                .order('created_at', { ascending: false });

            if (result?.error) {
                setError(result.error.message);
                setCars([]);
                return;
            }

            const rawData = result?.data || [];

            const carsWithImages: Car[] = rawData.map((car: any) => ({
                ...car,
                images: car.car_images
                        ?.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
                        .map((img: any) => img.image_url) ||
                    (car.image ? [car.image] : []),
            }));

            setCars(carsWithImages);
        } catch (err: any) {
            setError(err.message || 'Ошибка загрузки автомобилей');
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
        loadCars
    };
}