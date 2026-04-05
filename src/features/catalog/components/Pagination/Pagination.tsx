'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    hasNext: boolean;
    hasPrev: boolean;
}

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       goToPage,
                                       nextPage,
                                       prevPage,
                                       hasNext,
                                       hasPrev,
                                   }: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-1 mt-16">
            {/* Стрелка назад */}
            <button
                onClick={prevPage}
                disabled={!hasPrev}
                className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-zinc-900 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
                <ChevronLeft size={22} />
            </button>

            {/* Номера страниц */}
            <div className="flex items-center gap-1 px-3">
                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {typeof page === "number" ? (
                            <button
                                onClick={() => goToPage(page)}
                                className={`w-9 h-9 rounded-xl text-sm font-medium transition-all
                                    ${currentPage === page
                                    ? "text-blue-600 font-semibold"
                                    : "text-zinc-600 hover:text-zinc-900"
                                }`}
                            >
                                {page}
                            </button>
                        ) : (
                            <span className="w-9 h-9 flex items-center justify-center text-zinc-400">
                                ...
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Стрелка вперед */}
            <button
                onClick={nextPage}
                disabled={!hasNext}
                className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-zinc-900 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
                <ChevronRight size={22} />
            </button>
        </div>
    );
}