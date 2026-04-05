// src/features/catalog/hooks/usePagination.ts

import { useState, useMemo } from 'react';

interface UsePaginationProps {
    items: any[];
    itemsPerPage: number;
}

export function usePagination({ items, itemsPerPage }: UsePaginationProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage) || 1;

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [items, currentPage, itemsPerPage]);

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return {
        currentItems,
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1,
        totalItems: items.length,   // полезно для отображения
    };
}