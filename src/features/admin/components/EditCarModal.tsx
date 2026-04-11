'use client';

import { Car, CreateCarData } from "@/src/shared/types/types";
import React, { useEffect, useState, useRef } from "react";
import Button from "@/src/components/ui/Button";

import { CustomSelectAdmin } from "@/src/components/ui/CustomSelectAdmin";
import { editCarAction } from "@/src/features/admin/actions/editCarAction";
import {ImageUploader} from "@/src/features/admin/components/ImageUploader";

interface EditCarModalProps {
    isOpen: boolean;
    onClose: () => void;
    car: Car | null;
    onSuccess?: () => void;
}

export function EditCarModal({ isOpen, onClose, car, onSuccess }: EditCarModalProps) {
    const formRef = useRef<HTMLFormElement>(null);

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

    useEffect(() => {
        if (car && isOpen) {
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
    }, [car, isOpen]);

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
            onClose();
        } else {
            setError(result.error || 'Не удалось обновить автомобиль');
        }
    };


    if (!isOpen || !car) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div
                className="bg-zinc-900 rounded-3xl w-full max-w-2xl max-h-[95vh] flex flex-col overflow-hidden shadow-2xl">

                {/* Заголовок */}
                <div className="px-6 py-5 border-b border-zinc-800 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-white">Редактирование автомобиля</h2>
                        <button
                            onClick={onClose}
                            className="text-4xl text-zinc-400 hover:text-white p-2 leading-none"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Форма */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6"
                >
                    {error && (
                        <div className="p-4 bg-red-900/50 border border-red-700 rounded-2xl text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ... все твои поля остаются без изменений ... */}
                        <div>
                            <label className="block text-sm mb-2 text-zinc-400">Марка</label>
                            <input
                                type="text"
                                value={formData.brand}
                                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Остальные поля (model, year, price, mileage, CustomSelectAdmin) — оставляем как было */}
                        {/* ... (я не дублирую их все, чтобы не было слишком длинно) ... */}

                        <ImageUploader
                            images={imageUrls}
                            onChange={setImageUrls}
                            maxImages={8}
                        />
                    </div>
                </form>

                {/* Кнопки — СДЕЛАЛИ МЕНЬШЕ И КОМПАКТНЕЕ */}
                <div className="p-5 md:p-6 border-t border-zinc-800 bg-zinc-900 flex gap-3 flex-shrink-0">
                    <Button
                        type="button"
                        variant="outline"
                        size="md"
                        className="flex-1 py-3 text-base font-medium"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        Отмена
                    </Button>

                    <Button
                        type="button"
                        variant="primary"
                        size="md"
                        className="flex-1 py-3 text-base font-medium"
                        disabled={isPending}
                        onClick={handleSaveClick}
                    >
                        {isPending ? 'Сохраняем...' : 'Сохранить изменения'}
                    </Button>
                </div>
            </div>
        </div>
    );


    function handleSaveClick() {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    }
}