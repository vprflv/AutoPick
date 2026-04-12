'use client';

import React from "react";
import Button from "@/src/components/ui/Button";

import { CustomSelectAdmin } from "@/src/components/ui/CustomSelectAdmin";
import { ImageUploader } from "@/src/features/admin/components/ImageUploader";
import { carSelectFields } from "@/src/features/admin/config/selectFields";
import { AdminTextInput } from "@/src/features/admin/components/inputs/AdminTextInput";
import { useCarForm } from "@/src/features/admin/hooks/useCarForm";

interface CarFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function CarForm({ onSuccess, onCancel }: CarFormProps) {
    const {
        formData,
        setFormData,
        imageUrls,
        setImageUrls,
        isPending,
        error,
        successMessage,
        handleSubmit,
    } = useCarForm(onSuccess);

    return (
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold mb-8">Добавление нового автомобиля</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdminTextInput
                    label="Марка"
                    value={formData.brand}
                    onChange={(val) => setFormData(prev => ({ ...prev, brand: String(val) }))}
                    required
                />

                <AdminTextInput
                    label="Модель"
                    value={formData.model}
                    onChange={(val) => setFormData(prev => ({ ...prev, model: String(val) }))}
                    required
                />

                <AdminTextInput
                    label="Год выпуска"
                    value={formData.year}
                    onChange={(val) => setFormData(prev => ({ ...prev, year: Number(val) || 0 }))}
                    isNumeric={true}
                    required
                />

                <AdminTextInput
                    label="Цена (₽)"
                    value={formData.price}
                    onChange={(val) => setFormData(prev => ({ ...prev, price: Number(val) || 0 }))}
                    isNumeric={true}
                    required
                />

                <AdminTextInput
                    label="Пробег (км)"
                    value={formData.mileage}
                    onChange={(val) => setFormData(prev => ({ ...prev, mileage: Number(val) || 0 }))}
                    isNumeric={true}
                    required
                />

                {carSelectFields.map(({ label, field, options }) => (
                    <CustomSelectAdmin
                        key={field}
                        label={label}
                        value={formData[field]}
                        onChange={(val) => setFormData(prev => ({ ...prev, [field]: val }))}
                        options={options}
                    />
                ))}

                <div className="md:col-span-2">
                    <ImageUploader
                        images={imageUrls}
                        onChange={setImageUrls}
                        maxImages={8}
                    />
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-2xl font-medium text-lg transition-colors disabled:opacity-70"
                    >
                        {isPending ? 'Добавляем автомобиль...' : 'Добавить автомобиль'}
                    </button>
                </div>
            </form>

            {successMessage && (
                <div className="mt-4 p-4 bg-green-900/50 border border-green-700 rounded-2xl text-green-400 text-sm">
                    {successMessage}
                </div>
            )}

            <button
                onClick={onCancel}
                className="mt-4 w-full text-zinc-400 hover:text-white transition-colors"
            >
                Отмена
            </button>
        </div>
    );
}