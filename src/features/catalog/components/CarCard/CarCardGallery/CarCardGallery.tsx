import Image from "next/image";
import {Car} from "@/src/shared/types/types";



interface CarCardGalleryProps{
    handleTouchStart:(e: React.TouchEvent) => void
    handleTouchEnd:() => void
    handleTouchMove:(e: React.TouchEvent)=>void
    mainImage:string
    car:Car
    hasMultipleImages:boolean
    goToPrevious:(e?: React.MouseEvent)=>void
    goToNext:(e?: React.MouseEvent)=>void
    currentImageIndex:number
    images:string []


}

export function CarCardGallery({handleTouchStart,
                                   handleTouchEnd,
                                   handleTouchMove,
                                   mainImage,
                                   car,
                                   hasMultipleImages,
                                   goToPrevious,
                                   goToNext,
                                   currentImageIndex,
                                   images}:CarCardGalleryProps) {
    return (

        <div>
            <div className="relative"
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
                />

                {hasMultipleImages && (
                    /* Стрелки для листания (показываем только если фото > 1) */
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
                            <span className=" mb-2 text-4xl font-light text-blue-500 drop-shadow-md">‹</span>
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
                            <span className=" mb-2 text-4xl font-light text-blue-500 drop-shadow-md">›</span>
                        </button>

                        {/* Индикатор текущего фото */}
                        <div
                            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </>

                )}

            </div>
        </div>
    )
}