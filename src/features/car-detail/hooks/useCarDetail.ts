// src/features/car-detail/hooks/useCarDetail.ts
'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Car } from "@/src/shared/types/types";
import {supabase} from "@/src/shared/lib/supabase";


export function useCarDetail() {
    const params = useParams();
    const router = useRouter();

    const [car, setCar] = useState<Car | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAndFindCar = async () => {
            const carId = Number(params.id);

            if (!carId) {
                router.push('/');
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Используем публичный клиент supabase
                const { data, error: supabaseError } = await supabase
                    .from('cars')
                    .select(`
                        *,
                        car_images (
                            image_url,
                            sort_order
                        )
                    `)
                    .eq('id', carId)
                    .single();

                if (supabaseError || !data) {
                    setError('Автомобиль не найден');
                    setTimeout(() => router.push('/'), 1500);
                    return;
                }

                const foundCar = data as Car;

                // Формируем массив изображений
                const carImages = foundCar.car_images && foundCar.car_images.length > 0
                    ? foundCar.car_images
                        .sort((a: any, b: any) => a.sort_order - b.sort_order)
                        .map((img: any) => img.image_url)
                    : (foundCar.image ? [foundCar.image] : []);

                setCar(foundCar);
                setImages(carImages);

            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Ошибка загрузки автомобиля');
                setTimeout(() => router.push('/'), 1500);
            } finally {
                setLoading(false);
            }
        };

        loadAndFindCar();
    }, [params.id, router]);

    return {
        car,
        images,
        loading,
        error,
    };
}