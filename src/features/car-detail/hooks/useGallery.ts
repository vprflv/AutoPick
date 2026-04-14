'use client';

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Car } from "@/src/shared/types/types";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/src/shared/lib/supabase";
import type { Database } from "@/src/shared/types/supabase";

type CarWithImages = Database['public']['Tables']['cars']['Row'] & {
    car_images: Array<Database['public']['Tables']['car_images']['Row']>;
};

export function useGallery() {
    const [images, setImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const router = useRouter();

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const loadingImages = useCallback(async () => {
        const carId = Number(params.id);

        if (!carId || isNaN(carId)) {
            setError('Неверный ID автомобиля');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            if (!supabase) {
                setError('Нет подключения к базе данных');
                return;
            }

            const { data, error: supabaseError } = await supabase
                .from('cars')
                .select(`
                    *,
                    car_images (image_url, sort_order)
                `)
                .eq('id', carId)
                .single();

            if (supabaseError) {
                console.error('Supabase error:', supabaseError);
                setError(supabaseError.message);
                setImages([]);
                return;
            }

            const foundCar = data as CarWithImages | null;

            if (!foundCar) {
                setError('Автомобиль не найден');
                setTimeout(() => router.push('/'), 1500);
                return;
            }

            const carImages = foundCar.car_images
                    ?.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
                    .map((img: any) => img.image_url)
                    .filter((url): url is string => typeof url === 'string' && url.trim() !== '')
                || (foundCar.image && typeof foundCar.image === 'string' && foundCar.image.trim() !== ''
                    ? [foundCar.image.trim()]
                    : []);
            setImages(carImages);

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Ошибка загрузки автомобиля';
            console.error('Ошибка загрузки галереи:', err);
            setError(message);
            setImages([]);
            setTimeout(() => router.push('/'), 1500);
        } finally {
            setLoading(false);
        }
    }, [params.id, router]);

    useEffect(() => {
        loadingImages();
    }, [loadingImages]);

    // Навигация
    const goToPrevious = useCallback(() => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const goToNext = useCallback(() => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const selectImage = useCallback((index: number) => {
        setCurrentImageIndex(index);
    }, []);

    const openFullscreen = useCallback(() => {
        setIsFullscreen(true);
    }, []);

    const closeFullscreen = useCallback(() => {
        setIsFullscreen(false);
    }, []);

    // Свайп на мобильных
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (!touchStartX.current || !touchEndX.current) return;

        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) goToNext();
        else if (isRightSwipe) goToPrevious();

        // Сброс
        touchStartX.current = 0;
        touchEndX.current = 0;
    }, [goToNext, goToPrevious]);

    return {
        images,
        currentImageIndex,
        isFullscreen,
        loading,
        error,
        goToPrevious,
        goToNext,
        selectImage,
        openFullscreen,
        closeFullscreen,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    };
}