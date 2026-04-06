// src/shared/hooks/useGetInitialCars.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Car } from "@/src/shared/types/types";

export function useGetInitialCars() {
    const [cars] = useState<Car[]>([]);
    const [loading] = useState(false);
    const [error] = useState<string | null>(null);

    const loadCars = useCallback(async () => {
        console.warn('useGetInitialCars: заглушка для успешного билда');
    }, []);

    useEffect(() => {
        loadCars();
    }, [loadCars]);

    return {
        cars,
        loading,
        error,
        loadCars
    };
}