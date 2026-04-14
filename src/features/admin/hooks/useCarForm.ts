import React, {useCallback, useState, useTransition} from "react";
import {addCarAction} from "@/src/features/admin/actions/addCarAction";
import {formDataCar} from "@/src/shared/types/types";


const initialFormData: formDataCar = {
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    type: 'Седан',
    fuel: 'Бензин',
    transmission: 'Автомат',
};

interface UseCarFormReturn {
    formData: formDataCar;
    setFormData: React.Dispatch<React.SetStateAction<formDataCar>>;
    imageUrls: string[];
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
    isPending: boolean;
    error: string | null;
    successMessage: string | null;
    handleSubmit: (e: React.FormEvent) => void;
    resetForm: () => void;
}






export function useCarForm(onSuccess?:()=>void):UseCarFormReturn {
    const [formData, setFormData] = useState<formDataCar>((initialFormData));



    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>(['']);


    const resetForm = useCallback(() => {
        setFormData(initialFormData);
        setImageUrls(['']);
        setError(null);
        setSuccessMessage(null);
    }, []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const validImages = imageUrls.filter(url => url.trim() !== '');

        startTransition(async () => {
            const result = await addCarAction({
                ...formData,
                images: validImages,
            });

            if (result.success) {
                setSuccessMessage(result.message || 'Автомобиль успешно добавлен!');
                resetForm();
                onSuccess?.();
            } else {
                setError(result.error || 'Не удалось добавить автомобиль');
            }
        })    };


    return {
        formData,
        setFormData,
        imageUrls,
        setImageUrls,
        isPending,
        error,
        successMessage,
        handleSubmit,
        resetForm,
    };

}