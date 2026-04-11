export interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    type: string;
    fuel?: string;
    transmission?: string;
    image?:string,
    images?: string[];

    car_images?: Array<{
        image_url: string;
        sort_order: number;
    }>;

    created_at?: string;
    updated_at?: string;
}

export type NewCar = Omit<Car, 'id' | 'created_at' | 'updated_at'>;

export interface CreateCarData extends NewCar {
    images: string[];
}

export type formDataCar ={
    brand: string,
    model: string,
    year: number,
    price: number,
    mileage: number,
    type: string,
    fuel: string,
    transmission: string,
}


export interface CarGalleryData {
    images: string[];
    mainImage: string;
    currentImageIndex: number;
    hasMultipleImages: boolean;
    goToPrevious: (e?: React.MouseEvent) => void;
    goToNext: (e?: React.MouseEvent) => void;
    handleTouchStart: (e: React.TouchEvent) => void;
    handleTouchMove: (e: React.TouchEvent) => void;
    handleTouchEnd: () => void;
}


