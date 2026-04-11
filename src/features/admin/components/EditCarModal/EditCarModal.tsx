'use client';

import React, { useEffect, useState } from "react";
import { Car } from "@/src/shared/types/types";
import { EditCarForm } from "./EditCarForm";

interface EditCarModalProps {
    isOpen: boolean;
    onClose: () => void;
    car: Car | null;
    onSuccess?: () => void;
}

export function EditCarModal({ isOpen, onClose, car, onSuccess }: EditCarModalProps) {
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

                {/* Форма с кнопками */}
                <EditCarForm
                    car={car}
                    formData={formData}
                    setFormData={setFormData}
                    imageUrls={imageUrls}
                    setImageUrls={setImageUrls}
                    isPending={isPending}
                    setIsPending={setIsPending}
                    error={error}
                    setError={setError}
                    onSuccess={onSuccess}
                    onClose={onClose}
                />
            </div>
        </div>
    );
}