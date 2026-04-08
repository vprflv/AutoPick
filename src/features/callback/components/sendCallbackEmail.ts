'use server';

import { Resend } from 'resend';

interface CallbackEmailData {
    name: string;
    phone: string;
    email?: string;
    comment?: string;
    source?: string;
    privacy: boolean;
}

export async function sendCallbackEmail(data: CallbackEmailData) {
    console.log('=== SEND CALLBACK EMAIL STARTED ===');
    console.log('Received data:', {
        name: data.name,
        phone: data.phone,
        hasEmail: !!data.email,
        hasComment: !!data.comment,
        source: data.source
    });

    const apiKey = process.env.RESEND_API_KEY;

    console.log('RESEND_API_KEY from env:', apiKey ? 'PRESENT' : 'MISSING');
    console.log('RESEND_API_KEY length:', apiKey ? apiKey.length : 0);

    if (!apiKey) {
        console.error('❌ CRITICAL: RESEND_API_KEY is missing');
        return {
            success: false,
            error: 'Серверная ошибка конфигурации'
        };
    }

    try {
        const resend = new Resend(apiKey);

        const result = await resend.emails.send({
            from: 'AutoPick <onboarding@resend.dev>',
            to: ['lex293408@gmail.com'],
            subject: `Новая заявка от ${data.name}`,
            html: `
                <h2>Новая заявка</h2>
                <p><strong>Имя:</strong> ${data.name}</p>
                <p><strong>Телефон:</strong> ${data.phone}</p>
                ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
                ${data.comment ? `<p><strong>Комментарий:</strong> ${data.comment}</p>` : ''}
                <p><strong>Источник:</strong> ${data.source || 'Неизвестно'}</p>
                <p><strong>Согласие:</strong> ${data.privacy ? 'Да' : 'Нет'}</p>
            `,
        });

        console.log('✅ Resend success:', result);
        return { success: true, data: result };

    } catch (err: any) {
        console.error('💥 Resend failed:', err);
        return {
            success: false,
            error: err.message || 'Не удалось отправить письмо'
        };
    }
}