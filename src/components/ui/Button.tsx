import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export default function Button({
                                   children,
                                   variant = 'primary',
                                   size = 'md',
                                   className = '',
                                   ...props
                               }: ButtonProps) {
    const base = 'rounded-2xl font-medium transition-all active:scale-95 flex items-center justify-center';

    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-zinc-900 hover:bg-zinc-800 text-white',
        outline: 'border border-zinc-300 hover:bg-zinc-100 text-zinc-700',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-10 py-5 text-lg',
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}