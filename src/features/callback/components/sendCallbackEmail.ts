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
    try {
        const apiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;

        console.log('=== RESEND DEBUG ===');
        console.log('RESEND_API_KEY exists:', !!apiKey);
        console.log('RESEND_API_KEY length:', apiKey ? apiKey.length : 0);
        console.log('All env keys with RESEND:', Object.keys(process.env).filter(k => k.includes('RESEND')));
        console.log('===================');

        if (!apiKey) {
            console.error('❌ RESEND_API_KEY is missing');
            return {
                success: false,
                error: 'Серверная ошибка конфигурации'
            };
        }

        const resend = new Resend(apiKey);

        const { data: emailData, error } = await resend.emails.send({
            from: 'AutoPick <onboarding@resend.dev>',
            to: ['lex293408@gmail.com'],
            subject: `Новая заявка "Перезвоните мне" от ${data.name}`,
            html: `
                <h2>Новая заявка на обратный звонок</h2>
                <p><strong>Имя:</strong> ${data.name}</p>
                <p><strong>Телефон:</strong> ${data.phone}</p>
                ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
                ${data.comment ? `<p><strong>Комментарий:</strong><br>${data.comment.replace(/\n/g, '<br>')}</p>` : ''}
                <hr>
                <p><strong>Источник заявки:</strong> ${data.source || 'Неизвестно'}</p>
                <hr>
                <p><strong>Согласие на обработку данных:</strong> ${data.privacy ? 'Да' : 'Нет'}</p>
                <hr>
                <p><small>Отправлено: ${new Date().toLocaleString('ru-RU')}</small></p>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Письмо успешно отправлено');
        return { success: true, data: emailData };

    } catch (error: any) {
        console.error('💥 Ошибка отправки письма:', error);
        return {
            success: false,
            error: 'Не удалось отправить письмо. Попробуйте позже.'
        };
    }
}