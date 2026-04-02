'use client';

import Button from "@/src/components/ui/Button";
import Link from "next/link";
import Header from "@/src/components/Header/Header";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Шапка */}
            <Header />

            {/* Основной контент */}
            <div className="max-w-5xl mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-tight mb-6">
                        Как это работает
                    </h1>
                    <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
                        Мы упростили процесс покупки автомобиля. Всего 4 простых шага — и вы за рулём новой машины.
                    </p>
                </div>

                {/* Шаги */}
                <div className="space-y-24">
                    {/* Шаг 1 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl text-2xl font-semibold mb-6">
                                1
                            </div>
                            <h2 className="text-4xl font-semibold mb-4">Оставьте заявку</h2>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                Заполните простую форму: укажите желаемую марку, модель, бюджет и предпочтения.
                                Это займёт меньше минуты. Наши специалисты сразу начнут подбирать для вас подходящие варианты.
                            </p>
                        </div>
                        <div className="bg-white rounded-3xl p-10 shadow-xl">
                            <div className="aspect-video bg-zinc-100 rounded-2xl flex items-center justify-center text-6xl">
                                📋
                            </div>
                        </div>
                    </div>

                    {/* Шаг 2 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="md:order-2">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl text-2xl font-semibold mb-6">
                                2
                            </div>
                            <h2 className="text-4xl font-semibold mb-4">Мы подбираем автомобили</h2>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                Наши эксперты анализируют рынок и подбирают для вас 5–7 лучших вариантов,
                                которые полностью соответствуют вашим требованиям и бюджету.
                                Вы получаете подробный отчёт по каждому автомобилю.
                            </p>
                        </div>
                        <div className="md:order-1 bg-white rounded-3xl p-10 shadow-xl">
                            <div className="aspect-video bg-zinc-100 rounded-2xl flex items-center justify-center text-6xl">
                                🔍
                            </div>
                        </div>
                    </div>

                    {/* Шаг 3 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl text-2xl font-semibold mb-6">
                                3
                            </div>
                            <h2 className="text-4xl font-semibold mb-4">Осмотр и проверка</h2>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                Вы выбираете понравившийся автомобиль. Мы организуем осмотр с выездным специалистом.
                                Проводим полную диагностику, проверяем юридическую чистоту и историю автомобиля.
                            </p>
                        </div>
                        <div className="bg-white rounded-3xl p-10 shadow-xl">
                            <div className="aspect-video bg-zinc-100 rounded-2xl flex items-center justify-center text-6xl">
                                🔧
                            </div>
                        </div>
                    </div>

                    {/* Шаг 4 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="md:order-2">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl text-2xl font-semibold mb-6">
                                4
                            </div>
                            <h2 className="text-4xl font-semibold mb-4">Оформление и покупка</h2>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                Помогаем с оформлением документов, кредитом или trade-in.
                                Вы получаете автомобиль с гарантией юридической чистоты и нашей поддержкой после покупки.
                            </p>
                        </div>
                        <div className="md:order-1 bg-white rounded-3xl p-10 shadow-xl">
                            <div className="aspect-video bg-zinc-100 rounded-2xl flex items-center justify-center text-6xl">
                                🎉
                            </div>
                        </div>
                    </div>
                </div>

                {/* Финальный блок */}
                <div className="mt-24 bg-white rounded-3xl p-16 text-center shadow">
                    <h3 className="text-3xl font-semibold mb-4">
                        Готовы найти свой идеальный автомобиль?
                    </h3>
                    <p className="text-zinc-600 text-lg mb-8 max-w-md mx-auto">
                        Наши специалисты уже готовы помочь вам. Это бесплатно и ни к чему не обязывает.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="primary" size="lg" className="px-10">
                            Оставить заявку
                        </Button>
                        <Button variant="outline" size="lg" className="px-10">
                            Позвонить нам
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}