import Image from "next/image";
import {Car} from "@/src/shared/types/types";
import {useState} from "react";

interface CardGalleryDeatil {
    images:string[],
    car:Car
}






export function GalleryCardDeatil({images, car}:CardGalleryDeatil) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);


    const goToPrevious = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const selectImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    // Открытие полноэкранного режима
    const openFullscreen = () => {
        setIsFullscreen(true);
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
    };

    return (

    <div className="lg:col-span-3 space-y-6">
        {/* Большое основное фото */}
        <div className="relative aspect-[16/10] bg-zinc-100 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
                src={images[currentImageIndex] || '/placeholder-car.jpg'}
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                priority
            />

            {/* стрелки */}
            {images.length > 1 && (
                <>
                    {/* Левая стрелка */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-6 top-1/2 -translate-y-1/2  p-10 rounded-2xl shadow-xl transition-all active:scale-95 z-90 flex items-center justify-center w-30 h-30"
                    >
                        <span className="text-5xl font-light text-blue-600">‹</span>
                    </button>

                    {/* Правая стрелка */}
                    <button
                        onClick={goToNext}
                        className="absolute right-6 top-1/2 -translate-y-1/2  p-10 rounded-2xl shadow-xl transition-all active:scale-95 z-20 flex items-center justify-center w-30 h-30"
                    >
                        <span className="text-5xl font-light text-blue-600">›</span>
                    </button>
                </>
            )}

            {/* Иконка полноэкранного режима */}
            <button
                onClick={openFullscreen}
                className="absolute bottom-6 right-6 bg-black/70 hover:bg-black/80 text-white p-3 rounded-2xl transition-all z-30 flex items-center justify-center"
                title="Открыть галерею на весь экран"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
            </button>

            {/* Индикатор слайдов */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-5 py-2 rounded-full backdrop-blur-md">
                    {currentImageIndex + 1} / {images.length}
                </div>
            )}
        </div>

        {/* Миниатюры */}
        {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`flex-shrink-0 relative w-32 h-24 rounded-3xl overflow-hidden border-2 transition-all duration-300 snap-start ${
                            index === currentImageIndex
                                ? 'border-blue-600 shadow-2xl scale-[1.04]'
                                : 'border-transparent hover:border-zinc-300 hover:scale-[1.02]'
                        }`}
                    >
                        <Image src={img} alt={`Фото ${index + 1}`} fill className="object-cover" />
                    </button>
                ))}
            </div>
        )}

        {/* Полноэкранная галерея (Lightbox) */}
        {isFullscreen && images.length > 0 && (
            <div
                className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                onClick={closeFullscreen}   // клик по фону закрывает
            >
                <div
                    className="relative w-full h-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()} // предотвращаем закрытие при клике на фото
                >
                    <Image
                        src={images[currentImageIndex]}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-contain"
                        priority
                    />

                    {/* Кнопка закрытия */}
                    <button
                        onClick={closeFullscreen}
                        className="absolute top-8 right-8 text-white text-5xl hover:text-zinc-300 transition-colors z-10"
                    >
                        ✕
                    </button>

                    {/* Стрелки в полноэкранном режиме */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                                className="absolute left-10 text-white text-7xl hover:text-blue-400 transition-colors z-10"
                            >
                                ‹
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                                className="absolute right-10 text-white text-7xl hover:text-blue-400 transition-colors z-10"
                            >
                                ›
                            </button>
                        </>
                    )}

                    {/* Индикатор */}
                    <div className="absolute bottom-10 text-white text-xl bg-black/60 px-8 py-3 rounded-full backdrop-blur-md">
                        {currentImageIndex + 1} / {images.length}
                    </div>
                </div>
            </div>
        )}
    </div>
    )
}