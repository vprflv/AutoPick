'use client';

import { useState } from 'react';
import { Car } from "@/src/shared/types/types";
import { useGetInitialCars } from "@/src/shared/hooks/useGetInitialCars";
import { deleteCarAction } from "@/src/features/admin/actions/deleteCarAction";

export function useAdminPage() {
    const { cars, loadCars } = useGetInitialCars();

    const [showForm, setShowForm] = useState(false);
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Добавление автомобиля
    const handleAddSuccess = () => {
        setShowForm(false);
        loadCars();           // обновляем список после добавления
    };

    // Редактирование автомобиля
    const handleEditSuccess = () => {
        loadCars();
        setIsEditModalOpen(false);
        setEditingCar(null);
    };

    const handleEditClick = (car: Car) => {
        setEditingCar(car);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingCar(null);
    };

    // Удаление автомобиля
    const handleDeleteCar = async (id: number) => {
        if (!confirm('Удалить этот автомобиль?')) return;

        const result = await deleteCarAction(id);
        if (result.success) {
            loadCars();
        } else {
            alert(result.error || 'Не удалось удалить автомобиль');
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
        loadCars,           // если где-то ещё понадобится
    };
}