// src/shared/hooks/useGetInitialCars.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

import { Car } from "@/src/shared/types/types";
import {supabase} from "@/src/shared/lib/supabase";

export function useGetInitialCars() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Делаем loadCars стабильной функцией с useCallback
    const loadCars = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: supabaseError } = await supabase
                .from('cars')
                .select(`
                    *,
                    car_images (
                        image_url,
                        sort_order
                    )
                `)
                .order('created_at', { ascending: false });

            if (supabaseError) throw supabaseError;

            const carsWithImages: Car[] = (data || []).map((car: any) => ({
                ...car,
                images: car.car_images
                        ?.sort((a: any, b: any) => a.sort_order - b.sort_order)
                        .map((img: any) => img.image_url) ||
                    (car.image ? [car.image] : []),
            }));

            setCars(carsWithImages);
        } catch (err: any) {
            console.error('loadCars error:', err);
            setError(err.message || 'Ошибка загрузки автомобилей');
        } finally {
            setLoading(false);
        }
    }, []);

    // Загружаем данные при первом рендере
    useEffect(() => {
        loadCars();
    }, [loadCars]);

    return {
        cars,
        loading,
        error,
        loadCars   // ← ОБЯЗАТЕЛЬНО возвращаем функцию
    };
}