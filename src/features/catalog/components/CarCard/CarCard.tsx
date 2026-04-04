import Image from 'next/image';
import Button from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";
import { Car } from "@/src/shared/types/types";
import {useCarCard} from "@/src/features/catalog/hooks/useCarCard";
import {CarCardGallery} from "@/src/features/catalog/components/CarCard/CarCardGallery/CarCardGallery";

interface CarCardProps {
    key:number
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
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100 flex flex-col h-full w-full">

            {/* Изображение */}

            <CarCardGallery handleTouchStart={handleTouchStart}
                            handleTouchEnd={handleTouchEnd}
                            handleTouchMove={handleTouchMove}
                            mainImage={mainImage}
                            car={car}
                            hasMultipleImages={hasMultipleImages}
                            goToPrevious={goToPrevious}
                            goToNext={goToNext}
                            currentImageIndex={currentImageIndex}
                            images={images}/>
            {/* Основной контент */}
            <div className="p-5 sm:p-7 flex flex-col flex-1">

                {/* Название автомобиля */}
                <h3 className="text-xl sm:text-2xl font-semibold leading-tight mb-4 sm:mb-5 min-h-[2.8rem] sm:min-h-[3.5rem] line-clamp-2">
                    {car.brand} {car.model}
                </h3>

                {/* Характеристики */}
                <div className="space-y-1 text-sm text-zinc-600 mb-6 sm:mb-8">
                    <div>Пробег: <span className="font-medium text-zinc-700">
                        {car.mileage.toLocaleString('ru-RU')} км
                    </span></div>
                    {car.fuel && <div>Топливо: <span className="font-medium">{car.fuel}</span></div>}
                    {car.transmission && <div>Коробка: <span className="font-medium">{car.transmission}</span></div>}
                </div>

                {/* Цена + Кнопка */}
                <div className="mt-auto pt-4 border-t border-zinc-100 flex items-end justify-between gap-4 sm:gap-6">
                    <div>
                        <div className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Цена</div>
                        <div className="text-2xl sm:text-3xl font-bold text-blue-600 tracking-tighter">
                            {formatPrice(car.price)}
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        size="md"
                        className="px-6 sm:px-10 py-3 text-sm sm:text-base font-medium whitespace-nowrap flex-shrink-0"
                        onClick={() => router.push(`/cars/${car.id}`)}
                    >
                        Подробнее
                    </Button>
                </div>
            </div>
        </div>
    );
}