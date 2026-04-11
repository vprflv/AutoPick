'use client';

import { useState, useMemo } from 'react';
import { useGetInitialCars } from "@/src/shared/hooks/useGetInitialCars";
import {FiltersCar} from "@/src/shared/types/types";

export function useCarFilter() {
    const { cars = [] } = useGetInitialCars();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState<'all' | string>('all');
    const [selectedType, setSelectedType] = useState<'all' | string>('all');
    const [priceRange, setPriceRange] = useState({ min: 500000, max: 100000000 });
    const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'year-desc' | 'year-asc'>('price-desc');

    const brands = ['all', ...new Set(cars.map(car => car.brand || ''))];
    const types = ['all', ...new Set(cars.map(car => car.type || ''))];

    const filteredAndSortedCars = useMemo(() => {
        let result = [...cars];

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(car =>
                `${car.brand} ${car.model}`.toLowerCase().includes(term)
            );
        }

        if (selectedBrand !== 'all') {
            result = result.filter(car => car.brand === selectedBrand);
        }

        if (selectedType !== 'all') {
            result = result.filter(car => car.type === selectedType);
        }

        result = result.filter(car =>
            car.price >= priceRange.min && car.price <= priceRange.max
        );

        // Сортировка
        if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
        if (sortBy === 'year-desc') result.sort((a, b) => b.year - a.year);
        if (sortBy === 'year-asc') result.sort((a, b) => a.year - b.year);

        return result;
    }, [cars, searchTerm, selectedBrand, selectedType, priceRange, sortBy]);

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedBrand('all');
        setSelectedType('all');
        setPriceRange({ min: 500000, max: 100000000 });
        setSortBy('price-desc');
    };

    return {
        cars: filteredAndSortedCars,
        brands,
        types,
        totalCount: cars.length,
        filters: {
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
        } as FiltersCar,
        resetFilters,
    };
}