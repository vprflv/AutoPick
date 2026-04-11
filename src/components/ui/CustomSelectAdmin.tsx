'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface CustomSelectProps {
    key:string
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    className?: string;
    label?: string;           // Добавил для удобства
}

export function CustomSelectAdmin({
                                         value,
                                         onChange,
                                         options,
                                         placeholder = "Выберите...",
                                         className = "",
                                         label, key
                                     }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            {label && (
                <label className="block text-sm mb-2 text-zinc-400">{label}</label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl 
                           flex items-center justify-between text-left text-lg
                           focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                           outline-none transition-all hover:border-zinc-600 ${className}`}
            >
                <span className={value === "" || !selectedOption ? "text-zinc-500" : "text-white"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl py-2 max-h-80 overflow-auto">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`w-full px-5 py-3 text-left hover:bg-zinc-800 transition-colors
                                ${option.value === value
                                ? 'bg-blue-950 text-blue-400 font-medium'
                                : 'text-zinc-300 hover:text-white'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}