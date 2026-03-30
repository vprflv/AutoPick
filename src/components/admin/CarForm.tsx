'use client';

import {Car} from "@/src/shared/types/types";
import React, {useState, useTransition} from "react";
import {addCarAction} from "@/src/features/create-car/model/actions";

interface CarFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function CarForm({  onSuccess, onCancel }: CarFormProps) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


    const [formData, setFormData] = useState({
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        startTransition(async () => {
            const result = await addCarAction(formData);

            if (result.success) {
                setSuccessMessage(result.message || 'Автомобиль добавлен!');

                setFormData({
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
                onSuccess?.();
            }else {
                setError(result.error || 'Не удалось добавить автомобиль');
            }
        })
    };

    return (
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold mb-8">Добавление нового автомобиля</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm mb-2">Марка</label>
                    <input
                        type="text"
                        required
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Модель</label>
                    <input
                        type="text"
                        required
                        value={formData.model}
                        onChange={(e) => setFormData({...formData, model: e.target.value})}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Год выпуска</label>
                    <input
                        type="number"
                        required
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: Number(e.target.value)})}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Цена (₽)</label>
                    <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Пробег (км)</label>
                    <input
                        type="number"
                        required
                        value={formData.mileage}
                        onChange={(e) => setFormData({...formData, mileage: Number(e.target.value)})}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Ссылка на фото</label>
                    <input
                        type="url"
                        required
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        placeholder="https://..."
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
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

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-2xl font-medium text-lg transition-colors"
                    >
                        Добавить автомобиль
                    </button>
                </div>
            </form>

            <button
                onClick={onCancel}
                className="mt-4 w-full text-zinc-400 hover:text-white transition-colors"
            >
                Отмена
            </button>
        </div>
    )
}

