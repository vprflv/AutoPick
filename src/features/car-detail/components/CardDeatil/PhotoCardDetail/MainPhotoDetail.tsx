import Image from "next/image";
import {Car} from "@/src/shared/types/types";


interface MainPhotoCardDetailProps {
    images: string[];
    car: Car;
}



export function MainPhotoCardDetail() {
    return (
        <div className="relative aspect-[16/10] bg-zinc-100 rounded-3xl overflow-hidden shadow-2xl group"
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}

        >
            <Image
                src={images[currentImageIndex] || '/placeholder-car.jpg'}
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                priority
            />

            {/* Стрелки */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-10 rounded-2xl shadow-xl transition-all active:scale-95 z-20 flex items-center justify-center w-16 h-16"
                    >
                        <span className="text-5xl font-light text-blue-600">‹</span>
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-10 rounded-2xl shadow-xl transition-all active:scale-95 z-20 flex items-center justify-center w-16 h-16"
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
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/>
                </svg>
            </button>

            {/* Индикатор слайдов */}
            {images.length > 1 && (
                <div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-5 py-2 rounded-full backdrop-blur-md">
                    {currentImageIndex + 1} / {images.length}
                </div>
            )}
        </div>
    )
}