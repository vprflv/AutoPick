'use client';

import Header from "@/src/components/common/Header/Header";
import {CallbackForm} from "@/src/features/callback/components/CallbackForm";

export default function ContactsPage() {
    return (
        <div className="min-h-screen bg-zinc-50">

            <Header/>

            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-tight mb-6">Контакты</h1>
                    <p className="text-xl text-zinc-600">Мы всегда на связи и готовы помочь вам</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Левый блок */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">Свяжитесь с нами</h2>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">📞</div>
                                    <div>
                                        <div className="font-medium text-lg">Телефон</div>
                                        <p className="text-2xl font-semibold text-blue-600">
                                            +7 (999) 123-45-67
                                        </p>
                                        <p className="text-zinc-500 mt-1">Ежедневно с 9:00 до 21:00</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">✉️</div>
                                    <div>
                                        <div className="font-medium text-lg">Email</div>
                                        <a href="mailto:info@autopick.ru" className="text-xl text-zinc-700 hover:text-blue-600">
                                            info@autopick.ru
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">📍</div>
                                    <div>
                                        <div className="font-medium text-lg">Адрес</div>
                                        <p className="text-zinc-700">Красноярск, ул. Профсоюзная, д. 120, офис 304</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Правый блок */}
                    <div className="bg-white rounded-3xl p-10 shadow-xl">
                        <h2 className="text-2xl font-semibold mb-8">Напишите нам</h2>
                        <CallbackForm />

                    </div>
                </div>

                <div className="mt-20 text-center text-zinc-500">
                    <p>Мы ответим вам в течение 15 минут в рабочее время</p>
                </div>
            </div>
        </div>
    );
}