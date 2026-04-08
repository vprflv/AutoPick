'use server';

import { Resend } from 'resend';



interface CallbackEmailData {
    name: string;
    phone: string;
    email?: string;
    comment?: string;
    source?: string;
    privacy:boolean
}


export async function sendCallbackEmail(data: CallbackEmailData) {
    try{

        const apiKey = process.env.RESEND_API_KEY || "re_ULBpYCK9_2gi9Y4p2GUyokdM3uodT3VH3";

        console.log('🔑 RESEND_API_KEY exists:', !!apiKey);
        console.log('🔑 RESEND_API_KEY length:', apiKey ? apiKey.length : 0);

        if (!apiKey) {
            console.error('❌ RESEND_API_KEY is missing or empty');
            return {
                success: false,
                error: 'Серверная ошибка: API ключ Resend не настроен'
            };
        }

        const resend = new Resend(process.env.RESEND_API_KEY);





        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is missing in environment variables');
        }

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
          <strong>Согласие на обработку данных :${data.privacy}</strong>
          <hr>
        
        
        <p><small>Отправлено: ${new Date().toLocaleString('ru-RU')}</small></p>
      `,
        });
        if (error) {
            console.error('Resend error:', error);
            return { success: false, error: error.message };
        }
        return { success: true, data: emailData };

    }catch(error:any){
        return { success: false, error: error.message || 'Не удалось отправить письмо' };
    }
}