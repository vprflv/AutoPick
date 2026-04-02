'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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