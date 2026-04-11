'use client';

import Button from "@/src/components/ui/Button";
import { Car } from "@/src/shared/types/types";

interface CarDetailActionsProps {
    car: Car;
    onRequest: () => void;
}

export function CarDetailActions({ car, onRequest }: CarDetailActionsProps) {
    return (
        <div className="space-y-6">
            <Button
                variant="primary"
                size="lg"
                className="w-full py-7 text-lg font-medium shadow-lg shadow-blue-500/20"
                onClick={onRequest}
            >
                Оставить заявку на этот автомобиль
            </Button>

            <p className="text-center text-sm text-zinc-500">
                Гарантия юридической чистоты • Осмотр перед покупкой • Помощь с оформлением
            </p>
        </div>
    );
}