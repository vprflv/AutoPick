'use client';

import React from "react";
import { Car } from "@/src/shared/types/types";
import { EditCarForm } from "./EditCarForm";
import { useEditCarForm } from "../../hooks/useEditCarForm";

interface EditCarModalProps {
    isOpen: boolean;
    onClose: () => void;
    car: Car | null;
    onSuccess?: () => void;
}

export function EditCarModal({ isOpen, onClose, car, onSuccess }: EditCarModalProps) {
    const {
        formData,
        setFormData,
        imageUrls,
        setImageUrls,
        isPending,
        error,
        handleSubmit,
    } = useEditCarForm(car, onSuccess, onClose);

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
                            className="text-4xl text-zinc-400 hover:text-white p-2 leading-none"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Форма */}
                <EditCarForm
                    car={car}
                    formData={formData}
                    setFormData={setFormData}
                    imageUrls={imageUrls}
                    setImageUrls={setImageUrls}
                    isPending={isPending}
                    error={error}
                    onSubmit={handleSubmit}
                    onClose={onClose}
                />
            </div>
        </div>
    );
}