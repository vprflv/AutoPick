'use client';

import { AdminHeader } from "@/src/features/admin/components/AdminHeader";
import { CarForm } from "@/src/features/admin/components/CarForm";
import { CarList } from "@/src/features/admin/components/CarList";
import { EditCarModal } from "@/src/features/admin/components/EditCarModal/EditCarModal";
import { useAdminPage } from "@/src/features/admin/hooks/useAdminPage";

export function AdminPage() {
    const {
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
    } = useAdminPage();

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <AdminHeader />

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
                        <CarForm
                            onSuccess={handleAddSuccess}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                )}

                <CarList
                    cars={cars}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteCar}
                />
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