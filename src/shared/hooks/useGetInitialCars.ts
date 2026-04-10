
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

            console.log('=== SUPABASE DEBUG ===');
            console.log('NEXT_PUBLIC_SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
            console.log('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);
            console.log('===================');

            // Если это dummy клиент — сразу выходим
            if (!supabase || typeof supabase.from !== 'function') {
                console.warn('Supabase dummy client active - no cars loaded');
                setCars([]);
                return;
            }

            // Реальный запрос (TypeScript-safe)
            const result: any = await supabase
                .from('cars')
                .select(`
                    *,
                    car_images (image_url, sort_order)
                `)
                .order('created_at', { ascending: false });

            if (result?.error) {
                console.error('Supabase error:', result.error);
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
            console.error('loadCars error:', err);
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