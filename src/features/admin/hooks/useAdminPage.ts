'use client';

import { useState } from 'react';
import { Car } from "@/src/shared/types/types";
import { useGetInitialCars } from "@/src/shared/hooks/useGetInitialCars";
import { deleteCarAction } from "@/src/features/admin/actions/deleteCarAction";
import toast from 'react-hot-toast';

export function useAdminPage() {
    const { cars, loadCars } = useGetInitialCars();

    const [showForm, setShowForm] = useState(false);
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleAddSuccess = () => {
        setShowForm(false);
        loadCars();
        toast.success('Автомобиль успешно добавлен!', {
            icon: '🚗',
        });
    };

    const handleEditSuccess = () => {
        loadCars();
        setIsEditModalOpen(false);
        setEditingCar(null);
        toast.success('Автомобиль успешно обновлён!');
    };

    const handleEditClick = (car: Car) => {
        setEditingCar(car);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingCar(null);
    };


    // Удаление

    const handleDeleteCar = async (id: number) => {
        const result = await deleteCarAction(id);

        if (result.success) {
            loadCars();
        } else {
            // Ошибку будем показывать в компоненте
            return result.error || 'Не удалось удалить автомобиль';
        }
    };

    return {
        cars,
        showForm,
        setShowForm,
        editingCar,
        isEditModalOpen,
        handleAddSuccess,
        handleEditSuccess,
        handleEditClick,
        handleCloseEditModal,
        handleDeleteCar,
        loadCars,
    };
}