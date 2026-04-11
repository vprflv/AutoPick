'use client';

import { Car } from "@/src/shared/types/types";
import { GalleryCardDeatil } from "./Gallery";   // или переименуй позже

interface CarDetailGalleryProps {
    car: Car;
}

export function CarDetailGallery({ car }: CarDetailGalleryProps) {
    return (
        <div className="lg:col-span-3">
            <GalleryCardDeatil car={car} />
        </div>
    );
}