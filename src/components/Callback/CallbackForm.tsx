'use client';

import React, {useState} from "react";
import Button from "@/src/components/ui/Button";
import {sendCallbackEmail} from "@/src/features/actions/sendCallbackEmail";
import {useRouter} from "next/navigation";

interface CallbackFormProps {
    onSuccess?: () => void;
    source?: string;
}

export function CallbackForm({ onSuccess,source = 'Неизвестная страница' }: CallbackFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        comment: '',
        source: source,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

       try{
           // отправк
           const result = await sendCallbackEmail(formData);

           if (result.success) {
               router.push('/success')

               // Сброс формы
               setFormData({ name: '', phone: '', email: '', comment: '' , source});

               // Закрываем модальное окно
               onSuccess?.();
           } else {
               setError(result.error || 'Не удалось отправить заявку. Попробуйте позже.');
           }
       }catch(err:any){

           setError('Произошла неожиданная ошибка. Попробуйте позже.')
       }finally {
           setIsSubmitting(false);
       }
    };



   return (
       <form onSubmit={handleSubmit} className="space-y-6">
           <div>
               <label className="block text-sm font-medium text-zinc-700 mb-2">
                   ФИО <span className="text-red-500">*</span>
               </label>

               <input
                   type="text"
                   name="name"
                   required
                   value={formData.name}
                   onChange={handleChange}
                   placeholder="Иванов Иван Иванович"
                   className="w-full px-5 py-4 border border-zinc-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                   disabled={isSubmitting}
               />

               <input type="hidden" name="source" value={formData.source}/>
           </div>


           <div>
               <label className="block text-sm font-medium text-zinc-700 mb-2">
                   Номер телефона <span className="text-red-500">*</span>
               </label>
               <input
                   type="tel"
                   name="phone"
                   required
                   value={formData.phone}
                   onChange={handleChange}
                   placeholder="+7 (999) 123-45-67"
                   className="w-full px-5 py-4 border border-zinc-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                   disabled={isSubmitting}
               />
           </div>

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
                   className="w-full px-5 py-4 border border-zinc-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                   disabled={isSubmitting}
               />
           </div>

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
                   className="w-full px-5 py-4 border border-zinc-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors resize-y min-h-[100px]"
                   disabled={isSubmitting}
               />
           </div>

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
   )
}


