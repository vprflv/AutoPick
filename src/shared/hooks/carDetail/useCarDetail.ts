import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {getCarsAction} from "@/src/features/create-car/model/actions";
import {Car} from "@/src/shared/types/types";


export function useCarDetail() {
    const params = useParams();
    const router = useRouter();

    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const loadAndFindCar = async () => {
            const carId = Number(params.id);

            if (!carId) {
                router.push('/');
                return;
            }

            try {
                setLoading(true);
                const result = await getCarsAction();

                if (!result.success || !result.data) {
                    throw new Error(result.error || 'Не удалось загрузить данные');
                }

                const foundCar = result.data.find((c: Car) => c.id === carId);

                if (foundCar) {
                    setCar(foundCar);

                    const carImages = foundCar.images && foundCar.images.length > 0
                        ? foundCar.images
                        : (foundCar.image ? [foundCar.image] : []);

                    setImages(carImages);
                    setCurrentImageIndex(0);
                } else {
                    setError('Автомобиль не найден');
                    setTimeout(() => router.push('/'), 1500);
                }
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Ошибка загрузки автомобиля');
                setTimeout(() => router.push('/'), 1500);
            } finally {
                setLoading(false);
            }
        }},[params.id, router] )


}