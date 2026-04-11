'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { createPortal } from 'react-dom';

interface CustomSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    className?: string;
}

export default function CustomSelect({
                                         value,
                                         onChange,
                                         options,
                                         placeholder = "Выберите...",
                                         className = "",
                                     }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            setButtonRect(buttonRef.current.getBoundingClientRect());
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (newValue: string) => {
        onChange(newValue);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={buttonRef as any}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl 
                           flex items-center justify-between text-left text-lg
                           focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none
                           transition-all ${className}`}
            >
                <span className={value === "all" ? "text-zinc-400" : ""}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && buttonRect && createPortal(
                <div
                    className="fixed bg-white border border-zinc-200 rounded-2xl shadow-2xl py-2 max-h-80 overflow-auto z-[9999]"
                    style={{
                        top: buttonRect.bottom + 8,
                        left: buttonRect.left,
                        width: buttonRect.width,
                    }}
                    onMouseDown={(e) => e.stopPropagation()}   // ← Добавили onMouseDown
                >
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onMouseDown={(e) => {                    // ← Изменили с onClick на onMouseDown
                                e.stopPropagation();
                                e.preventDefault();
                                handleSelect(option.value);
                            }}
                            className={`w-full px-5 py-3 text-left hover:bg-zinc-50 active:bg-zinc-100 transition-colors
                                ${option.value === value ? 'bg-blue-50 text-blue-600 font-medium' : 'text-zinc-700'}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
}