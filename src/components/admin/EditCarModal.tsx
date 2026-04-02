'use client';

import { Car, CreateCarData } from "@/src/shared/types/types";
import React, { useEffect, useState, useRef } from "react";
import Button from "@/src/components/ui/Button";
import { ImageUploader } from "@/src/components/admin/ImageUploader";
import { CustomSelectAdmin } from "@/src/components/ui/CustomSelectAdmin";
import { editCarAction } from "@/src/features/admin/actions/editCarAction";

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
        console.log("handleSubmit СРАБОТАЛ!");

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
            console.error("Ошибка от сервера:", result.error);
        }
    };


    if (!isOpen || !car) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-zinc-900 rounded-3xl w-full max-w-2xl max-h-[95vh] flex flex-col overflow-hidden shadow-2xl">

                {/* Заголовок */}
                <div className="px-6 py-5 border-b border-zinc-800 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-white">Редактирование автомобиля</h2>
                        <button
                            onClick={onClose}
                            className="text-4xl text-zinc-400 hover:text-white p-2"
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
                        <div className="p-4 bg-red-900/50 border border-red-700 rounded-2xl text-red-400">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm mb-2 text-zinc-400">Марка</label>
                            <input
                                type="text"
                                value={formData.brand}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2 text-zinc-400">Модель</label>
                            <input
                                type="text"
                                value={formData.model}
                                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2 text-zinc-400">Год выпуска</label>
                            <input
                                type="number"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 0 })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2 text-zinc-400">Цена (₽)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2 text-zinc-400">Пробег (км)</label>
                            <input
                                type="number"
                                value={formData.mileage}
                                onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) || 0 })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <CustomSelectAdmin
                            label="Тип кузова"
                            value={formData.type}
                            onChange={(val) => setFormData({ ...formData, type: val })}
                            options={[
                                { value: 'Седан', label: 'Седан' },
                                { value: 'Кроссовер', label: 'Кроссовер' },
                                { value: 'Универсал', label: 'Универсал' },
                                { value: 'Хэтчбек', label: 'Хэтчбек' },
                                { value: 'Внедорожник', label: 'Внедорожник' },
                            ]}
                        />

                        <CustomSelectAdmin
                            label="Топливо"
                            value={formData.fuel}
                            onChange={(val) => setFormData({ ...formData, fuel: val })}
                            options={[
                                { value: 'Бензин', label: 'Бензин' },
                                { value: 'Дизель', label: 'Дизель' },
                                { value: 'Гибрид', label: 'Гибрид' },
                                { value: 'Электро', label: 'Электро' },
                            ]}
                        />

                        <CustomSelectAdmin
                            label="Коробка передач"
                            value={formData.transmission}
                            onChange={(val) => setFormData({ ...formData, transmission: val })}
                            options={[
                                { value: 'Автомат', label: 'Автомат' },
                                { value: 'Робот', label: 'Робот' },
                                { value: 'Механика', label: 'Механика' },
                                { value: 'Вариатор', label: 'Вариатор' },
                            ]}
                        />
                    </div>

                    <ImageUploader
                        images={imageUrls}
                        onChange={setImageUrls}
                        maxImages={8}
                    />
                </form>

                {/* Кнопки */}
                <div className="p-6 border-t border-zinc-800 bg-zinc-900 flex gap-4 flex-shrink-0">
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        Отмена
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        className="flex-1"
                        disabled={isPending}
                        onClick={handleSaveClick}
                    >
                        {isPending ? 'Сохраняем изменения...' : 'Сохранить изменения'}
                    </Button>
                </div>
            </div>
        </div>
    );

    // Вспомогательная функция
    function handleSaveClick() {
        if (formRef.current) {
            console.log("Кнопка нажата → вызываем requestSubmit");
            formRef.current.requestSubmit();
        } else {
            console.error("formRef не найден!");
        }
    }
}