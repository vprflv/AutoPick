'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import Button from "@/src/components/ui/Button";
import Modal from "@/src/components/ui/Modal";
import { CallbackForm } from "@/src/features/callback/components/CallbackForm";
import { Menu, X } from 'lucide-react';
import {HeaderMobileMenu} from "@/src/components/common/Header/mobile/HeaderMobileMenu";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, [isMenuOpen]);


    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">

                        {/* Лого */}
                        <Link href="/" className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl flex-shrink-0">
                                🚗
                            </div>
                            <div>
                                <div className="text-2xl font-bold tracking-tight">AutoPick</div>
                                <div className="text-xs text-zinc-500 -mt-1">подбор авто</div>
                            </div>
                        </Link>

                        {/* Десктоп навигация */}
                        <nav className="hidden xl:flex items-center gap-8 text-base font-medium">
                            <Link href="/#catalog" className="hover:text-blue-600 transition-colors">Каталог</Link>
                            <Link href="/howitworks" className="hover:text-blue-600 transition-colors">Как это
                                работает</Link>
                            <Link href="/about" className="hover:text-blue-600 transition-colors">О нас</Link>
                            <Link href="/contacts" className="hover:text-blue-600 transition-colors">Контакты</Link>
                        </nav>

                        {/* Десктоп кнопки */}
                        <div className="hidden xl:flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="md"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Перезвоните мне
                            </Button>
                            <Button variant="primary" size="md">
                                +7 (999) 123-45-67
                            </Button>
                        </div>

                        <button
                            onClick={toggleMenu}
                            className="xl:hidden p-5 -mr-5 text-zinc-800 active:bg-zinc-100 rounded-2xl transition-all z-[100] touch-manipulation select-none"
                            aria-label="Открыть меню"
                        >
                            {isMenuOpen ? (
                                <X size={34} strokeWidth={3}/>
                            ) : (
                                <Menu size={34} strokeWidth={3}/>
                            )}
                        </button>
                    </div>

                    {/* Мобильное меню */}
                    {isMenuOpen && (
                        <HeaderMobileMenu setIsMenuOpen={setIsMenuOpen} setIsModalOpen={setIsModalOpen}/>

                    )}
                </div>
            </header>

            {/* Модальное окно */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Перезвоните мне"
            >
                <CallbackForm
                />
            </Modal>
        </>
    );
}