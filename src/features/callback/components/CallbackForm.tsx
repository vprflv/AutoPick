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
        <div className=" pt-10 max-h-[85vh] overflow-y-auto pr-2 custom-scroll">
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
                    className="w-full px-5 py-4 border border-zinc-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors disabled:bg-zinc-100"
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
                    className="w-full px-5 py-4 border border-zinc-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors disabled:bg-zinc-100"
                    disabled={isSubmitting}
                />
            </div>

            {/* Email */}
            <div className="hidden min-[400px]:block">
                <label className=" block text-sm font-medium text-zinc-700 mb-2">
                    Email (необязательно)
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.ru"
                    className="w-full px-5 py-4 border border-zinc-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors disabled:bg-zinc-100"
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
                    className="w-full px-5 py-4 border border-zinc-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors resize-y min-h-[100px] disabled:bg-zinc-100"
                    disabled={isSubmitting}
                />
            </div>


            {/* Согласие на обработку данных */}
            <div className="flex items-start gap-3 pt-2">
                <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={handleConsentChange}
                    className="mt-1 w-5 h-5 accent-blue-600"
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
                        className="text-blue-600 hover:underline"
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
                    className="w-full py-4 text-lg font-medium"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
                </Button>
            </div>

            <p className="text-center text-xs text-zinc-500">
                Мы свяжемся с вами в течение 15 минут
            </p>
        </form>
        </div>
    );
}