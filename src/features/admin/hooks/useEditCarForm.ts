'use client';

import { useState, useEffect } from 'react';
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

            const initialImages = car.images && car.images.length > 0
                ? car.images
                : (car.image ? [car.image] : []);

            setImageUrls(initialImages);
            setError(null);
        }
    }, [car]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!car) return;

        const validImages = imageUrls.filter(url => url && url.trim() !== '');

        if (validImages.length === 0) {
            setError('Добавьте хотя бы одну фотографию автомобиля');
            return;
        }

        setIsPending(true);
        setError(null);

        const updateData: CreateCarData = {
            ...formData,
            images: validImages,
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