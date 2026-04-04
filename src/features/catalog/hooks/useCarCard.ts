import { useState, useCallback, useRef, useMemo } from "react";
import { Car } from "@/src/shared/types/types";

export function useCarCard(car: Car) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Формируем массив изображений (с защитой от старого формата)
    const images = useMemo(() => {
        if (car.images && car.images.length > 0) {
            return car.images;
        }
        if (car.image) {
            return [car.image];
        }
        return [];
    }, [car.images, car.image]);

    const mainImage = images[currentImageIndex] || '/placeholder-car.jpg';

    // Навигация
    const goToPrevious = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const goToNext = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const selectImage = useCallback((index: number) => {
        setCurrentImageIndex(index);
    }, []);

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