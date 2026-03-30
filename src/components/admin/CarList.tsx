'use client';
import Image from 'next/image';
import {Car} from "@/src/shared/types/types";
import Button from "@/src/components/ui/Button";

interface CarListProps {
    cars: Car[];
    onDelete: (id: number) => void;
    onEdit: (Car) => void;

}


export function CarList({ cars, onDelete, onEdit }: CarListProps) {
    if (cars.length === 0) {
        return (
            <div className="bg-zinc-900 rounded-3xl p-16 text-center border border-zinc-800">
                <div className="text-6xl mb-6">🚗</div>
                <h3 className="text-2xl font-semibold mb-3">Список автомобилей пуст</h3>
                <p className="text-zinc-400 mb-8">Добавьте первый автомобиль, нажав кнопку выше</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Все автомобили ({cars.length})</h2>
                <div className="text-sm text-zinc-500">
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <div
                        key={car.id}
                        className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all group"
                    >
                        {/* Изображение */}
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={car.image}
                                alt={`${car.brand} ${car.model}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-xl">
                                {car.year}
                            </div>
                            <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-xl">
                                {car.type}
                            </div>
                        </div>

                        {/* Информация */}
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-1">
                                {car.brand} {car.model}
                            </h3>

                            <div className="text-sm text-zinc-400 mb-4">
                                {car.mileage.toLocaleString('ru-RU')} км • {car.fuel} • {car.transmission}
                            </div>

                            <div className="flex items-baseline justify-between mb-6">
                                <div>
                                    <span className="text-xs text-zinc-500">Цена</span>
                                    <div className="text-2xl font-bold text-emerald-400">
                                        {car.price.toLocaleString('ru-RU')} ₽
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => onEdit(car)}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium mb-3 transition-colors"
                            >
                                Редактировать
                            </button>

                            {/* Кнопка удаления */}
                            <Button
                                variant="secondary"
                                size="md"
                                className="w-full bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/30 hover:border-red-500 transition-all"
                                onClick={() => onDelete(car.id)}
                            >
                                Удалить автомобиль
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}