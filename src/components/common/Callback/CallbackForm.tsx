'use client';

import React, { useState } from "react";
import Button from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";
import { useSendEmail } from "@/src/features/callback/hooks/useSendEmail";

interface CallbackFormProps {
    onSuccess?: () => void;
    source?: string;
}

export function CallbackForm({ onSuccess, source = 'Неизвестная страница' }: CallbackFormProps) {
    const { sendEmail, isSubmitting, error, resetState } = useSendEmail();
    const router = useRouter();

    const [consent, setConsent] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        comment: '',
        source: source,
        privacy: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) resetState();
    };

    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setConsent(isChecked);
        setFormData(prev => ({ ...prev, privacy: isChecked }));
        if (error) resetState();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await sendEmail(formData);

        if (success) {
            router.push('/success');
            setFormData({
                name: '',
                phone: '',
                email: '',
                comment: '',
                source: source,
                privacy: false,
            });
            setConsent(false);
            onSuccess?.();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-5 px-1">

            {/* ФИО */}
            <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    ФИО <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Иванов Иван Иванович"
                    className="w-full px-4 py-3.5 border border-zinc-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors text-base"
                    disabled={isSubmitting}
                />
            </div>

            {/* Телефон */}
            <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Номер телефона <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 123-45-67"
                    className="w-full px-4 py-3.5 border border-zinc-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors text-base"
                    disabled={isSubmitting}
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Email (необязательно)
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.ru"
                    className="w-full px-4 py-3.5 border border-zinc-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors text-base"
                    disabled={isSubmitting}
                />
            </div>

            {/* Комментарий — скрываем только на экранах меньше 400px */}
            <div className="hidden [@media(min-width:399px)]:block">
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Комментарий
                </label>
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Что вас интересует? (необязательно)"
                    rows={3}
                    className="w-full px-4 py-3.5 border border-zinc-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors resize-y min-h-[80px] text-base"
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
                    required
                    className="mt-1 w-5 h-5 accent-blue-600 cursor-pointer flex-shrink-0"
                    disabled={isSubmitting}
                />
                <label
                    htmlFor="consent"
                    className="text-sm text-zinc-600 leading-snug cursor-pointer select-none"
                >
                    Я даю согласие на обработку персональных данных согласно{' '}
                    <a
                        href="/privacy-policy"
                        target="_blank"
                        className="text-blue-600 hover:underline"
                    >
                        Политике конфиденциальности
                    </a>
                </label>
            </div>

            {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-2xl text-sm">
                    {error}
                </div>
            )}

            {/* Кнопка отправки */}
            <div className="pt-6">
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full py-4 text-base font-medium"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
                </Button>
            </div>

            <p className="text-center text-xs text-zinc-500">
                Мы свяжемся с вами в течение 15 минут
            </p>
        </form>
    );
}