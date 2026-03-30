export interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    image: string;
    type: string;
    fuel?: string;
    transmission?: string;
    created_at?: string;
    updated_at?: string;
}

export type NewCar = Omit<Car, 'id' | 'created_at' | 'updated_at'>;


