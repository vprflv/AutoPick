'use client';

import { useRouter } from 'next/navigation';
import Button from "@/src/components/ui/Button";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
            <div className="max-w-md text-center">
                {/* Иконка */}
                <div className="mx-auto mb-8 w-24 h-24 rounded-full bg-zinc-900 flex items-center justify-center">
                    <span className="text-6xl">🚗</span>
                </div>

                <h1 className="text-7xl font-bold text-white mb-4">404</h1>
                <h2 className="text-3xl font-semibold mb-6">Автомобиль не найден</h2>

                <p className="text-zinc-400 text-lg mb-10">
                    К сожалению, страница, которую вы ищете, не существует или автомобиль был удалён.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => router.push('/')}
                        className="px-8"
                    >
                        Вернуться на главную
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => router.back()}
                        className="px-8"
                    >
                        Назад
                    </Button>
                </div>

                <p className="mt-12 text-sm text-zinc-500">
                    AutoPick © {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
}