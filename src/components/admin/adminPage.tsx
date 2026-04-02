'use client';

import { useState} from "react";
import {Car} from "@/src/shared/types/types";
import {CarForm} from "@/src/components/admin/CarForm";
import {CarList} from "@/src/components/admin/CarList";
import {AdminHeader} from "@/src/components/admin/AdminHeader";

import {EditCarModal} from "@/src/components/admin/EditCarModal";
import {useGetInitialCars} from "@/src/shared/hooks/useGetInitialCars";
import {deleteCarAction} from "@/src/features/admin/actions/deleteCarAction";

export function AdminPage() {
    const {cars,loadCars}=useGetInitialCars()
    const [showForm, setShowForm] = useState(false);

    // состояние для редактирования
    const [editingCar, setEditingCar] = useState<Car | null>(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);




// Обработчик успешного добавления
    const handleAddSuccess = () => {

        setShowForm(false);
    };

// Обработчик успешного редактирования
    const handleEditSuccess = () => {
            console.log("handleEditSuccess вызван — обновляем список");
            loadCars();           // обновляем данные
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


// Обработчик успешного удаления
    const deleteCar = async (id: number) => {
        if (confirm('Удалить этот автомобиль?')) {
           await deleteCarAction(id)

        }
    };





    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <AdminHeader/>
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold">Админ-панель</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-medium flex items-center gap-3 transition-colors"
                    >
                        + Добавить автомобиль
                    </button>
                </div>
                {showForm && (
                    <div className="mb-12">
                        <CarForm onSuccess={() => handleAddSuccess()} onCancel={() => setShowForm(false)}/>
                    </div>
                )}
                <CarList onEdit={handleEditClick } cars={cars}   onDelete={deleteCar}/>
            </div>

            <EditCarModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                car={editingCar}
                onSuccess={handleEditSuccess}
            />
        </div>


    );
}