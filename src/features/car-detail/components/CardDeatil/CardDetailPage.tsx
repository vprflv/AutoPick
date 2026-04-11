'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/src/components/ui/Button";
import Modal from "@/src/components/ui/Modal";
import { CallbackForm } from "@/src/features/callback/components/CallbackForm";
import { useCarCardGallery } from "@/src/features/car-detail/hooks/useCarCardGallery";
import { GalleryCardDeatil } from "@/src/features/car-detail/components/CardDeatil/Gallery";

export function CarDetailPage() {
    const router = useRouter();
    const { car, loading, error } = useCarCardGallery();

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl text-zinc-500">Загрузка...</p>
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl text-red-500">{error || 'Автомобиль не найден'}</p>
            </div>
        );
    }

    const formatPrice = (price: number) => new Intl.NumberFormat('ru-RU').format(price);

    return (
        <>
            <div className="min-h-screen bg-zinc-50">
                {/* Шапка */}
                <div className="bg-white border-b sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors text-sm sm:text-base font-medium"
                        >
                            ← Назад к каталогу
                        </button>
                        <div className="font-bold text-2xl tracking-tight">AutoPick</div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

                        {/* Галерея — занимает больше места */}
                        <div className="lg:col-span-3">
                            <GalleryCardDeatil car={car} />
                        </div>

                        {/* Информация об автомобиле */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Название и теги */}
                            <div>
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-2xl text-sm font-medium">
                                        {car.year} год
                                    </span>
                                    <span className="bg-zinc-100 text-zinc-700 px-4 py-1.5 rounded-2xl text-sm font-medium">
                                        {car.type}
                                    </span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter leading-tight text-zinc-900">
                                    {car.brand} {car.model}
                                </h1>
                            </div>

                            {/* Цена */}
                            <div className="bg-white rounded-3xl p-7 shadow-sm">
                                <div className="text-sm text-zinc-500 mb-1">Цена</div>
                                <div className="text-5xl font-bold text-blue-600 tracking-tighter">
                                    {formatPrice(car.price)}
                                </div>
                            </div>

                            {/* Характеристики */}
                            <div className="bg-white rounded-3xl p-7 shadow-sm">
                                <h3 className="text-xl font-semibold mb-6">Характеристики</h3>
                                <div className="grid grid-cols-1 gap-y-5 text-[15px]">
                                    <div className="flex justify-between border-b border-zinc-100 pb-4">
                                        <span className="text-zinc-500">Пробег</span>
                                        <span className="font-medium">{car.mileage.toLocaleString('ru-RU')} км</span>
                                    </div>
                                    <div className="flex justify-between border-b border-zinc-100 pb-4">
                                        <span className="text-zinc-500">Тип кузова</span>
                                        <span className="font-medium">{car.type}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-zinc-100 pb-4">
                                        <span className="text-zinc-500">Топливо</span>
                                        <span className="font-medium">{car.fuel || '—'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500">Коробка передач</span>
                                        <span className="font-medium">{car.transmission || '—'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Кнопка заявки */}
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full py-7 text-lg font-medium shadow-lg shadow-blue-500/20"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Оставить заявку на этот автомобиль
                            </Button>

                            <p className="text-center text-sm text-zinc-500">
                                Гарантия юридической чистоты • Осмотр перед покупкой • Помощь с оформлением
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальное окно */}
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