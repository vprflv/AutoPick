'use client';

import Button from "@/src/components/ui/Button";
import Link from "next/link";
import Header from "@/src/components/Header/Header";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <Header/>

            <div className="max-w-5xl mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-tight mb-6">О нас</h1>
                    <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
                        AutoPick — это современный сервис подбора автомобилей, который помогает людям покупать машины быстро, безопасно и выгодно.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h2 className="text-4xl font-semibold mb-6">Наша миссия</h2>
                        <p className="text-lg text-zinc-600 leading-relaxed mb-6">
                            Мы верим, что покупка автомобиля должна быть приятным и прозрачным процессом, а не источником стресса.
                            Поэтому мы взяли на себя всю сложную работу: поиск, проверку, переговоры и оформление.
                        </p>
                        <p className="text-lg text-zinc-600 leading-relaxed">
                            С 2023 года мы помогли более 1200 клиентам приобрести автомобиль своей мечты.
                        </p>
                    </div>
                    <div className="bg-white rounded-3xl p-12 shadow-xl">
                        <div className="text-7xl mb-6">🚗</div>
                        <div className="space-y-8">
                            <div>
                                <div className="text-4xl font-bold text-blue-600">1200+</div>
                                <div className="text-zinc-500">Довольных клиентов</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-blue-600">98%</div>
                                <div className="text-zinc-500">Рекомендуют нас друзьям</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-blue-600">4.9</div>
                                <div className="text-zinc-500">Средняя оценка</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-16">
                    <h2 className="text-4xl font-semibold text-center mb-12">Почему выбирают нас</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: "🔍",
                                title: "Честный подбор",
                                desc: "Мы показываем только реальные варианты и всегда говорим правду о состоянии автомобиля."
                            },
                            {
                                icon: "🛡️",
                                title: "Полная проверка",
                                desc: "Юридическая чистота, диагностика, история обслуживания — всё проверяем сами."
                            },
                            {
                                icon: "🤝",
                                title: "Поддержка на всех этапах",
                                desc: "От первой заявки до постановки на учёт — мы рядом с вами."
                            }
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="text-5xl mb-6">{item.icon}</div>
                                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-zinc-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}