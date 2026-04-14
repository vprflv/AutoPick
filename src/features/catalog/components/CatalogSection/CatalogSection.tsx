'use client';

import { useEffect } from 'react';
import Filters from "@/src/features/catalog/components/Filters/Filters";
import CarCard from "@/src/features/catalog/components/CarCard/CarCard";
import Pagination from "@/src/features/catalog/components/Pagination/Pagination";
import { CatalogSkeleton } from "./CatalogSkeleton";

import { useCarFilter } from "@/src/features/catalog/hooks/useCarFilter";
import { usePagination } from "@/src/features/catalog/hooks/usePagination";

export default function CatalogSection() {
    const {
        cars: filteredCars,
        brands,
        types,
        filters,
        resetFilters
    } = useCarFilter();

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

    const pagination = usePagination({
        items: filteredCars,
        itemsPerPage: 8,           // увеличил до 8 — выглядит лучше
    });

    // Сброс пагинации при изменении фильтров
    useEffect(() => {
        pagination.resetPagination?.();
    }, [
        filters.searchTerm,
        filters.selectedBrand,
        filters.selectedType,
        filters.priceRange,
        filters.sortBy,
    ]);

    return (
        <section id="catalog" className="py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

                    {/* Фильтры */}
                    <div className="lg:w-80 flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
                        <Filters
                            filters={filters}
                            brands={brands}
                            types={types}
                            resetFilters={resetFilters}
                        />
                    </div>

                    {/* Основная область с карточками */}
                    <div className="flex-1 flex flex-col min-h-[700px]">

                        {/* Заголовок с количеством */}
                        <div className="mb-6 flex justify-between items-center">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
                                Найдено автомобилей:
                                <span className="text-blue-600 ml-2">{filteredCars.length}</span>
                            </h2>
                        </div>

                        {/* Состояния загрузки / пусто / список */}
                        {filteredCars.length === 0 && !filters.searchTerm && !filters.selectedBrand && !filters.selectedType ? (
                            <CatalogSkeleton />                    // ← Скелетон при первой загрузке
                        ) : filteredCars.length === 0 ? (
                            <div className="flex-1 flex items-center justify-center py-20">
                                <div className="text-center">
                                    <p className="text-3xl text-zinc-400 mb-4">Ничего не найдено</p>
                                    <p className="text-zinc-500">Попробуйте изменить параметры поиска</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                                {pagination.currentItems.map((car) => (
                                    <CarCard
                                        key={car.id}
                                        car={car}
                                        formatPrice={formatPrice}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Пагинация */}
                        {pagination.totalPages > 1 && (
                            <div className="pt-8 mt-auto border-t border-zinc-100">
                                <Pagination {...pagination} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}