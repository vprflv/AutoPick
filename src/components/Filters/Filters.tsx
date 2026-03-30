interface FiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedBrand: string;
    setSelectedBrand: (value: string) => void;
    selectedType: string;
    setSelectedType: (value: string) => void;
    priceRange: { min: number; max: number };
    setPriceRange: (value: { min: number; max: number }) => void;
    sortBy: 'price-asc' | 'price-desc' | 'year-desc';
    setSortBy: (value: 'price-asc' | 'price-desc' | 'year-desc') => void;
    brands: string[];
    types: string[];
}

export default function Filters({
                                    searchTerm, setSearchTerm,
                                    selectedBrand, setSelectedBrand,
                                    selectedType, setSelectedType,
                                    priceRange, setPriceRange,
                                    sortBy, setSortBy,
                                    brands, types,
                                }: FiltersProps) {
    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24 self-start">
            <h3 className="text-2xl font-semibold mb-8">Фильтры</h3>

            {/* Поиск */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-500 mb-2">Поиск</label>
                <input
                    type="text"
                    placeholder="Марка или модель..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-blue-500 outline-none text-lg"
                />
            </div>

            {/* Марка */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-500 mb-2">Марка автомобиля</label>
                <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-blue-500 outline-none text-lg"
                >
                    <option value="all">Все марки</option>
                    {brands.filter(b => b !== 'all').map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            {/* Тип кузова */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-500 mb-2">Тип кузова</label>
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-blue-500 outline-none text-lg"
                >
                    <option value="all">Любой тип</option>
                    {types.filter(t => t !== 'all').map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            {/* Цена */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-500 mb-3">Цена (₽)</label>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <input
                            type="number"
                            placeholder="От"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) || 0 })}
                            className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex-1">
                        <input
                            type="number"
                            placeholder="До"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) || 100000000 })}
                            className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-blue-500 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Сортировка */}
            <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">Сортировка</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc' | 'year-desc')}
                    className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-blue-500 outline-none text-lg"
                >
                    <option value="price-desc">Цена по убыванию</option>
                    <option value="price-asc">Цена по возрастанию</option>
                    <option value="year-desc">Сначала новые</option>
                </select>
            </div>

            <button
                onClick={() => {
                    setSearchTerm('');
                    setSelectedBrand('all');
                    setSelectedType('all');
                    setPriceRange({ min: 500000, max: 100000000 });
                }}
                className="mt-10 w-full py-4 text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 transition-colors"
            >
                Сбросить все фильтры ↺
            </button>
        </div>
    );
}