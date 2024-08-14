import { TaskI } from "@interfaces/task";
import { useAppSelector } from "@redux/hooks";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import TaskForm from "@components/form/TaskForm";
import TaskDetails from "@components/task/TaskDetails";

export default function Task() {

    const router = useRouter();
    const { taskId } = router.query;
    const tasks = useAppSelector(state => state.taskReducer.tasks);
    const currentTask = useMemo<TaskI | undefined>(() => tasks.find(task => task.id === taskId?.toString()), [tasks]);//eslint-disable-line
    const [mode, setMode] = useState<'view' | 'edit'>('view');

    useEffect(() => {
        if (!currentTask) {
            router.back();
        }
    }, [currentTask]);//eslint-disable-line

    return currentTask && (
        <>
            {
                mode === 'view' ? <TaskDetails 
                    onEdit={() => setMode('edit')} 
                    task={currentTask}
                /> : <TaskForm
                    mode="edit"
                    onCancel={() => setMode('view')}
                    onSubmit={() => setMode('view')}
                    defaultValues={currentTask}
                />
            }
        </>

    );
}