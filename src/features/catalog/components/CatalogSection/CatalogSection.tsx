// src/features/catalog/components/CatalogSection.tsx
'use client';

import Filters from "@/src/features/catalog/components/Filters/Filters";
import CarCard from "@/src/features/catalog/components/CarCard/CarCard";
import Pagination from "@/src/features/catalog/components/Pagination/Pagination";

import { useCarFilter } from "@/src/features/catalog/hooks/useCarFilter";
import { usePagination } from "@/src/features/catalog/hooks/usePagination";

export default function CatalogSection() {
    const { cars: filteredCars, brands, types, filters, resetFilters } = useCarFilter();

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

    const pagination = usePagination({
        items: filteredCars,
        itemsPerPage: 10,
    });

    return (
        <section id="catalog" className="py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-10">

                    <div className="lg:w-80 flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
                        <Filters
                            searchTerm={filters.searchTerm}
                            setSearchTerm={filters.setSearchTerm}
                            selectedBrand={filters.selectedBrand}
                            setSelectedBrand={filters.setSelectedBrand}
                            selectedType={filters.selectedType}
                            setSelectedType={filters.setSelectedType}
                            priceRange={filters.priceRange}
                            setPriceRange={filters.setPriceRange}
                            sortBy={filters.sortBy}
                            setSortBy={filters.setSortBy}
                            brands={brands}
                            types={types}
                            resetFilters={resetFilters}
                        />
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold">
                                Найдено автомобилей: <span className="text-blue-600">{filteredCars.length}</span>
                            </h2>
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-7 pb-12">
                            {pagination.currentItems.map((car) => (
                                <CarCard
                                    key={car.id}
                                    car={car}
                                    formatPrice={formatPrice}
                                />
                            ))}
                        </div>

                        {filteredCars.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-3xl text-zinc-400 mb-4">Ничего не найдено</p>
                                <p className="text-zinc-500">Попробуйте изменить параметры поиска</p>
                            </div>
                        )}

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