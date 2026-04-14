import { useState, useCallback, useRef, useMemo } from "react";
import { Car } from "@/src/shared/types/types";

export function useCarCard(car: Car) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = useMemo<string[]>(() => {
        // Приоритет — новый массив car.images
        if (Array.isArray(car.images) && car.images.length > 0) {
            return car.images.filter((url): url is string =>
                typeof url === 'string' && url.trim().length > 0
            );
        }

        if (car.image && typeof car.image === 'string' && car.image.trim().length > 0) {
            return [car.image.trim()];
        }

        return [];
    }, [car.images, car.image]);

    const mainImage = useMemo(() => {
        const img = images[currentImageIndex];
        if (img && typeof img === 'string' && img.trim().length > 0) {
            return img.trim();
        }
        return '/placeholder-car.svg';
    }, [images, currentImageIndex]);

    // Навигация
    const goToPrevious = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    }, [images.length]);

    const goToNext = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    }, [images.length]);

    const selectImage = useCallback((index: number) => {
        if (index >= 0 && index < images.length) {
            setCurrentImageIndex(index);
        }
    }, [images.length]);

    // Свайп
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (!touchStartX.current || !touchEndX.current) return;

        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) goToNext();
        else if (isRightSwipe) goToPrevious();

        touchStartX.current = 0;
        touchEndX.current = 0;
    }, [goToNext, goToPrevious]);

    return {
        images,
        mainImage,
        currentImageIndex,
        goToPrevious,
        goToNext,
        selectImage,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        hasMultipleImages: images.length > 1,
    };
}