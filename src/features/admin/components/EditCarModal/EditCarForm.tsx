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
    setFormData: (data: any) => void;
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
                {/* Поля формы — оставляем как было */}
                {/*<div>*/}
                {/*    <label className="block text-sm mb-2 text-zinc-400">Марка</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        value={formData.brand}*/}
                {/*        onChange={(e) => setFormData({...formData, brand: e.target.value})}*/}
                {/*        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}

                <AdminTextInput
                    label="Марка"
                    value={formData.brand}
                    onChange={(val) => setFormData({ ...formData, brand: String(val) })}
                    required
                />


                {/*<div>*/}
                {/*    <label className="block text-sm mb-2 text-zinc-400">Модель</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        value={formData.model}*/}
                {/*        onChange={(e) => setFormData({...formData, model: e.target.value})}*/}
                {/*        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}


                <AdminTextInput
                    label="Модель"
                    value={formData.model}
                    onChange={(val) => setFormData({ ...formData, model: String(val) })}
                    required
                />

                {/*<div>*/}
                {/*    <label className="block text-sm mb-2 text-zinc-400">Год выпуска</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        value={formData.year}*/}
                {/*        onChange={(e) => setFormData({...formData, year: parseInt(e.target.value) || 0})}*/}
                {/*        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}

                <AdminTextInput
                    label="Год выпуска"
                    type="number"
                    value={formData.year}
                    onChange={(val) => setFormData({ ...formData, year: Number(val) })}
                    required
                />

                {/*<div>*/}
                {/*    <label className="block text-sm mb-2 text-zinc-400">Цена (₽)</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        value={formData.price}*/}
                {/*        onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}*/}
                {/*        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}

                <AdminTextInput
                    label="Цена (₽)"
                    type="number"
                    value={formData.price}
                    onChange={(val) => setFormData({ ...formData, price: Number(val) })}
                    required
                />

                {/*<div>*/}
                {/*    <label className="block text-sm mb-2 text-zinc-400">Пробег (км)</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        value={formData.mileage}*/}
                {/*        onChange={(e) => setFormData({...formData, mileage: parseInt(e.target.value) || 0})}*/}
                {/*        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}

                <AdminTextInput
                    label="Пробег (км)"
                    type="number"
                    value={formData.mileage}
                    onChange={(val) => setFormData({ ...formData, mileage: Number(val) })}
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

    {/* Компактные кнопки внизу формы */
    }
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