import {useEffect, useState} from "react";
import {Car} from "@/src/shared/types/types";
import {getCarsAction} from "@/src/features/create-car/model/actions";



export function useGetInitialCars() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const loadCars = async () => {
        setLoading(true);
        const result = await getCarsAction();

        if (result.success) {
            setCars(result.data);
        } else {
            console.error(result.error);
        }
        setLoading(false);
    }


    useEffect(() => {
        loadCars();
    }, []);

    return {cars, loadCars}
}