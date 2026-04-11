'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option<T = string> {
    value: T;
    label: string;
}

interface CustomSelectProps<T = string> {
    value: T;
    onChange: (value: T) => void;
    options: Option<T>[];
    placeholder?: string;
    className?: string;
}

export default function CustomSelect<T = string>({
                                                     value,
                                                     onChange,
                                                     options,
                                                     placeholder = "Выберите...",
                                                     className = "",
                                                 }: CustomSelectProps<T>) {
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

    const handleSelect = (optionValue: T) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={ref}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-5 py-4 bg-white border border-zinc-200 rounded-2xl 
                           flex items-center justify-between text-left text-lg
                           hover:border-zinc-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 
                           outline-none transition-all ${className}`}
            >
                <span className={value === "all" ? "text-zinc-400" : "text-zinc-900"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-[9999] w-full mt-2 bg-white border border-zinc-200 rounded-2xl shadow-2xl py-2 max-h-80 overflow-auto">
                    {options.map((option) => (
                        <button
                            key={String(option.value)}
                            onClick={() => handleSelect(option.value)}
                            className={`w-full px-5 py-3 text-left hover:bg-zinc-50 active:bg-zinc-100 transition-colors
                                ${option.value === value
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-zinc-700'
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