'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/src/components/ui/Button";
import Modal from "@/src/components/ui/Modal";
import { CallbackForm } from "@/src/components/common/Callback/CallbackForm";
import {useCarDetail} from "@/src/features/car-detail/hooks/useCarDetail";
import {GalleryCardDeatil} from "@/src/features/car-detail/components/CardDeatil/Gallery";

export function CarDetailPage() {
    const router = useRouter();
    const{car, images, loading,error}=useCarDetail()

    const [isModalOpen, setIsModalOpen] = useState(false);
    // Галерея

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><p className="text-2xl text-zinc-500">Загрузка...</p></div>;
    }

    if (error || !car) {
        return <div className="min-h-screen flex items-center justify-center"><p className="text-2xl text-red-500">{error || 'Автомобиль не найден'}</p></div>;
    }

    const formatPrice = (price: number) => new Intl.NumberFormat('ru-RU').format(price);

    return (
        <>
            <div className="min-h-screen bg-zinc-50 pb-16">
                {/* Шапка */}
                <div className="bg-white border-b sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors"
                        >
                            ← Назад к каталогу
                        </button>
                        <div className="font-bold text-2xl">AutoPick</div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 pt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                        <GalleryCardDeatil car={car} images={images} />

                        {/* Правая колонка с информацией */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="bg-blue-100 text-blue-700 px-5 py-1.5 rounded-2xl text-sm font-medium">
                                        {car.year} год
                                    </span>
                                    <span className="bg-zinc-100 text-zinc-700 px-5 py-1.5 rounded-2xl text-sm font-medium">
                                        {car.type}
                                    </span>
                                </div>

                                <h1 className="text-5xl font-bold tracking-tight leading-none mb-6">
                                    {car.brand} {car.model}
                                </h1>
                            </div>

                            {/* Цена */}
                            <div className="bg-white rounded-3xl p-8 shadow">
                                <div className="text-zinc-500">Цена</div>
                                <div className="text-6xl font-bold text-blue-600 tracking-tighter mt-1">
                                    {formatPrice(car.price)} ₽
                                </div>
                            </div>

                            {/* Характеристики */}
                            <div className="bg-white rounded-3xl p-8 shadow">
                                <h3 className="text-xl font-semibold mb-6">Характеристики</h3>
                                <div className="grid grid-cols-1 gap-y-6 text-lg">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500">Пробег</span>
                                        <span className="font-medium">{car.mileage.toLocaleString('ru-RU')} км</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500">Тип кузова</span>
                                        <span className="font-medium">{car.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500">Топливо</span>
                                        <span className="font-medium">{car.fuel || '—'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500">Коробка передач</span>
                                        <span className="font-medium">{car.transmission || '—'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Кнопки */}
                            <div className="flex flex-col gap-4 pt-4">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="py-7 text-xl"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Оставить заявку
                                </Button>

                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="py-7 text-xl"
                                    onClick={() => alert('Телефон: +7 (999) 123-45-67\nМы перезвоним вам в течение 5 минут')}
                                >
                                    Позвонить менеджеру
                                </Button>
                            </div>

                            <p className="text-center text-sm text-zinc-500 pt-4">
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
                title="Перезвоните мне"
            >
                <CallbackForm
                    onSuccess={() => setIsModalOpen(false)}
                    source={`Страница автомобиля: ${car.brand} ${car.model}`}
                />
            </Modal>


        </>
    );
}