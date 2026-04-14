'use client';

export function CatalogSkeleton() {
    return (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-white rounded-3xl overflow-hidden border border-zinc-100 animate-pulse"
                >
                    {/* Изображение */}
                    <div className="h-64 bg-zinc-200" />

                    <div className="p-6 space-y-4">
                        {/* Название */}
                        <div className="h-7 bg-zinc-200 rounded w-3/4" />

                        {/* Характеристики */}
                        <div className="space-y-3">
                            <div className="h-4 bg-zinc-200 rounded w-1/2" />
                            <div className="h-4 bg-zinc-200 rounded w-2/3" />
                            <div className="h-4 bg-zinc-200 rounded w-1/3" />
                        </div>

                        {/* Цена + кнопка */}
                        <div className="flex justify-between items-end pt-4 border-t border-zinc-100">
                            <div className="space-y-2">
                                <div className="h-3 bg-zinc-200 rounded w-12" />
                                <div className="h-8 bg-zinc-200 rounded w-24" />
                            </div>
                            <div className="h-10 bg-zinc-200 rounded-2xl w-28" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}