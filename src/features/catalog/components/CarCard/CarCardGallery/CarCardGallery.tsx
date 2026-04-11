import Image from "next/image";
import {Car, CarGalleryData} from "@/src/shared/types/types";



interface CarCardGalleryProps{
    car:Car
    gallery: CarGalleryData;


}

export function CarCardGallery({car, gallery }:CarCardGalleryProps) {
    const {
        images,
        mainImage,
        currentImageIndex,
        hasMultipleImages,
        goToPrevious,
        goToNext,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    } = gallery;



    return (

        <div className="relative">
            <div
                className="relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <Image
                    src={mainImage}
                    alt={`${car.brand} ${car.model}`}
                    width={800}
                    height={520}
                    className="w-full aspect-[16/10] object-cover"
                    priority={false}
                />

                {/* Стрелки  */}
                {hasMultipleImages && (
                    <>
                        {/* Левая стрелка */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-6 top-1/2 -translate-y-1/2
                                       w-11 h-11
                                       border border-white/10 hover:border-white/10
                                       bg-black/10 hover:bg-black/20
                                       rounded-2xl
                                       transition-all active:scale-95 z-20
                                       flex items-center justify-center"
                        >
                            <span className="mb-2 text-4xl font-light text-blue-500 drop-shadow-md">‹</span>
                        </button>

                        {/* Правая стрелка */}
                        <button
                            onClick={goToNext}
                            className="absolute right-6 top-1/2 -translate-y-1/2
                                       w-11 h-11
                                       border border-white/10 hover:border-white/10
                                       bg-black/10 hover:bg-black/20
                                       rounded-2xl
                                       transition-all active:scale-95 z-20
                                       flex items-center justify-center"
                        >
                            <span className="mb-2 text-4xl font-light text-blue-500 drop-shadow-md">›</span>
                        </button>

                        {/* Индикатор */}
                        <div
                            className="absolute bottom-3 left-1/2 -translate-x-1/2
                                       bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md"
                        >
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}