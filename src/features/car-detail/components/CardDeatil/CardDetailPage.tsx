'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCarCardGallery } from "@/src/features/car-detail/hooks/useCarCardGallery";

import Modal from "@/src/components/ui/Modal";
import { CallbackForm } from "@/src/features/callback/components/CallbackForm";
import {CarDetailHeader} from "@/src/features/car-detail/components/CardDeatil/CarDetailHeader";
import {CarDetailGallery} from "@/src/features/car-detail/components/CardDeatil/CarDetailGallery";
import {CarDetailInfo} from "@/src/features/car-detail/components/CardDeatil/CarDetailInfo";
import {CarDetailActions} from "@/src/features/car-detail/components/CardDeatil/CarDetailActions";

export default function CarDetailPage() {
    const router = useRouter();
    const { car, loading, error } = useCarCardGallery();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-zinc-50">
            <p className="text-2xl text-zinc-500">Загрузка автомобиля...</p>
        </div>;
    }

    if (error || !car) {
        return <div className="min-h-screen flex items-center justify-center bg-zinc-50">
            <div className="text-center">
                <p className="text-2xl text-red-500 mb-4">{error || 'Автомобиль не найден'}</p>
                <button onClick={() => router.back()} className="text-blue-600 hover:underline">
                    ← Вернуться назад
                </button>
            </div>
        </div>;
    }

    return (
        <>
            <div className="min-h-screen bg-zinc-50 pb-12">
                <CarDetailHeader onBack={() => router.back()} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                        <CarDetailGallery car={car} />
                        <div className="lg:col-span-2 space-y-8">
                            <CarDetailInfo car={car} />
                            <CarDetailActions
                                car={car}
                                onRequest={() => setIsModalOpen(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Оставить заявку"
            >
                <CallbackForm
                    source={`Страница автомобиля: ${car.brand} ${car.model} (${car.year})`}
                />
            </Modal>
        </>
    );
}