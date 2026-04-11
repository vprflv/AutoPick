import { Car } from "@/src/shared/types/types";

export type SelectFieldConfig = {
    label: string;
    field: keyof Pick<Car, 'type' | 'fuel' | 'transmission'>;
    options: { value: string; label: string }[];
};

export const carSelectFields: SelectFieldConfig[] = [
    {
        label: "Тип кузова",
        field: "type",
        options: [
            { value: 'Седан', label: 'Седан' },
            { value: 'Кроссовер', label: 'Кроссовер' },
            { value: 'Универсал', label: 'Универсал' },
            { value: 'Хэтчбек', label: 'Хэтчбек' },
            { value: 'Внедорожник', label: 'Внедорожник' },
        ],
    },
    {
        label: "Топливо",
        field: "fuel",
        options: [
            { value: 'Бензин', label: 'Бензин' },
            { value: 'Дизель', label: 'Дизель' },
            { value: 'Гибрид', label: 'Гибрид' },
            { value: 'Электро', label: 'Электро' },
        ],
    },
    {
        label: "Коробка передач",
        field: "transmission",
        options: [
            { value: 'Автомат', label: 'Автомат' },
            { value: 'Робот', label: 'Робот' },
            { value: 'Механика', label: 'Механика' },
            { value: 'Вариатор', label: 'Вариатор' },
        ],
    },
];