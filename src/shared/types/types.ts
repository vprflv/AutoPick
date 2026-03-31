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
    images?: string[];
    created_at?: string;
    updated_at?: string;
}

export type NewCar = Omit<Car, 'id' | 'created_at' | 'updated_at'>;

export interface CreateCarData extends NewCar {
    images: string[];
}


