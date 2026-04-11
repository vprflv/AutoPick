'use client';

import React from "react";
import Button from "@/src/components/ui/Button";
import { Car, CreateCarData } from "@/src/shared/types/types";
import { editCarAction } from "@/src/features/admin/actions/editCarAction";
import { ImageUploader } from "@/src/features/admin/components/ImageUploader";
import { CustomSelectAdmin } from "@/src/components/ui/CustomSelectAdmin";

interface EditCarFormProps {
    car: Car;
    formData: any;           // лучше создать тип formDataCar
    setFormData: (data: any) => void;
    imageUrls: string[];
    setImageUrls: (urls: string[]) => void;
    isPending: boolean;
    setIsPending: (pending: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
    onSuccess?: () => void;
    onClose: () => void;
}

export function EditCarForm({
                                car,
                                formData,
                                setFormData,
                                imageUrls,
                                setImageUrls,
                                isPending,
                                setIsPending,
                                error,
                                setError,
                                onSuccess,
                                onClose,
                            }: EditCarFormProps) {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validImages = imageUrls.filter(url => url?.trim() !== '');

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

    return (
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {error && (
                <div className="p-4 bg-red-900/50 border border-red-700 rounded-2xl text-red-400 text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Поля формы — оставляем как было */}
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

                {/* ... остальные поля (model, year, price, mileage, CustomSelectAdmin) ... */}

                <ImageUploader
                    images={imageUrls}
                    onChange={setImageUrls}
                    maxImages={8}
                />
            </div>

            {/* Компактные кнопки внизу формы */}
            <div className="pt-6 border-t border-zinc-800 flex gap-3">
                <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className="flex-1 py-3 text-base"
                    onClick={onClose}
                    disabled={isPending}
                >
                    Отмена
                </Button>

                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="flex-1 py-3 text-base font-medium"
                    disabled={isPending}
                >
                    {isPending ? 'Сохраняем...' : 'Сохранить изменения'}
                </Button>
            </div>
        </form>
    );
}