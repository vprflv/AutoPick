'use client';

import Header from "@/src/components/common/Header/Header";
import Filters from "@/src/features/catalog/components/Filters/Filters";
import CarCard from "@/src/features/catalog/components/CarCard/CarCard";
import { useCarFilter } from "@/src/features/catalog/hooks/useCarFilter";
import Footer from "@/src/components/common/Footer/Footer";
import { Hero } from "@/src/components/common/Hero/Hero";
import { usePagination } from "@/src/features/catalog/hooks/usePagination";
import Pagination from "@/src/features/catalog/components/Pagination/Pagination";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AutoPickLanding() {
    const {
        cars: filteredCars,
        brands,
        types,
        filters,
        resetFilters
    } = useCarFilter();

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

    const {
        currentItems: paginatedCars,
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage,
        hasNext,
        hasPrev,
    } = usePagination({
        items: filteredCars,
        itemsPerPage: 4,
    });

    return (
        <div className="overflow-x-hidden">
            <Header />
            <Hero />

            <section id="catalog" className="scroll-mt-24 pb-12 pt-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Фильтры */}
                        <div className="lg:w-80 flex-shrink-0 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-160px)]">
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

                        {/* Блок автомобилей */}
                        <div className="flex-1 flex flex-col min-h-[640px] lg:min-h-0">   {/* минимальная высота для выравнивания */}

                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold">
                                    Найдено автомобилей: <span className="text-blue-600">{filteredCars.length}</span>
                                </h2>
                            </div>

                            {/* Скролл только в блоке автомобилей */}
                            <div className="flex-1 lg:overflow-y-auto pr-3 custom-scroll">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 pb-16">
                                    {paginatedCars.map((car) => (
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
                            </div>

                            {/* Пагинация */}
                            {totalPages > 1 && (
                                <div className=" mt-auto border-t border-zinc-100">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        goToPage={goToPage}
                                        nextPage={nextPage}
                                        prevPage={prevPage}
                                        hasNext={hasNext}
                                        hasPrev={hasPrev}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}