'use client';

import {useState} from "react";
import {sendCallbackEmail} from "@/src/features/callback/components/sendCallbackEmail";


interface CallbackFormData {
    name: string;
    phone: string;
    email?: string;
    comment?: string;
    source?: string;
    privacy:boolean
}


export function useSendEmail() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const sendEmail = async (data: CallbackFormData): Promise<boolean> => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);


        try{
            const result = await sendCallbackEmail(data);

            if (result.success) {
                setSuccess(true);
                return true;
            } else {
                setError(result.error || 'Не удалось отправить заявку');
                return false;
            }


        }catch(err:any){
            const errorMessage = err.message || 'Произошла неожиданная ошибка';
            setError(errorMessage);
            console.error('Ошибка отправки заявки:', err);
            return false;
        }finally {
            setIsSubmitting(false);
        }
    }

    const resetState = () => {
        setError(null);
        setSuccess(false);
    };

    return {
        sendEmail,
        isSubmitting,
        error,
        success,
        resetState,
    };
}