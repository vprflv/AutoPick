
'use client';

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