
import {useCallback, useEffect, useRef, useState} from "react";
import {Car} from "@/src/shared/types/types";
import {useParams, useRouter} from "next/navigation";
import {supabase} from "@/src/shared/lib/supabase";



export function useGallery() {
    const [images, setImages] = useState<string[]>([]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const router = useRouter();

    // Для свайпа
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);



        const loadingImages = useCallback(async () => {
            const carId = Number(params.id);
            if (!carId) {
                router.push('/');
                return;
            }
            try {

                setLoading(true);
                setError(null);
                const result: any = await supabase
                    .from('cars')
                    .select(`
                        *,
                        car_images (
                            image_url,
                            sort_order
                        )
                    `)
                    .eq('id', carId)
                    .single();

                if (result?.error) {
                    console.error('Supabase error:', result.error);
                    setError(result.error.message);
                    return;
                }

                const foundCar = result.data as Car;

                // Формируем массив изображений
                const carImages = foundCar.car_images && foundCar.car_images.length > 0
                    ? foundCar.car_images
                        .sort((a: any, b: any) => a.sort_order - b.sort_order)
                        .map((img: any) => img.image_url)
                    : (foundCar.image ? [foundCar.image] : []);
                setImages(carImages);

            }catch(err:any){
                console.error(err);
                setError(err.message || 'Ошибка загрузки автомобиля');
                setTimeout(() => router.push('/'), 1500);
            }finally {
                setLoading(false);
            }

    },[params.id, router])


    useEffect(() => {
        loadingImages();
    }, [loadingImages]);


    const goToPrevious = useCallback(() => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const goToNext = useCallback(() => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const selectImage = useCallback((index: number) => {
        setCurrentImageIndex(index);
    }, []);

    const openFullscreen = useCallback(() => {
        setIsFullscreen(true);
    }, []);

    const closeFullscreen = () => {
        setIsFullscreen(false);
    };

    // Свайп
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (!touchStartX.current || !touchEndX.current) return;

        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrevious();
        }

        touchStartX.current = 0;
        touchEndX.current = 0;
    }, [goToNext, goToPrevious]);

    return {
        images,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        goToPrevious,
        goToNext,
        openFullscreen,
        selectImage,
        closeFullscreen,
        currentImageIndex,
        isFullscreen

    }
}