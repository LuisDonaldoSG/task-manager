import { LocalStorageProviderI } from "@interfaces/props";
import useClientSide from "@hooks/useClientSide";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setTasks } from "@reducers/task.reducer";

export default function LocalStorageProvider({ children }: LocalStorageProviderI) {

    const isInClientSide = useClientSide()
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.taskReducer.tasks)

    useEffect(() => {
        if (isInClientSide) {
            dispatch(setTasks(JSON.parse(localStorage.getItem("tasks") || "[]")))
        }
    }, [isInClientSide])

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
    }, [tasks])

    return children
}