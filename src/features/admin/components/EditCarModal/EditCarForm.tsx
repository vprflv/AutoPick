'use client';

import React from "react";
import Button from "@/src/components/ui/Button";
import { formDataCar} from "@/src/shared/types/types";

import { ImageUploader } from "@/src/features/admin/components/ImageUploader";
import { CustomSelectAdmin } from "@/src/components/ui/CustomSelectAdmin";
import {carSelectFields} from "@/src/features/admin/config/selectFields";
import {AdminTextInput} from "@/src/features/admin/components/inputs/AdminTextInput";

interface EditCarFormProps {
    formData: formDataCar;
    setFormData: (data: formDataCar) => void;
    imageUrls: string[];
    setImageUrls: (urls: string[]) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isPending: boolean;
    error: string | null;
    onClose: () => void;
}

export function EditCarForm({
                                onSubmit,
                                formData,
                                setFormData,
                                imageUrls,
                                setImageUrls,
                                isPending,
                                error,
                                onClose,
                            }: EditCarFormProps) {



    return (
        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {error && (
                <div className="p-4 bg-red-900/50 border border-red-700 rounded-2xl text-red-400 text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <AdminTextInput
                    label="Марка"
                    value={formData.brand}
                    onChange={(val) => setFormData({ ...formData, brand: String(val) })}
                    required
                />


                <AdminTextInput
                    label="Модель"
                    value={formData.model}
                    onChange={(val) => setFormData({ ...formData, model: String(val) })}
                    required
                />

                <AdminTextInput
                    label="Год выпуска"
                    value={formData.year}
                    onChange={(val) => setFormData({ ...formData,
                        year: typeof val === 'number' ? val : Number(val) || 0 })}
                    isNumeric={true}
                    required
                />

                <AdminTextInput
                    label="Цена (₽)"
                    value={formData.price}
                    onChange={(val) => setFormData({ ...formData,
                        price:typeof val === 'number'? val: Number(val) || 0 })}
                    isNumeric={true}
                    required
                />


                <AdminTextInput
                    label="Пробег (км)"
                    value={formData.mileage}
                    onChange={(val) => setFormData({ ...formData,
                        mileage:typeof val === 'number' ? val : Number(val) || 0 })}
                    isNumeric={true}
                    required
                />

                {carSelectFields.map(({ label, field, options }) => (
                    <CustomSelectAdmin
                        key={field}
                        label={label}
                        value={formData[field]}
                        onChange={(val) => setFormData({ ...formData, [field]: val })}
                        options={options}
                    />
                ))}

            <ImageUploader
                images={imageUrls}
                onChange={setImageUrls}
                maxImages={8}
            />
        </div>

    {/* Btn */}

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
)
    ;
}