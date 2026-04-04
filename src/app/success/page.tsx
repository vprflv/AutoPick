'use client';


import { useRouter } from 'next/navigation';
import Button from '@/src/components/ui/Button';

export default function SuccessPage() {
    const router = useRouter();



    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">
                {/* Иконка успеха */}
                <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                    <span className="text-6xl">✅</span>
                </div>

                <h1 className="text-4xl font-bold text-zinc-900 mb-4">
                    Заявка отправлена!
                </h1>

                <p className="text-xl text-zinc-600 mb-8">
                    Спасибо! Наш менеджер свяжется с вами в ближайшее время.
                </p>

                <div className="bg-white rounded-3xl p-8 shadow-sm mb-10">
                    <p className="text-zinc-500 mb-2">Мы обычно отвечаем в течение</p>
                    <p className="text-2xl font-semibold text-green-600">15 минут</p>
                </div>

                <div className="space-y-4">
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full py-6 text-lg"
                        onClick={() => router.push('/')}
                    >
                        Вернуться на главную
                    </Button>

                </div>
            </div>
        </div>
    );
}