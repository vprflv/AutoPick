'use client';

import React from "react";
import Button from "@/src/components/ui/Button";
import { useSendEmail } from "@/src/features/callback/hooks/useSendEmail";


interface CallbackFormProps {
    source?: string;           // откуда пришла форма (например: "Главная страница", "Страница автомобиля Toyota Camry")
    onSuccess?: () => void;    // опционально: что делать после успешной отправки
}

export function CallbackForm({ source = "Главная страница", }: CallbackFormProps) {


    const {
        formData,
        handleChange,
        handleConsentChange,
        handleSubmit,
        isSubmitting,
        error,
        consent,
    } = useSendEmail(source);   // передаём source в хук

    return (
        <div className="pt-4 pl-4 pb-6 max-h-[85vh] overflow-y-auto pr-2 custom-scroll">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Имя */}
                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                        ФИО <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Иванов Иван Иванович"
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl
                                   focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none
                                   text-base transition-all disabled:bg-zinc-100"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Телефон */}
                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Номер телефона <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+7 (999) 123-45-67"
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl
                                   focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none
                                   text-base transition-all disabled:bg-zinc-100"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Email (необязательно)
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@mail.ru"
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl
                                   focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none
                                   text-base transition-all disabled:bg-zinc-100"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Комментарий */}
                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Комментарий (что вас интересует?)
                    </label>
                    <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="Напишите здесь любые пожелания, вопросы или дополнительную информацию..."
                        rows={4}
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl
                                   focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none
                                   resize-y min-h-[110px] text-base transition-all disabled:bg-zinc-100"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Согласие */}
                <div className="flex items-start gap-3 pt-2">
                    <input
                        type="checkbox"
                        id="consent"
                        checked={consent}
                        onChange={handleConsentChange}
                        className="mt-1.5 w-5 h-5 accent-blue-600 cursor-pointer"
                        required
                    />
                    <label
                        htmlFor="consent"
                        className="text-sm text-zinc-600 leading-relaxed cursor-pointer select-none"
                    >
                        Я даю своё согласие на обработку персональных данных в соответствии с{' '}
                        <a
                            href="/privacy-policy"
                            target="_blank"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Политикой конфиденциальности
                        </a>
                    </label>
                </div>

                {/* Ошибка */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm">
                        {error}
                    </div>
                )}

                {/* Кнопка отправки */}
                <div className="pt-4">
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full py-6 text-lg font-medium shadow-lg shadow-blue-500/20"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Отправляем заявку...' : 'Отправить заявку'}
                    </Button>
                </div>

                <p className="text-center text-xs text-zinc-500 pt-2">
                    Мы свяжемся с вами в течение 15 минут
                </p>
            </form>
        </div>
    );
}