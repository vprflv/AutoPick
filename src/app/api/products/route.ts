import {Car} from "@/src/shared/types/types";
import {useGetInitialCars} from "@/src/shared/hooks/useGetInitialCars";


export const initialCars: Car[] = [
    { id: 1, brand: 'Toyota', model: 'Camry', year: 2024, price: 2850000, mileage: 8500, image: 'https://picsum.photos/id/1015/800/600', type: 'Седан', fuel: 'Бензин', transmission: 'Автомат' },
    { id: 2, brand: 'Kia', model: 'Sportage', year: 2024, price: 3250000, mileage: 4200, image: 'https://picsum.photos/id/201/800/600', type: 'Кроссовер', fuel: 'Бензин', transmission: 'Автомат' },
    { id: 3, brand: 'Hyundai', model: 'Tucson', year: 2023, price: 2980000, mileage: 14500, image: 'https://picsum.photos/id/251/800/600', type: 'Кроссовер', fuel: 'Дизель', transmission: 'Автомат' },
    { id: 4, brand: 'BMW', model: 'X5', year: 2022, price: 6800000, mileage: 28900, image: 'https://picsum.photos/id/401/800/600', type: 'Кроссовер', fuel: 'Бензин', transmission: 'Автомат' },
    { id: 5, brand: 'Mercedes', model: 'C 200', year: 2024, price: 5450000, mileage: 3100, image: 'https://picsum.photos/id/451/800/600', type: 'Седан', fuel: 'Бензин', transmission: 'Автомат' },
    { id: 6, brand: 'Volkswagen', model: 'Tiguan', year: 2024, price: 3150000, mileage: 6700, image: 'https://picsum.photos/id/501/800/600', type: 'Кроссовер', fuel: 'Бензин', transmission: 'Робот' },
    { id: 7, brand: 'Lada', model: 'Vesta Cross', year: 2024, price: 1480000, mileage: 2300, image: 'https://picsum.photos/id/301/800/600', type: 'Универсал', fuel: 'Бензин', transmission: 'Механика' },
    { id: 8, brand: 'Skoda', model: 'Kodiaq', year: 2023, price: 3480000, mileage: 11200, image: 'https://picsum.photos/id/551/800/600', type: 'Кроссовер', fuel: 'Бензин', transmission: 'Автомат' },
];


