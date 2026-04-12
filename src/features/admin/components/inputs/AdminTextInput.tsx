'use client';

import React from 'react';



interface AdminTextInputProps {
    label: string;
    type?: 'text' | 'number';
    value: string | number| 'numeric';
    onChange: (value: string | number) => void;
    required?: boolean;
    placeholder?: string;
    isNumeric?: boolean;
}


export function AdminTextInput({
                                   label,
                                   type = 'text',
                                   value,
                                   onChange,
                                   required = false,
                                   placeholder,
                                   isNumeric = false,
                               }: AdminTextInputProps){

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (isNumeric) {
            // Разрешаем только цифры и пустую строку
            if (inputValue === '' || /^\d*$/.test(inputValue)) {
                onChange(inputValue === '' ? '' : Number(inputValue));
            }
        } else {
            onChange(inputValue);
        }
    };


    return (
        <div>
            <label className="block text-sm mb-2 text-zinc-400">
                {label}
            </label>
            <input
                type={isNumeric ? "text" : "text"}
                inputMode={isNumeric ? "numeric" : undefined}
                value={value}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white
                           focus:outline-none focus:border-blue-500 transition-colors"
                required={required}
                placeholder={placeholder}
            />
        </div>
    )

}

