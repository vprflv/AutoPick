import Link from "next/link";
import Button from "@/src/components/ui/Button";
import {useCallback, useState} from "react";


interface PropsHeaderMobileMenu{
    setIsMenuOpen:(boolean)=>void
    setIsModalOpen:(boolean)=>void
}

export function HeaderMobileMenu({setIsMenuOpen, setIsModalOpen}: PropsHeaderMobileMenu){

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <div className="xl:hidden mt-6 pt-6 border-t border-zinc-100 pb-10 bg-white z-[90] relative">
            <nav className="flex flex-col gap-3 text-[17px] font-medium">
                <Link
                    href="/#catalog"
                    className="py-2 px-5 hover:bg-zinc-100 rounded-2xl active:bg-zinc-200 transition-colors"
                    onClick={closeMenu}
                >
                    Каталог
                </Link>
                <Link
                    href="/howitworks"
                    className="py-2 px-5 hover:bg-zinc-100 rounded-2xl active:bg-zinc-200 transition-colors"
                    onClick={closeMenu}
                >
                    Как это работает
                </Link>
                <Link
                    href="/about"
                    className="py-2 px-5 hover:bg-zinc-100 rounded-2xl active:bg-zinc-200 transition-colors"
                    onClick={closeMenu}
                >
                    О нас
                </Link>
                <Link
                    href="/contacts"
                    className="py-2 px-5 hover:bg-zinc-100 rounded-2xl active:bg-zinc-200 transition-colors"
                    onClick={closeMenu}
                >
                    Контакты
                </Link>
            </nav>

            <div className="mt-10 flex flex-col gap-3">
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full py-4"
                    onClick={() => {
                        setIsModalOpen(true);
                        closeMenu();
                    }}
                >
                    Перезвоните мне
                </Button>

                <div className="">
                    <p >
                        <span>тел. </span> <span className="text-blue-500">+7 (999) 123-45-67</span>
                    </p>
                    <p>г.Красноярск</p>
                </div>

            </div>
        </div>
    )
}