// src/shared/types/supabase.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
    public: {
        Tables: {
            cars: {
                Row: {
                    id: number;
                    brand: string;
                    model: string;
                    year: number;
                    price: number;
                    mileage: number;
                    type: string;
                    fuel: string | null;
                    transmission: string | null;
                    image: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: number;
                    brand: string;
                    model: string;
                    year: number;
                    price: number;
                    mileage: number;
                    type: string;
                    fuel?: string | null;
                    transmission?: string | null;
                    image?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            car_images: {
                Row: {
                    id: number;
                    car_id: number;
                    image_url: string;
                    sort_order: number;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    car_id: number;
                    image_url: string;
                    sort_order?: number;
                    created_at?: string;
                };
            };
        };
    };
}