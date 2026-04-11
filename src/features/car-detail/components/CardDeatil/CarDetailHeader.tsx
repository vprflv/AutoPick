'use client';

interface CarDetailHeaderProps {
    onBack: () => void;
}

export function CarDetailHeader({ onBack }: CarDetailHeaderProps) {
    return (
        <div className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors text-sm sm:text-base font-medium"
                >
                    ← Назад к каталогу
                </button>
                <div className="font-bold text-2xl tracking-tight">AutoPick</div>
            </div>
        </div>
    );
}