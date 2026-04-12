'use client';

import React from 'react';



interface AdminTextInputProps {
    label: string;
    type?: 'text' | 'number';
    value: string | number;
    onChange: (value: string | number) => void;
    required?: boolean;
    placeholder?: string;
}


export function AdminTextInput({
                                   label,
                                   type = 'text',
                                   value,
                                   onChange,
                                   required = false,
                                   placeholder,
                               }: AdminTextInputProps){

    return (
        <div>
            <label className="block text-sm mb-2 text-zinc-400">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(type === 'number' ? Number(e.target.value) || 0 : e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
                required={required}
                placeholder={placeholder}
            />
        </div>
    )

}

