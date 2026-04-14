'use client';

import { useState, useEffect } from 'react';
import { uploadCarImage } from "@/src/features/admin/actions/uploadImageAction";

interface ImageUploaderProps {
    images: string[];                    // массив публичных URL
    onChange: (urls: string[]) => void;
    maxImages?: number;
}

export function ImageUploader({ images, onChange, maxImages = 8 }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);

    // Очищаем массив от пустых строк при каждом изменении props (очень важно!)
    const cleanImages = images.filter((url): url is string =>
        typeof url === 'string' && url.trim() !== ''
    );

    // Синхронизируем чистый массив наверх, если были мусорные строки
    useEffect(() => {
        if (cleanImages.length !== images.length) {
            onChange(cleanImages);
        }
    }, [cleanImages.length, images.length, onChange]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        let currentUrls = [...cleanImages];   // используем уже очищенный массив

        for (const file of Array.from(files)) {
            if (currentUrls.length >= maxImages) break;

            const result = await uploadCarImage(file);

            if (result.success && result.url) {
                currentUrls.push(result.url);
            } else {
                alert(result.error || 'Не удалось загрузить фото');
            }
        }

        onChange(currentUrls);
        setUploading(false);
        e.target.value = ''; // сброс input
    };

    const removeImage = (index: number) => {
        const updated = cleanImages.filter((_, i) => i !== index);
        onChange(updated);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                    {cleanImages.length} / {maxImages}
                </span>
            </div>

            <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-10 text-center hover:border-blue-500 transition-colors">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        disabled={uploading || cleanImages.length >= maxImages}
                        className="hidden"
                    />
                    <div className="text-5xl mb-4">📸</div>
                    <p className="text-zinc-400 text-lg">
                        {uploading ? 'Загрузка файлов...' : 'Нажмите или перетащите фото сюда'}
                    </p>
                    <p className="text-zinc-500 text-sm mt-1">JPG, PNG, WebP до 10 МБ</p>
                </div>
            </label>

            {/* Предпросмотр */}
            {cleanImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                    {cleanImages.map((url, index) => (
                        <div key={index} className="relative group rounded-2xl overflow-hidden">
                            <img
                                src={url}
                                alt={`Фото ${index + 1}`}
                                className="w-full h-28 object-cover"
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm hover:bg-red-700 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}