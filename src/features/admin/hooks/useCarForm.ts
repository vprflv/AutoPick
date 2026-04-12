import React, {useState, useTransition} from "react";
import {addCarAction} from "@/src/features/admin/actions/addCarAction";


export function useCarForm(onSuccess?:()=>void, onClose?:()=>void) {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: 0,
        mileage: 0,
        type: 'Седан',
        fuel: 'Бензин',
        transmission: 'Автомат',
    });



    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>(['']);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const validImages = imageUrls.filter(url => url.trim() !== '');

        if (validImages.length === 0) {
            setError('Добавьте хотя бы одну фотографию автомобиля');
            return;
        }

        startTransition(async () => {
            const result = await addCarAction({
                ...formData,
                images: validImages,
            });

            if (result.success) {
                setSuccessMessage(result.message || 'Автомобиль добавлен!');

                setFormData({
                    brand: '',
                    model: '',
                    year: new Date().getFullYear(),
                    price: 0,
                    mileage: 0,
                    type: 'Седан',
                    fuel: 'Бензин',
                    transmission: 'Автомат',
                });
                setImageUrls(['']);
                onSuccess?.();
            }else {
                setError(result.error || 'Не удалось добавить автомобиль');
            }
        })    };


    return {formData, handleSubmit, setFormData, imageUrls, setImageUrls};

}