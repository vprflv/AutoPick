import {ImageUploader} from "@/src/features/admin/components/ImageUploader";
import React, {JSX, RefObject, useRef} from "react";
import {Car, CreateCarData, formDataCar} from "@/src/shared/types/types";
import {editCarAction} from "@/src/features/admin/actions/editCarAction";

interface EditCarFormProps {
    car:Car
    formRef: RefObject<HTMLFormElement>
    imageUrls:string[]
    setError:(string)=>void
    setIsPending:(boolean)=>void
    setFormData:(formDataCar)=>void
    setImageUrls:(imageUrls)=>void
    onClose:()=>void
    onSuccess:(()=> void )| undefined
    error:string | null
    formData:formDataCar


}




export function EditCarForm({   car,
                                formRef,
                                imageUrls,
                                setError,
                                error,
                                setIsPending,
                                formData,
                                onSuccess,
                                onClose,
                                setFormData,
                                setImageUrls  }: EditCarFormProps) {


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!car) return;

        const validImages = imageUrls.filter(url => url && url.trim() !== '');

        if (validImages.length === 0) {
            setError('Добавьте хотя бы одну фотографию автомобиля');
            return;
        }

        setIsPending(true);
        setError(null);

        const updateData: CreateCarData = {
            ...formData,
            images: validImages,
        };

        const result = await editCarAction(car.id, updateData);

        setIsPending(false);

        if (result.success) {
            onSuccess?.();
            onClose();
        } else {
            setError(result.error || 'Не удалось обновить автомобиль');
        }
    };


    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6"
        >
            {error && (
                <div className="p-4 bg-red-900/50 border border-red-700 rounded-2xl text-red-400 text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ... все твои поля остаются без изменений ... */}
                <div>
                    <label className="block text-sm mb-2 text-zinc-400">Марка</label>
                    <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                {/* Остальные поля (model, year, price, mileage, CustomSelectAdmin) — оставляем как было */}
                {/* ... (я не дублирую их все, чтобы не было слишком длинно) ... */}

                <ImageUploader
                    images={imageUrls}
                    onChange={setImageUrls}
                    maxImages={8}
                />
            </div>
        </form>
    )
}