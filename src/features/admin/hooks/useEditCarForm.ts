'use client';

import { useState, useEffect, useCallback } from 'react';
import { Car, CreateCarData } from "@/src/shared/types/types";
import { editCarAction } from "@/src/features/admin/actions/editCarAction";

export function useEditCarForm(car: Car | null, onSuccess?: () => void, onClose?: () => void) {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: 0,
        mileage: 0,
        type: 'Седан',
        fuel: 'Бензин',
        transmission: 'Автомат',
    });

    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Надёжная очистка изображений
    const cleanImages = useCallback((urls: string[] | undefined | null): string[] => {
        if (!Array.isArray(urls)) return [];
        return urls.filter((url): url is string =>
            typeof url === 'string' && url.trim().length > 0
        );
    }, []);

    // Заполнение формы при открытии модалки
    useEffect(() => {
        if (car) {
            setFormData({
                brand: car.brand,
                model: car.model,
                year: car.year,
                price: car.price,
                mileage: car.mileage,
                type: car.type,
                fuel: car.fuel || 'Бензин',
                transmission: car.transmission || 'Автомат',
            });

            const initialImages = cleanImages(car.images || (car.image ? [car.image] : []));

            setImageUrls(initialImages);
            setError(null);
        }
    }, [car, cleanImages]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!car) return;

        // Самая жёсткая фильтрация прямо перед отправкой
        const validImages = cleanImages(imageUrls);

        setIsPending(true);
        setError(null);

        const updateData: CreateCarData = {
            ...formData,
            images: validImages,   // ← гарантированно без пустых строк
        };

        const result = await editCarAction(car.id, updateData);

        setIsPending(false);

        if (result.success) {
            onSuccess?.();
            onClose?.();
        } else {
            setError(result.error || 'Не удалось обновить автомобиль');
        }
    };

    const resetForm = () => {
        setError(null);
    };

    return {
        formData,
        setFormData,
        imageUrls,
        setImageUrls,
        isPending,
        error,
        handleSubmit,
        resetForm,
    };
}