
jest.mock('../../../shared/lib/supabase', () => ({
    createServerSupabaseClient: jest.fn(),
}));

import { addCarAction } from './addCarAction';
import { createServerSupabaseClient } from '../../../shared/lib/supabase';

describe('addCarAction', () => {
    const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (createServerSupabaseClient as jest.Mock).mockResolvedValue(mockSupabase);
    });

    it('успешно создаёт автомобиль и возвращает success: true', async () => {
        const mockData = {
            brand: 'Toyota',
            model: 'Camry',
            year: 2023,
            price: 3500000,
            mileage: 15000,
            type: 'Седан',
            fuel: 'Бензин',
            transmission: 'Автомат',
            images: ['https://example.com/photo1.jpg'],
        };

        // Мокаем успешный ответ
        mockSupabase.single.mockResolvedValueOnce({
            data: {
                id: 999,
                ...mockData,
                created_at: new Date().toISOString()
            },
            error: null,
        });

        const result = await addCarAction(mockData);

        expect(result.success).toBe(true);
        expect(result.message).toContain('успешно добавлен');
        expect(result.data).toBeDefined();
    });

    it('возвращает ошибку, если Supabase вернул ошибку', async () => {
        const mockData = {
            brand: 'Toyota',
            model: 'Camry',
            year: 2023,
            price: 3500000,
            mileage: 15000,
            type: 'Седан',
            fuel: 'Бензин',
            transmission: 'Автомат',
            images: [],
        };

        mockSupabase.single.mockResolvedValueOnce({
            data: null,
            error: { message: 'Ошибка вставки в таблицу cars' },
        });

        const result = await addCarAction(mockData);

        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
    });
});