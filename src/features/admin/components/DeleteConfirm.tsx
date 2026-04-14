import toast, {Toast} from "react-hot-toast";

interface DeleteConfirmProps{
    id:number
    t: Toast
    handleDeleteCar:(id:number) => Promise<string | null>
}


export function DeleteConfirm ({t, handleDeleteCar, id}:DeleteConfirmProps){
    return (
        <div className="flex flex-col gap-4 w-full max-w-[320px]">
            <div className="flex items-start gap-3">
                <div className="text-2xl mt-0.5">⚠️</div>
                <div>
                    <p className="text-white font-medium">Удалить автомобиль?</p>
                    <p className="text-zinc-400 text-sm mt-1">
                        Это действие нельзя отменить.
                    </p>
                </div>
            </div>

            <div className="flex gap-3 mt-2">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-medium transition-colors"
                >
                    Отмена
                </button>
                <button
                    onClick={async () => {
                        toast.dismiss(t.id);
                        const errorMessage = await handleDeleteCar(id);

                        if (errorMessage) {
                            toast.error(errorMessage);
                        } else {
                            toast.success('Автомобиль успешно удалён', {
                                icon: '🗑️',
                                duration: 3000,
                            });
                        }
                    }}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-medium transition-colors"
                >
                    Удалить
                </button>
            </div>
        </div>
    )
}