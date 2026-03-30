'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from "@/src/components/ui/Button";
import Modal from "@/src/components/ui/Modal";
import {CallbackForm} from "@/src/components/Callback/CallbackForm";


export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl">
                            🚗
                        </div>
                        <div>
                            <div className="text-3xl font-bold tracking-tight">AutoPick</div>
                            <div className="text-xs text-zinc-500 -mt-1">подбор авто</div>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
                        <Link href="#catalog" className="hover:text-blue-600 transition-colors">Каталог</Link>
                        <Link href="#" className="hover:text-blue-600 transition-colors">Как это работает</Link>
                        <Link href="#" className="hover:text-blue-600 transition-colors">О нас</Link>
                        <Link href="#" className="hover:text-blue-600 transition-colors">Контакты</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="md"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Перезвоните мне
                        </Button>
                        <div>
                            <div className="hover:text-blue-600 transition-colors" variant="primary" size="md">+7 (999)
                                123-45-67
                            </div>
                            <div className="text-gray-600 transition-colors">Красноярск</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Модальное окно */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Перезвоните мне"
            >
                <CallbackForm
                    onSuccess={() => setIsModalOpen(false)} source={"Главная страница сайта"}
                />
            </Modal>
        </>
    );
}