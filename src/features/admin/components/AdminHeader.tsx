'use client';

import Link from 'next/link';
import {useRouter} from "next/navigation";

export function AdminHeader() {
    const router = useRouter();

    const handleLogout = () => {
        if (confirm('Вы действительно хотите выйти из админ-панели?')) {
            // Пока просто возвращаем на главную
            // В будущем здесь можно добавить очистку localStorage или токена
            router.push('/');
        }
    };

    return (
        <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

                {/* Левая часть - Логотип и название */}
                <div className="flex items-center gap-4">
                    <div
                        className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                        ⚙️
                    </div>
                    <div>
                        <div className="text-2xl font-bold tracking-tight text-white">Admin Panel</div>
                        <div className="text-xs text-zinc-500">AutoPick — Управление автомобилями</div>
                    </div>
                </div>

                {/* Центральная навигация */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

                </nav>

                {/* Правая часть - Действия */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:block text-right">
                        <div className="text-sm text-zinc-400">Администратор</div>
                        <div className="text-xs text-emerald-400">Онлайн</div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-2xl text-sm font-medium transition-all hover:text-white"
                    >
                        Выйти
                        <span className="text-lg">↩︎</span>
                    </button>
                </div>
            </div>
        </header>
    )

}