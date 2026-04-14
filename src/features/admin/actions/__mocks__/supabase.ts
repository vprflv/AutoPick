
export const createServerSupabaseClient = jest.fn().mockResolvedValue({
    from: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({
        data: null,
        error: null
    }),
});