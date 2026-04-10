'use client';


import Button from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";
import { Car } from "@/src/shared/types/types";
import { useCarCard } from "@/src/features/catalog/hooks/useCarCard";
import { CarCardGallery } from "@/src/features/catalog/components/CarCard/CarCardGallery/CarCardGallery";

interface CarCardProps {
    key:number;
    car: Car;
    formatPrice: (price: number) => string;
}

export default function CarCard({ car, formatPrice }: CarCardProps) {
    const router = useRouter();

    const {
        images,
        mainImage,
        currentImageIndex,
        goToPrevious,
        goToNext,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        hasMultipleImages,
    } = useCarCard(car);

    return (
        <div
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100 flex flex-col h-full w-full">

            {/* Галерея изображений */}
            <CarCardGallery
                handleTouchStart={handleTouchStart}
                handleTouchEnd={handleTouchEnd}
                handleTouchMove={handleTouchMove}
                mainImage={mainImage}
                car={car}
                hasMultipleImages={hasMultipleImages}
                goToPrevious={goToPrevious}
                goToNext={goToNext}
                currentImageIndex={currentImageIndex}
                images={images}
            />

            {/* Основной контент */}
            <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-7">

                {/* Название автомобиля */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight mb-4 text-center line-clamp-2">
                    {car.brand} {car.model}
                </h3>

                {/* Характеристики */}
                <div className="space-y-1 text-sm text-zinc-600 mb-6 text-center">
                    <div>
                        Пробег: <span className="font-medium text-zinc-700">
                            {car.mileage.toLocaleString('ru-RU')} км
                        </span>
                    </div>
                    {car.fuel && <div>Топливо: <span className="font-medium">{car.fuel}</span></div>}
                    {car.transmission && <div>Коробка: <span className="font-medium">{car.transmission}</span></div>}
                </div>

                {/* Цена + Кнопка */}
                <div className="mt-auto flex flex-col items-center gap-4">
                    <div className="text-center">
                        <div className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Цена</div>
                        <div className="text-2xl sm:text-3xl font-bold text-blue-600 tracking-tighter">
                            {formatPrice(car.price)}
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        size="md"
                        className="w-full sm:w-auto px-8 py-3.5 text-base font-medium"
                        onClick={() => router.push(`/cars/${car.id}`)}
                    >
                        Подробнее
                    </Button>
                </div>

            </div>
        </div>
    );
}