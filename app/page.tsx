'use client';

import Header from "@/src/components/Header/Header";
import Filters from "@/src/components/Filters/Filters";
import CarCard from "@/src/components/CarCard/CarCard";
import {useCarFilter} from "@/src/app/hooks/useCarFilter";






export default function AutoPickLanding() {
  const { cars: filteredCars,brands,types, filters, resetFilters } = useCarFilter();


  const formatPrice = (price: number) =>
      new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

  return (
      <>
        <Header />

        {/* Hero Section */}
        <section className="relative h-screen flex items-center bg-gradient-to-br from-zinc-900 via-blue-950 to-zinc-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(at_bottom_right,#3b82f630_0%,transparent_50%)]"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
                Найдите свой идеальный автомобиль
              </h1>
              <p className="text-2xl text-zinc-300 mb-10">
                Быстрый подбор • Проверенные авто • Лучшие цены
              </p>

              <button
                  onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-lg font-semibold rounded-2xl transition-all active:scale-95 flex items-center gap-3"
              >
                Начать подбор сейчас
                <span className="text-2xl">↓</span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/70 rounded-full animate-scroll"></div>
            </div>
          </div>
        </section>

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
                    <CarCard key={car.id} car={car} formatPrice={formatPrice} />
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
        <footer className="bg-zinc-950 text-zinc-400 py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-2xl font-semibold text-white mb-2">AutoPick</p>
            <p>© 2026 Все права защищены. Сделано с ❤️ для удобного подбора авто.</p>
          </div>
        </footer>
      </>
  );
}