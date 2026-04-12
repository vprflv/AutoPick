'use client';


import React, {useState, useTransition} from "react";

import {CustomSelectAdmin} from "@/src/components/ui/CustomSelectAdmin";
import {addCarAction} from "@/src/features/admin/actions/addCarAction";
import {ImageUploader} from "@/src/features/admin/components/ImageUploader";
import {carSelectFields} from "@/src/features/admin/config/selectFields";
import {AdminTextInput} from "@/src/features/admin/components/inputs/AdminTextInput";

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
        type: 'Седан',
        fuel: 'Бензин',
        transmission: 'Автомат',
    });

    const [imageUrls, setImageUrls] = useState<string[]>(['']);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const validImages = imageUrls.filter(url => url.trim() !== '');

        if (validImages.length === 0) {
            setError('Добавьте хотя бы одну фотографию автомобиля');
            return;
        }

        startTransition(async () => {
            const result = await addCarAction({
                ...formData,
                images: validImages,
            });

            if (result.success) {
                setSuccessMessage(result.message || 'Автомобиль добавлен!');

                setFormData({
                    brand: '',
                    model: '',
                    year: new Date().getFullYear(),
                    price: 0,
                    mileage: 0,
                    type: 'Седан',
                    fuel: 'Бензин',
                    transmission: 'Автомат',
                });
                setImageUrls(['']);
                onSuccess?.();
            }else {
                setError(result.error || 'Не удалось добавить автомобиль');
            }
        })    };

    return (
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold mb-8">Добавление нового автомобиля</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">


                {/*<div>*/}
                {/*    <label className="block text-sm mb-2">Марка</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        required*/}
                {/*        value={formData.brand}*/}
                {/*        onChange={(e) => setFormData({...formData, brand: e.target.value})}*/}
                {/*        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"*/}
                {/*    />*/}
                {/*</div>*/}

                <AdminTextInput
                    label="Марка"
                    value={formData.brand}
                    onChange={(val) => setFormData({ ...formData, brand: String(val) })}
                    required
                />

                {/*<div>*/}
                {/*    <label className="block text-sm mb-2">Модель</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        required*/}
                {/*        value={formData.model}*/}
                {/*        onChange={(e) => setFormData({...formData, model: e.target.value})}*/}
                {/*        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"*/}
                {/*    />*/}
                {/*</div>*/}

                <AdminTextInput
                    label="Модель"
                    value={formData.model}
                    onChange={(val) => setFormData({ ...formData, model: String(val) })}
                    required
                />

                {/*<div>*/}
                {/*    <label className="block text-sm mb-2">Год выпуска</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        required*/}
                {/*        value={formData.year}*/}
                {/*        onChange={(e) => setFormData({...formData, year: Number(e.target.value)})}*/}
                {/*        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"*/}
                {/*    />*/}
                {/*</div>*/}

                <AdminTextInput
                    label="Год выпуска"
                    type="text"
                    value={formData.year}
                    onChange={(val) => setFormData({ ...formData, year: Number(val) })}
                    required
                />



                {/*<div>*/}
                {/*    <label className="block text-sm mb-2">Цена (₽)</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        required*/}
                {/*        value={formData.price}*/}
                {/*        onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}*/}
                {/*        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"*/}
                {/*    />*/}
                {/*</div>*/}

                <AdminTextInput
                    label="Цена (₽)"
                    type="text"
                    value={formData.price}
                    onChange={(val) => setFormData({ ...formData, price: Number(val) })}
                    required
                />

                {/*<div>*/}
                {/*    <label className="block text-sm mb-2">Пробег (км)</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        required*/}
                {/*        value={formData.mileage}*/}
                {/*        onChange={(e) => setFormData({...formData, mileage: Number(e.target.value)})}*/}
                {/*        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"*/}
                {/*    />*/}
                {/*</div>*/}

                <AdminTextInput
                    label="Пробег (км)"
                    type="text"
                    value={formData.mileage}
                    onChange={(val) => setFormData({ ...formData, mileage: Number(val) })}
                    required
                />

                <div>
                    {carSelectFields.map(({ label, field, options }) => (
                        <CustomSelectAdmin
                            key={field}
                            label={label}
                            value={formData[field]}
                            onChange={(val) => setFormData({ ...formData, [field]: val })}
                            options={options}
                        />
                    ))}
                </div>

                <ImageUploader
                    images={imageUrls}
                    onChange={setImageUrls}
                    maxImages={8}
                />

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

