import React from "react";


interface PriceRangeFilter {
    priceRange:{ min: number; max: number }
    setPriceRange: (value: { min: number; max: number }) => void;
}


export function PriceRangeFilter({priceRange, setPriceRange }:PriceRangeFilter){
    return (
        <div className="mb-6 lg:mb-8">
            <label className="block text-sm font-medium text-zinc-500 mb-3">Цена (₽)</label>
            <div className="flex gap-3">
                <div className="flex-1">
                    <input
                        type="text"

                        placeholder="От"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({
                            min: Number(e.target.value) || 0,
                            max: priceRange.max
                        })}
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl
                                       focus:border-blue-600 outline-none text-base"
                    />
                </div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="До"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({
                            min: priceRange.min,
                            max: Number(e.target.value) || 0
                        })}
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl
                                       focus:border-blue-600 outline-none text-base"
                    />
                </div>
            </div>
        </div>
    )

}