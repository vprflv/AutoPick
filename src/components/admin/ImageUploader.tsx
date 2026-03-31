interface ImageUploaderProps {
    images: string[];
    onChange: (images: string[]) => void;
    maxImages?: number;
}

export  function ImageUploader({images, onChange, maxImages = 10}: ImageUploaderProps){
    const addImageField = () => {
        if (images.length >= maxImages) return;
        onChange([...images, '']);
    };

    const removeImageField = (index: number) => {
        if (images.length === 1) return;
        onChange(images.filter((_, i) => i !== index));
    };

    const updateImageUrl = (index: number, value: string) => {
        const newImages = [...images];
        newImages[index] = value;
        onChange(newImages);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-white">
                    Фотографии автомобиля
                </label>
                <button
                    type="button"
                    onClick={addImageField}
                    disabled={images.length >= maxImages}
                    className="text-blue-500 hover:text-blue-400 text-sm font-medium disabled:opacity-50 transition-colors"
                >
                    + Добавить фото
                </button>
            </div>

            <div className="space-y-3">
                {images.map((url, index) => (
                    <div key={index} className="flex gap-3">
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => updateImageUrl(index, e.target.value)}
                            placeholder="https://example.com/car-photo.jpg"
                            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                            required={index === 0}
                        />

                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeImageField(index)}
                                className="px-5 text-red-500 hover:text-red-600 transition-colors"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <p className="text-xs text-zinc-500">
                Добавьте от 1 до {maxImages} фотографий. Первая фотография будет главной.
            </p>
        </div>
    );

}