'use client';

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {sendCallbackEmail} from "@/src/features/callback/components/sendCallbackEmail";


interface CallbackFormData {
    name: string;
    phone: string;
    email?: string;
    comment?: string;
    source?: string;
    privacy: boolean;
}

interface UseSendEmailReturn {
    sendEmail: (data: CallbackFormData) => Promise<boolean>;
    isSubmitting: boolean;
    error: string | null;
    success: boolean;
    resetState: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleConsentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: CallbackFormData;
    consent: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useSendEmail(defaultSource: string = 'Неизвестная страница'): UseSendEmailReturn {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState<CallbackFormData>({
        name: '',
        phone: '',
        email: '',
        comment: '',
        source: defaultSource,
        privacy: false,
    });

    const [consent, setConsent] = useState(false);

    // Основная функция отправки
    const sendEmail = useCallback(async (data: CallbackFormData): Promise<boolean> => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await sendCallbackEmail(data);

            if (result.success) {
                setSuccess(true);
                return true;
            } else {
                const errorMsg = result.error || 'Не удалось отправить заявку';
                setError(errorMsg);
                return false;
            }
        } catch (err: any) {
            const errorMessage = err.message || 'Произошла неожиданная ошибка';
            setError(errorMessage);
            console.error('Ошибка отправки заявки:', err);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const resetState = useCallback(() => {
        setError(null);
        setSuccess(false);
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) resetState();
    }, [error, resetState]);

    const handleConsentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setConsent(isChecked);
        setFormData(prev => ({ ...prev, privacy: isChecked }));
        if (error) resetState();
    }, [error, resetState]);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isSuccess = await sendEmail(formData);

        if (isSuccess) {
            router.push('/success');
            // Сброс формы
            setFormData({
                name: '',
                phone: '',
                email: '',
                comment: '',
                source: defaultSource,
                privacy: false,
            });
            setConsent(false);
        }
    }, [sendEmail, formData, router, defaultSource]);

    return {
        sendEmail,
        isSubmitting,
        error,
        success,
        resetState,
        handleChange,
        handleConsentChange,
        formData,
        consent,
        handleSubmit,
    };
}