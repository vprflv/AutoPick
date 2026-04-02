'use client';

import React from 'react';
import CustomSelect from '@/src/components/ui/CustomSelect';

interface FiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedBrand: string;
    setSelectedBrand: (value: string) => void;
    selectedType: string;
    setSelectedType: (value: string) => void;
    priceRange: { min: number; max: number };
    setPriceRange: (value: { min: number; max: number }) => void;
    sortBy: 'price-asc' | 'price-desc' | 'year-desc';
    setSortBy: (value: 'price-asc' | 'price-desc' | 'year-desc') => void;
    brands: string[];
    types: string[];
}

export default function Filters({
                                    searchTerm, setSearchTerm,
                                    selectedBrand, setSelectedBrand,
                                    selectedType, setSelectedType,
                                    priceRange, setPriceRange,
                                    sortBy, setSortBy,
                                    brands, types,
                                }: FiltersProps) {

    const inputClass = `w-full px-5 py-4 bg-zinc-50 border border-zinc-200 
                       rounded-2xl focus:border-blue-600 focus:ring-1 
                       focus:ring-blue-600 outline-none text-lg transition-all`;

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24 self-start">
            <h3 className="text-2xl font-semibold mb-8">Фильтры</h3>

            {/* Поиск */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-500 mb-2">Поиск</label>
                <input
                    type="text"
                    placeholder="Марка или модель..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={inputClass}
                />
            </div>

            {/* Марка автомобиля */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-500 mb-2">Марка автомобиля</label>
                <CustomSelect
                    value={selectedBrand}
                    onChange={setSelectedBrand}
                    options={[
                        { value: "all", label: "Все марки" },
                        ...brands
                            .filter(b => b !== "all")
                            .map(brand => ({ value: brand, label: brand }))
                    ]}
                />
            </div>

            {/* Тип кузова */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-500 mb-2">Тип кузова</label>
                <CustomSelect
                    value={selectedType}
                    onChange={setSelectedType}
                    options={[
                        { value: "all", label: "Любой тип" },
                        ...types
                            .filter(t => t !== "all")
                            .map(type => ({ value: type, label: type }))
                    ]}
                />
            </div>

            {/* Цена */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-500 mb-3">Цена (₽)</label>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="От"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) || 0 })}
                            className={inputClass}
                        />
                    </div>
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="До"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) || 100000000 })}
                            className={inputClass}
                        />
                    </div>
                </div>
            </div>

            {/* Сортировка */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-500 mb-2">Сортировка</label>
                <CustomSelect
                    value={sortBy}
                    onChange={(val) => setSortBy(val as 'price-asc' | 'price-desc' | 'year-desc')}
                    options={[
                        { value: "price-desc", label: "Цена по убыванию" },
                        { value: "price-asc", label: "Цена по возрастанию" },
                        { value: "year-desc", label: "Сначала новые" },
                    ]}
                />
            </div>

            {/* Кнопка сброса */}
            <button
                onClick={() => {
                    setSearchTerm('');
                    setSelectedBrand('all');
                    setSelectedType('all');
                    setPriceRange({ min: 500000, max: 100000000 });
                }}
                className="mt-10 w-full py-4 text-blue-600 hover:text-blue-700 font-medium
                           flex items-center justify-center gap-2 transition-colors hover:underline"
            >
                Сбросить все фильтры ↺
            </button>
        </div>
    );
}