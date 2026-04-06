// src/app/page.tsx
'use client';

console.log('=== ENV CHECK ===');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'OK' : 'MISSING');
console.log('NEXT_PUBLIC_SUPABASE_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

import Header from "@/src/components/common/Header/Header";
import { Hero } from "@/src/components/common/Hero/Hero";
import Footer from "@/src/components/common/Footer/Footer";

import dynamic from 'next/dynamic';

const CatalogSection = dynamic(
    () => import("@/src/features/catalog/components/CatalogSection/CatalogSection"),
    { ssr: false }
);

export default function AutoPickLanding() {
    return (
        <div className="overflow-x-hidden min-h-screen bg-zinc-50">
            <Header />
            <Hero />
            <CatalogSection />
            <Footer />
        </div>
    );
}