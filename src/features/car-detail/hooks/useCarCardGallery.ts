
'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Car } from "@/src/shared/types/types";
import {supabase} from "@/src/shared/lib/supabase";


export function useCarCardGallery() {
    const params = useParams();
    const router = useRouter();

    const [car, setCar] = useState<Car | null>(null);
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



                setCar(foundCar);


            } catch (err: any) {
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
        loading,
        error,
    };
}