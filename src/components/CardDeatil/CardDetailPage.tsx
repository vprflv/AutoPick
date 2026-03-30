'use client'
import Image from 'next/image';
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Car} from "@/src/shared/types/types";

import Button from "@/src/components/ui/Button";
import {useGetInitialCars} from "@/src/shared/hooks/useGetInitialCars";
import {getCarsAction} from "@/src/features/create-car/model/actions";


interface CallbackFormProps {
    onSuccess?: () => void;
    source?: string;
}




export function CarDetailPage({ onSuccess,source = 'Неизвестная страница' }: CallbackFormProps) {


    const params = useParams();
    const router = useRouter();
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        comment: '',
        source: source,
    });


    useEffect(() => {
        const loadAndFindCar = async () => {
            const carId = Number(params.id);

            if (!carId) {
                router.push('/');
                return;
            }

            try {
                setLoading(true);
                const result = await getCarsAction();

                if (!result.success || !result.data) {
                    throw new Error(result.error || 'Не удалось загрузить данные');
                }

                const foundCar = result.data.find((c: Car) => c.id === carId);

                if (foundCar) {
                    setCar(foundCar);
                } else {
                    setError('Автомобиль не найден');
                    setTimeout(() => router.push('/'), 2000);
                }
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Ошибка загрузки автомобиля');
                setTimeout(() => router.push('/'), 2000);
            } finally {
                setLoading(false);
            }
        };

        loadAndFindCar();


    }, [params.id, router])

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl text-zinc-500">Загрузка автомобиля...</p>
            </div>
        );
    }


    const formatPrice = (price: number) =>
        new Intl.NumberFormat('ru-RU').format(price);




    return (
        <div className="min-h-screen bg-zinc-50 pb-16">
            {/* Шапка */}
            <div className="bg-white border-b sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                        ← Назад к каталогу
                    </button>

                    <div className="font-bold text-2xl">AutoPick</div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Левая часть — Фото */}
                    <div className="relative">
                        <div className="sticky top-8">
                            <Image
                                src={car.image}
                                alt={`${car.brand} ${car.model}`}
                                width={1200}
                                height={800}
                                className="rounded-3xl shadow-xl w-full"
                                priority
                            />
                        </div>
                    </div>

                    {/* Правая часть — Информация */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-4 mb-3">
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-2xl text-sm font-medium">
                  {car.year} год
                </span>
                                <span className="bg-zinc-100 text-zinc-700 px-4 py-1 rounded-2xl text-sm font-medium">
                  {car.type}
                </span>
                            </div>

                            <h1 className="text-5xl font-bold tracking-tight mb-2">
                                {car.brand} {car.model}
                            </h1>
                        </div>

                        {/* Цена */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm">
                            <div className="text-zinc-500 text-lg">Цена</div>
                            <div className="text-6xl font-bold text-blue-600 tracking-tighter mt-2">
                                {formatPrice(car.price)} ₽
                            </div>
                        </div>

                        {/* Характеристики */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm">
                            <h3 className="text-xl font-semibold mb-6">Характеристики</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 text-lg">
                                <div>
                                    <div className="text-zinc-500">Пробег</div>
                                    <div className="font-medium">{car.mileage.toLocaleString('ru-RU')} км</div>
                                </div>
                                <div>
                                    <div className="text-zinc-500">Тип кузова</div>
                                    <div className="font-medium">{car.type}</div>
                                </div>
                                <div>
                                    <div className="text-zinc-500">Топливо</div>
                                    <div className="font-medium">{car.fuel || '—'}</div>
                                </div>
                                <div>
                                    <div className="text-zinc-500">Коробка передач</div>
                                    <div className="font-medium">{car.transmission || '—'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Кнопки действий */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <Button
                                variant="primary"
                                size="lg"
                                className="flex-1 py-7 text-xl"
                                onClick={() => alert('Заявка отправлена! Менеджер свяжется с вами в ближайшее время.')}
                            >
                                Оставить заявку
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="flex-1 py-7 text-xl"
                                onClick={() => alert('Телефон: +7 (999) 123-45-67\nМы перезвоним вам в течение 5 минут')}
                            >
                                Позвонить менеджеру
                            </Button>
                        </div>

                        <p className="text-center text-sm text-zinc-500">
                            Гарантия юридической чистоты • Осмотр перед покупкой • Помощь с оформлением
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}