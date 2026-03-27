import Image from 'next/image';
import Button from "@/src/components/ui/Button";


interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    image: string;
    type: string;
    fuel?: string;
    transmission?: string;
}

interface CarCardProps {
    car: Car;
    formatPrice: (price: number) => string;
}

export default function CarCard({ car, formatPrice }: CarCardProps) {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100 flex flex-col h-full w-full">

            {/* Изображение */}
            <div className="relative">
                <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    width={800}
                    height={520}
                    className="w-full aspect-[16/10] object-cover"
                />

                {/* Бейджи */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-2xl text-sm font-semibold shadow">
                    {car.year}
                </div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-2xl text-sm font-medium shadow">
                    {car.type}
                </div>
            </div>

            {/* Основной контент */}
            <div className="p-7 flex flex-col flex-1">

                {/* Название автомобиля */}
                <h3 className="text-2xl font-semibold leading-tight mb-5 min-h-[3.5rem]">
                    {car.brand} {car.model}
                </h3>

                {/* Характеристики */}
                <div className="space-y-1 text-sm text-zinc-600 mb-8">
                    <div>Пробег: <span className="font-medium text-zinc-700">
            {car.mileage.toLocaleString('ru-RU')} км
          </span></div>
                    {car.fuel && <div>Топливо: <span className="font-medium">{car.fuel}</span></div>}
                    {car.transmission && <div>Коробка: <span className="font-medium">{car.transmission}</span></div>}
                </div>

                {/* Цена + Кнопка */}
                <div className="mt-auto pt-4 border-t border-zinc-100 flex items-end justify-between gap-6">
                    <div>
                        <div className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Цена</div>
                        <div className="text-3xl font-bold text-blue-600 tracking-tighter">
                            {formatPrice(car.price)}
                        </div>
                    </div>

                    {/* Кнопка перенесена ниже и сделана шире */}

                    <Button
                        variant="primary"
                        size="md"
                        className="px-10 py-3.5 text-base font-medium whitespace-nowrap"
                        onClick={() => alert(`Открываем подробную карточку ${car.brand} ${car.model}`)}
                    >
                        Подробнее
                    </Button>
                </div>
            </div>
        </div>
    );
}