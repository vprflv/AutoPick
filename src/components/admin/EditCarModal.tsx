'use client';

import {Car, NewCar} from "@/src/shared/types/types";
import React, {useEffect, useState} from "react";
import {editCarAction} from "@/src/features/create-car/model/actions";
import Button from "@/src/components/ui/Button";

interface EditCarModalProps {
    isOpen: boolean;
    onClose: () => void;
    car: Car | null;
    onSuccess?: () => void;
}

export function EditCarModal({ isOpen, onClose, car, onSuccess }: EditCarModalProps) {
    const [formData, setFormData] = useState<NewCar>({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: 0,
        mileage: 0,
        image: '',
        type: 'Седан',
        fuel: 'Бензин',
        transmission: 'Автомат',
    });

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
                image: car.image,
                type: car.type,
                fuel: car.fuel || 'Бензин',
                transmission: car.transmission || 'Автомат',
            });
            setError(null);
        }
    }, [car, isOpen]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!car) return;

        setIsPending(true);
        setError(null);

        const result = await editCarAction(car.id, formData);

        setIsPending(false);

        if (result.success) {
            onSuccess?.();
            onClose();
        } else {
            setError(result.error || 'Не удалось обновить автомобиль');
        }

    }
    if (!isOpen || !car) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-zinc-900 rounded-3xl w-full max-w-2xl overflow-hidden">

                {/* Заголовок */}
                <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-6">
                    <h2 className="text-2xl font-semibold">Редактирование автомобиля</h2>
                    <button
                        onClick={onClose}
                        className="text-4xl text-zinc-500 hover:text-white transition-colors"
                    >
                        ×
                    </button>
                </div>

                {/* Форма */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-900/50 border border-red-700 rounded-2xl text-red-400">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm mb-2">Марка</label>
                            <input
                                type="text"
                                value={formData.brand}
                                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Модель</label>
                            <input
                                type="text"
                                value={formData.model}
                                onChange={(e) => setFormData({...formData, model: e.target.value})}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Год выпуска</label>
                            <input
                                type="number"
                                value={formData.year}
                                onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Цена (₽)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Пробег (км)</label>
                            <input
                                type="number"
                                value={formData.mileage}
                                onChange={(e) => setFormData({...formData, mileage: parseInt(e.target.value)})}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Ссылка на фото</label>
                            <input
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Тип кузова</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                            >
                                <option>Седан</option>
                                <option>Кроссовер</option>
                                <option>Универсал</option>
                                <option>Хэтчбек</option>
                                <option>Внедорожник</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Топливо</label>
                            <select
                                value={formData.fuel}
                                onChange={(e) => setFormData({...formData, fuel: e.target.value})}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                            >
                                <option>Бензин</option>
                                <option>Дизель</option>
                                <option>Гибрид</option>
                                <option>Электро</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Коробка передач</label>
                            <select
                                value={formData.transmission}
                                onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                            >
                                <option>Автомат</option>
                                <option>Робот</option>
                                <option>Механика</option>
                                <option>Вариатор</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
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
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="flex-1"
                            disabled={isPending}
                        >
                            {isPending ? 'Сохраняем изменения...' : 'Сохранить изменения'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )

}