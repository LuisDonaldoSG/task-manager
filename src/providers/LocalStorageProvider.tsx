import { LocalStorageProviderI } from "@interfaces/props";
import useClientSide from "@hooks/useClientSide";
import { useEffect } from "react";
import { useAppDispatch } from "@redux/hooks";
import { setTasks } from "@reducers/task.reducer";

export default function LocalStorageProvider({ children }: LocalStorageProviderI) {

    const isInClientSide = useClientSide()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isInClientSide) {
            dispatch(setTasks(JSON.parse(localStorage.getItem("tasks") || "[]") ))
        }
    },[isInClientSide])

    return children 
}