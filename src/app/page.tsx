// src/app/page.tsx
'use client';

import CatalogSection from "@/src/features/catalog/components/CatalogSection/CatalogSection";

export const dynamic = 'force-dynamic';

export default function AutoPickLanding() {
    return (
        <div><CatalogSection/></div>
    )

}