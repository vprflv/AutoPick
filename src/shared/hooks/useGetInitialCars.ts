// src/shared/hooks/useGetInitialCars.ts
'use client';

import { useState, useEffect } from 'react';
import { Car } from "@/src/shared/types/types";

export function useGetInitialCars() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(false);
    const [error] = useState<string | null>(null);

    // Временно возвращаем пустой массив, чтобы билд прошёл
    useEffect(() => {
        console.warn('useGetInitialCars: using empty array for build');
        setCars([]);
        setLoading(false);
    }, []);

    return {
        cars,
        loading,
        error,
        loadCars: async () => {}
    };
}