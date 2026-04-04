'use client';

import Header from "@/src/components/common/Header/Header";
import Filters from "@/src/features/catalog/components/Filters/Filters";
import CarCard from "@/src/features/catalog/components/CarCard/CarCard";
import {useCarFilter} from "@/src/features/catalog/hooks/useCarFilter";
import Footer from "@/src/components/common/Footer/Footer";
import {Hero} from "@/src/components/common/Hero/Hero";
import React from "react";





export default function AutoPickLanding() {
  const { cars: filteredCars,
      brands,
      types,
      filters,
      resetFilters,
  } = useCarFilter();


  const formatPrice = (price: number) =>
      new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

  return (
      <div className="overflow-x-hidden">
        <Header />

        {/* Hero Section */}

        <Hero/>

        {/* Filters + Catalog */}
        <section id="catalog" className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Фильтры */}
            <div className="lg:w-80 flex-shrink-0">
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
              />
            </div>

            {/* Результаты */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">
                  Найдено автомобилей: <span className="text-blue-600">{filteredCars.length}</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">
                {filteredCars.map((car) => (
                    <CarCard
                             key={car.id}
                             car={car}
                             formatPrice={formatPrice} />
                ))}
              </div>

              {filteredCars.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-3xl text-zinc-400 mb-4">Ничего не найдено</p>
                    <p className="text-zinc-500">Попробуйте изменить параметры поиска</p>
                  </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer/>
      </div>
  );
}