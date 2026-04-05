'use client';

import React from 'react';
import CustomSelect from "@/src/components/ui/CustomSelect";

interface FiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedBrand: string;
    setSelectedBrand: (value: string) => void;
    selectedType: string;
    setSelectedType: (value: string) => void;
    priceRange: { min: number; max: number };
    setPriceRange: (value: { min: number; max: number }) => void;
    sortBy: 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc';
    setSortBy: (value: 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc') => void;
    brands: string[];
    types: string[];
    resetFilters: () => void;
}

export default function Filters({
                                    searchTerm,
                                    setSearchTerm,
                                    selectedBrand,
                                    setSelectedBrand,
                                    selectedType,
                                    setSelectedType,
                                    priceRange,
                                    setPriceRange,
                                    sortBy,
                                    setSortBy,
                                    brands,
                                    types,
                                    resetFilters,
                                }: FiltersProps) {
    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24">
            <h3 className="text-2xl font-semibold mb-8">Фильтры</h3>

            {/* Поиск */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-500 mb-2">Поиск</label>
                <input
                    type="text"
                    placeholder="Марка или модель..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-blue-600 outline-none text-lg"
                />
            </div>

            {/* Марка */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-500 mb-2">Марка</label>
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

            {/* Тип автомобиля */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-500 mb-2">Тип автомобиля</label>
                <CustomSelect
                    value={selectedType}
                    onChange={setSelectedType}
                    options={[
                        { value: 'all', label: "Все типы" },
                        ...types
                            .filter(t => t !== "all")
                            .map(type => ({ value: type, label: type }))
                    ]}
                />
            </div>

            {/* Сортировка */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-500 mb-2">Сортировка</label>
                <CustomSelect
                    value={sortBy}
                    onChange={setSortBy}
                    options={[
                        { value: "price-desc", label: "Цена по убыванию" },
                        { value: "price-asc",  label: "Цена по возрастанию" },
                        { value: "year-desc",  label: "Сначала новые" },
                        { value: "year-asc",   label: "Сначала старые" },
                    ]}
                />
            </div>

            {/* Сброс фильтров */}
            <button
                onClick={resetFilters}
                className="mt-10 w-full py-4 text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 transition-colors"
            >
                Сбросить все фильтры ↺
            </button>
        </div>
    );
}