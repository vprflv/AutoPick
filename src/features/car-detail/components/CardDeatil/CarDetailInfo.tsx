'use client';

import { Car } from "@/src/shared/types/types";

interface CarDetailInfoProps {
    car: Car;
}

export function CarDetailInfo({ car }: CarDetailInfoProps) {
    const formatPrice = (price: number) =>
        new Intl.NumberFormat('ru-RU').format(price);

    return (
        <div className="space-y-8">
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
                    {formatPrice(car.price)} ₽
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
        </div>
    );
}